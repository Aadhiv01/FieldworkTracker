using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StudentTracker.Models;

namespace StudentTracker.Services.User
{
    public interface IUserService
    {
        Task<bool> AddUser(Models.User newUser);

        Task<ServiceResponse<Models.User>> GetUser(string email, string password);

        Task<ServiceResponse<List<Models.User>>> GetUsers();

        Task<ServiceResponse<Models.User>> UpdateUser(Models.User user);
    }
}