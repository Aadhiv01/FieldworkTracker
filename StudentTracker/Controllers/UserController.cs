using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StudentTracker.Models;
using StudentTracker.Services.User;

namespace StudentTracker.Controllers
{
    
    [ApiController]
    [Route("fieldworktracker/[controller]")]
    [EnableCors("AllowSpecificOrigin")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;

        public UserController(IMapper mapper, IUserService userService)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<Models.User>>> GetLoginStatus() {
            Console.WriteLine("In Login: ");
            try {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var credentials = JsonSerializer.Deserialize<User>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(await _userService.GetUser(credentials.Email, credentials.Password));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPost("signup")]
        public Task<bool> AddUser() {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string requestBody = reader.ReadToEnd();

                var credentials = JsonSerializer.Deserialize<User>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var newUser = _mapper.Map<Models.User>(credentials);

                return _userService.AddUser(newUser);
            }
        }

        [HttpPut("update")]
        public async Task<ActionResult<ServiceResponse<User>>> UpdateUser(Models.User user) {
            return Ok(await _userService.UpdateUser(user));
        }
    }
}