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
    [RoutePrefix("API/Friends")]
    public class FriendshipController : ApiController
    {
        private AuthRepository _repo = null;
        public FriendshipController()
        {
            _repo = new AuthRepository();
        }
        [Authorize]
        [Route("AddToFriends")]
        [HttpPost]
        public async Task<IHttpActionResult> AddToFriends(JObject request)
        {
            var requestedUserLogin = request.GetValue("username").ToObject<string>();
            var Requester = await _repo.IdentifyUserAsync("sub");
            var Requested = await _repo.FindUserByNameAsync(requestedUserLogin);
            IHttpActionResult result = BadRequest();

            using (var network = new SocialNetworkDbContext())
            {
                Requester = await network.GetUserAsync(Requester);
                Requested = await network.GetUserAsync(Requested);
                if (!await network.IsFollower(Requested, Requester))
                {
                    network.Friendship.Add(new Friendship { Invitor = Requester, Invited = Requested });
                    result = Ok("You subscribed as follower");

                    if (await network.IsFollower(Requester, Requested))
                    {
                        var chat = new PrivateChat();
                        network.Chats.Add(chat);
                        chat.AddUser(Requester);
                        chat.AddUser(Requested);
                        Requester.PrivateChats.Add(chat);
                        Requested.PrivateChats.Add(chat);
                        result = Ok("Mutual Friendship Established");
                    }
                }

                await network.SaveChangesAsync();
            }
            return result;
        }

        [Authorize]
        [Route("LookFor")]
        [HttpPost]
        public async Task<IHttpActionResult> LookFor(JObject request)
        {
            var requested = request.GetValue("name").ToObject<string>();
            var requester = await _repo.IdentifyUserAsync("sub");

            using (var network = new SocialNetworkDbContext())
            {
                var result = network.Users.Where(u => u.Name.Contains(requested) || u.UserName.Contains(requested))
                     .Select(u => new UsersSearchResultJSON
                     {
                         name = u.Name,
                         username = u.UserName,
                         isFollowed = network.Friendship.Any(f => f.Invitor.Id == requester.Id && f.Invited.Id == u.Id),
                         isFriend = network.Friendship.Any(f => f.Invitor.Id == requester.Id && f.Invited.Id == u.Id)
                         && network.Friendship.Any(f => f.Invitor.Id == u.Id && f.Invited.Id == requester.Id),
                         lastSeen = u.LastSeen
                     }).ToList();

                return Ok(result);
            }
        }
    }
}
