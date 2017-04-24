using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.JSON
{
    public class UsersSearchResultJSON
    {
        public string username { get; set; }
        public string name { get; set; }
        public bool isFriend { get; set; }
        public bool isFollowed { get; set; }

        public DateTime? lastSeen { get; set; }
    }
}