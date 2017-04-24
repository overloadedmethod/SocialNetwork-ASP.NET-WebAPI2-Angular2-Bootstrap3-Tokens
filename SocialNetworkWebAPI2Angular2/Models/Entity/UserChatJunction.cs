using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class UserChatJunction
    {
        [Key()]
        public string Id { get; set; }
        public PrivateChat Chat { get; set; }
        public virtual ICollection<User> Users { get; set; }

        public UserChatJunction()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}