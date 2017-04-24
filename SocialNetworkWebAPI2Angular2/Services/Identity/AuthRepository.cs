using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using SocialNetworkWebAPI2Angular2.Models.Entity;
using SocialNetworkWebAPI2Angular2.Models.JSON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace SocialNetworkWebAPI2Angular2.Services.Identity
{
    public class AuthRepository : IDisposable
    {
        private SocialNetworkDbContext _identityDb;

        private UserManager<User> _userManager;

        public AuthRepository()
        {
            _identityDb = new SocialNetworkDbContext();
            _userManager = new UserManager<User>(new UserStore<User>(_identityDb));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            var user = new User
            {
                UserName = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<User> FindUserAsync(string userName, string password)
        {
            return await _userManager.FindAsync(userName, password);
        }

        public User IdentifyUser(string role)
        {
            var principal = ClaimsPrincipal.Current;
            var idClaim = principal.Claims.FirstOrDefault(c => c.Type.Equals(role));
            return _userManager.FindByName(idClaim.Value);
        }

        public async Task<User> IdentifyUserAsync(string role)
        {
            var principal = ClaimsPrincipal.Current;
            var idClaim = principal.Claims.FirstOrDefault(c => c.Type.Equals(role));

            return await _userManager.FindByNameAsync(idClaim.Value);
        }

        public async Task<User> FindUserByNameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public void Dispose()
        {
            //_identityDb.GetUser(IdentifyUser("sub")).LastSeen = DateTime.Now;
            //_identityDb.SaveChanges();
            _identityDb.Dispose();
            _userManager.Dispose();

        }
    }
}