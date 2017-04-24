using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class Message
    {
        [Key()]
        public string Id { get; set; }
        public User Sender { get; set; }
        public int MessageNumber { get; set; }
        public PrivateChat Chat { get; set; }
        public string Text { get; set; }

        public Message()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}