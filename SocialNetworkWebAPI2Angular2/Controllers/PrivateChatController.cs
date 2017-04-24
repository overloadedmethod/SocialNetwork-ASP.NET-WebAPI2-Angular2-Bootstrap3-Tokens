using Newtonsoft.Json.Linq;
using SocialNetworkWebAPI2Angular2.Models.Entity;
using SocialNetworkWebAPI2Angular2.Models.JSON;
using SocialNetworkWebAPI2Angular2.Services.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SocialNetworkWebAPI2Angular2.Controllers
{
    [RoutePrefix("API/Chat")]
    public class PrivateChatController : ApiController
    {
        private AuthRepository _repo = null;
        public PrivateChatController()
        {
            _repo = new AuthRepository();
        }

        [Authorize]
        [Route("SendMessage")]
        [HttpPost]
        public async Task<IHttpActionResult> SendMessage(JObject request)
        {
            var requestedUserLogin = request.GetValue("reciever").ToObject<string>();
            var text = request.GetValue("text").ToObject<string>();
            var Requester = await _repo.IdentifyUserAsync("sub");
            var Requested = await _repo.FindUserByNameAsync(requestedUserLogin);

            IHttpActionResult result = BadRequest();

            using (var network = new SocialNetworkDbContext())
            {
                Requester = await network.GetUserAsync(Requester);
                Requested = await network.GetUserAsync(Requested);

                var chat = Requester.PrivateChats.Intersect(Requested.PrivateChats).FirstOrDefault(c => c.Users.Count == 2);
                if (chat != null)
                {
                    var meesage = chat.SendMessage(Requester, text);
                    network.Messages.Add(meesage);
                    await network.SaveChangesAsync();
                    result = Ok();
                }
            }
            return result;
        }

        [Authorize]
        [Route("GetMessagesFrom")]
        [HttpPost]
        public async Task<IHttpActionResult> GetMessagesFrom(JObject request)
        {
            var requestedUserLogin = request.GetValue("pullFrom").ToObject<string>();
            var fromNum = request.GetValue("fromMessageNum").ToObject<int>();
            var Requester = await _repo.IdentifyUserAsync("sub");
            var Requested = await _repo.FindUserByNameAsync(requestedUserLogin);

            using (var network = new SocialNetworkDbContext())
            {

                var chat = Requester.PrivateChats.Intersect(Requested.PrivateChats).FirstOrDefault(c => c.Users.Count == 2);
                if (chat != null)
                {
                    var messages = await chat.GetMessages(fromNum, chat.Messages.Count);
                    if (messages != null)
                    {
                        return Ok(messages.OrderBy(m=>m.MessageNumber).Select(m => new MessageJSON { sender = m.Sender.UserName, text = m.Text }).ToList());
                    }

                }
            }
            return BadRequest();
        }

        [Authorize]
        [Route("GetPrivateChatsStatuses")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPrivateChatsStatuses()
        {
            var Requester = await _repo.IdentifyUserAsync("sub");

            using (var network = new SocialNetworkDbContext())
            {
                var result = Requester.PrivateChats.Select(ch => new { secondUser = ch.Users.FirstOrDefault(u => !u.Equals(Requester)), chat = ch })
                     .Select(ch => new PrivateChatStatusJSON
                     {
                         sender = ch.secondUser.UserName
                         ,
                         seenLastTime = ch.secondUser.LastSeen
                         ,
                         messages = ch.chat.Messages.Count
                         ,
                         lastMessageRead = ch.chat.GetLastReadMessage(Requester)
                     }).ToList();


                return Ok(result);
            }
        }
    }
}
