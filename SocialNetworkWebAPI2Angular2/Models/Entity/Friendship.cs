using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class Friendship
    {
        [Key()]
        public string Id { get; set; }
        public User Invitor { get; set; }
        public User Invited { get; set; }

        public Friendship()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}