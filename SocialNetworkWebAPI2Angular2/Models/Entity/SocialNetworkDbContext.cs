using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Models.Entity
{
    public class SocialNetworkDbContext : IdentityDbContext<IdentityUser>
    {
        public SocialNetworkDbContext() : base("SocialNetworkDbContext") { }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<PrivateChat> Chats { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Friendship> Friendship { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.PrivateChats)
                .WithMany(c => c.Users);


            modelBuilder.Entity<PrivateChat>()
                .HasMany(c => c.Messages)
                .WithRequired(m => m.Chat);


            modelBuilder.Entity<PrivateChat>()
                .HasMany(c => c.Users)
                .WithMany(u => u.PrivateChats);

        }

        public async Task<User> GetUserAsync(string username)
        {
            return await Users.FirstOrDefaultAsync(user => user.UserName.Equals(username));
        }

        public User GetUser(string username)
        {
            return Users.FirstOrDefault(user => user.UserName.Equals(username));
        }

        public User GetUser(User user)
        {
            return Users.FirstOrDefault(u => u.Id.Equals(user.Id));
        }

        public async Task<User> GetUserAsync(User user)
        {
            return await Users.FirstOrDefaultAsync(u=>u.Id.Equals(user.Id));
        }

        public async Task<List<User>> GetFollowersAsync(User user)
        {
            return await Friendship
                .Where(friend => friend.Invited.Id.Equals(user.Id))
                .Select(f => f.Invitor)
                .ToListAsync();
        }

        public async Task<List<User>> GetFollowedAsync(User user)
        {
            return await Friendship
                .Where(friend => friend.Invitor.Id.Equals(user.Id))
                .Select(u => u.Invited)
                .ToListAsync();
        }

        public async Task<bool> IsMututalFriends(User user1,User user2)
        {
            return await IsFollower(user1, user2)
                && await IsFollower(user2, user1); 
        }

        public async Task<bool> IsFollower(User Followed,User Follower)
        {
            return Friendship.Any(fr => fr.Invited.Id.Equals(Followed.Id) && fr.Invitor.Id.Equals(Follower.Id));
        }
    }
}