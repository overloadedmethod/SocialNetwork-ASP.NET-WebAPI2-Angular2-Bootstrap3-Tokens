using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class PrivateChat
    {
        [Key()]
        public string Id { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<LastReadMessage> LastMessages { get; set; }
        public string Subject { get; set; }

        public PrivateChat()
        {
            Id = Guid.NewGuid().ToString();
            Users = new HashSet<User>();
            Messages = new HashSet<Message>();
            LastMessages = new HashSet<LastReadMessage>();
        }

        public void SetLastReadMessage(User user, int messageNum)
        {
            var messageRead = LastMessages.Where(lm => lm.User.Id.Equals(user.Id)).FirstOrDefault();
            if (messageRead != null)
                messageRead.NumberOfLastReadMessage = messageNum;
        }

        public int GetLastReadMessage(User user)
        {
            return LastMessages.FirstOrDefault(lm => lm.User.Equals(user)).NumberOfLastReadMessage;
        }

        public void AddUser(User user)
        {
            Users.Add(user);
            LastMessages.Add(new LastReadMessage { User = user, NumberOfLastReadMessage = 0 });
        }

        public Message SendMessage(User user, string text)
        {
            var userLastMessages = LastMessages.Where(lm => lm.User.Id.Equals(user.Id)).FirstOrDefault();
            if (userLastMessages != null)
            {
                var message = new Message();
                message.Chat = this;
                message.MessageNumber = Messages.Count;
                message.Sender = user;
                message.Text = text;

                Messages.Add(message);
                userLastMessages.NumberOfLastReadMessage = Messages.Count;
                return message;

            }
            return null;
        }

        public async Task<IEnumerable<Message>> GetMessages(int from, int to)
        {
            try
            {
                if (from <= to && to <= Messages.Count)
                    return Messages.Skip(from).Take(to - from);
            }
            catch (Exception e) { }

            return await Task.FromResult<IEnumerable<Message>>(null);
        }
    }
}