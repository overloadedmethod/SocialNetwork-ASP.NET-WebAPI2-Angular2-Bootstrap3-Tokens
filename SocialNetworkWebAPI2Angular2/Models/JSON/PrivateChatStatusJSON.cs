using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.JSON
{
    public class PrivateChatStatusJSON
    {
        public string sender { get; set; }
        public int lastMessageRead { get; set; }
        public int messages { get; set; } 
        public DateTime? seenLastTime { get; set; }                                                           
    }
}