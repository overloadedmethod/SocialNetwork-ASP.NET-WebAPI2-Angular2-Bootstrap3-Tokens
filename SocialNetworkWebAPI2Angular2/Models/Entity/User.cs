using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class User:IdentityUser
    {
        public string Name { get; set; }
        public virtual ICollection<PrivateChat> PrivateChats { get; set; }
        public DateTime? LastSeen { get; set; }

        public User() : base()
        {
            PrivateChats = new HashSet<PrivateChat>();

        }

        public async Task UpdateSeenTime()
        {
            LastSeen = DateTime.Now;
        }
    }
}