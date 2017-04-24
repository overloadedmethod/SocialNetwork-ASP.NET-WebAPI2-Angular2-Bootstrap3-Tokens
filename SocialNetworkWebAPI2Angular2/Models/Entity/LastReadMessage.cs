using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class LastReadMessage
    {
        [Key()]
        public string Id { get; set; }
        public User User { get; set; }
        public int NumberOfLastReadMessage { get; set; }

        public LastReadMessage()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}