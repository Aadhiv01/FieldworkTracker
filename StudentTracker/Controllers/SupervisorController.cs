using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StudentTracker.Models;
using StudentTracker.Services.Supervisor;

namespace StudentTracker.Controllers
{
    [ApiController]
    [Route("fieldworktracker/[controller]")]
    [EnableCors("AllowSpecificOrigin")]
    public class SupervisorController : ControllerBase
    {
        private IMapper _mapper;
        private ISupervisorService _supervisorService;

        public SupervisorController(IMapper mapper, ISupervisorService supervisorService) {
            _mapper = mapper;
            _supervisorService = supervisorService;
        }

        [HttpPost("add-supervisor")]
        public async Task<ActionResult<ServiceResponse<Supervisor>>> AddSupervisor() {
            try {
                Console.WriteLine("supervisor add backend");
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var supervisor = JsonSerializer.Deserialize<Supervisor>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    Console.WriteLine("Supervisor in backend for add: " + JsonSerializer.Serialize(supervisor) + " | " + requestBody);

                    return Ok(await _supervisorService.AddSupervisor(supervisor));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPost("get-all")]
        public async Task<ActionResult<ServiceResponse<List<Supervisor>>>> GetSupervisors() {
            try {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var supervisor = JsonSerializer.Deserialize<Supervisor>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(await _supervisorService.GetSupervisors(supervisor.userEmail));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPut("update")]
        public async Task<ActionResult<ServiceResponse<Supervisor>>> UpdateSupervisor() {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var supervisor = JsonSerializer.Deserialize<Supervisor>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(await _supervisorService.UpdateSupervisor(_mapper.Map<Supervisor>(supervisor)));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }
        
    }
}