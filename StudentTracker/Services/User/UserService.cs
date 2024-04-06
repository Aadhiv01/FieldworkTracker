using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Data;
using StudentTracker.Models;

namespace StudentTracker.Services.User
{
    public class UserService : IUserService
    {
        private IMapper _mapper;
        private DataContext _context;

        public UserService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        async Task<bool> IUserService.AddUser(Models.User newUser)
        {
            var dbUser = _mapper.Map<Models.User>(newUser);
            _context.Users.Add(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<ServiceResponse<Models.User>> IUserService.GetUser(string email, string password)
        {
            var serviceResponse = new ServiceResponse<Models.User>();
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            serviceResponse.Data = _mapper.Map<Models.User>(dbUser);
            return serviceResponse;
        }

        async Task<ServiceResponse<List<Models.User>>> IUserService.GetUsers()
        {
            var serviceResponse = new ServiceResponse<List<Models.User>>();
            var dbUsers = await _context.Users.ToListAsync();
            serviceResponse.Data = dbUsers.Select(u => _mapper.Map<Models.User>(u)).ToList();
            return serviceResponse;
        }

        async Task<ServiceResponse<Models.User>> IUserService.UpdateUser(Models.User user)
        {
            var serviceResponse = new ServiceResponse<Models.User>();
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            dbUser = _mapper.Map<Models.User>(user);
            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<Models.User>(dbUser);
            return serviceResponse;
        }
    }
}