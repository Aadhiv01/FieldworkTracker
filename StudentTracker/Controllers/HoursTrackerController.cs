using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StudentTracker.Models;
using StudentTracker.Services.HoursTracker;
using StudentTracker.Services.IndependentHoursTracker;
using StudentTracker.Services.SupervisedHoursTracker;

namespace StudentTracker.Controllers
{
    [ApiController]
    [Route("fieldworktracker/[controller]")]
    [EnableCors("AllowSpecificOrigin")]
    public class HoursTrackerController : ControllerBase
    {
        private readonly ILogger<HoursTrackerController> _logger;
        private IMapper _mapper;

        private IHoursTrackerService _hoursTrackerService;
        private IIndependentHoursTrackerService _independentHoursTrackerService;
        private ISupervisedHoursTrackerService _supervisedHoursTrackerService;

        public HoursTrackerController(ILogger<HoursTrackerController> logger, IMapper mapper, IHoursTrackerService hoursTrackerService, IIndependentHoursTrackerService independentHoursTrackerService, ISupervisedHoursTrackerService supervisedHoursTrackerService)
        {
            _logger = logger;
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _hoursTrackerService = hoursTrackerService;
            _independentHoursTrackerService = independentHoursTrackerService;
            _supervisedHoursTrackerService = supervisedHoursTrackerService;
        }

        [HttpPost("hours/get")]
        public async  Task<ActionResult<ServiceResponse<List<HoursTracker>>>> GetHours() {
            try {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var hours = JsonSerializer.Deserialize<HoursTracker>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    Console.WriteLine("Hours Backend: " + hours);
                    
                    DateTime? dateTime = hours.Date;

                    if(dateTime.HasValue) {
                        return Ok(await _hoursTrackerService.GetHoursData(hours.UserEmail, dateTime));
                    }

                    return Ok(await _hoursTrackerService.GetHoursData(hours.UserEmail));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPost("hours/add")]
        public async Task<ActionResult<ServiceResponse<HoursTracker>>> AddHoursData() {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string requestBody = await Task.Run(async () => await reader.ReadToEndAsync());

                var hours = JsonSerializer.Deserialize<HoursTracker>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var hoursEntry = _mapper.Map<HoursTracker>(hours);

                return Ok(await _hoursTrackerService.AddHoursData(hoursEntry));
            }
        }

        [HttpPost("independent/get-all")]
        public async  Task<ActionResult<ServiceResponse<List<IndependentHoursTracker>>>> GetIndependentHours() {
            try {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var hours = JsonSerializer.Deserialize<IndependentHoursTracker>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    Console.WriteLine("I Hours Backend: " + hours);
                    
                    DateTime? dateTime = hours.Date;

                    if(dateTime.HasValue) {
                        return Ok(await _independentHoursTrackerService.GetIndependentHoursByMonth(hours.UserEmail, dateTime));
                    }

                    return Ok(await _independentHoursTrackerService.GetIndependentHoursByMonth(hours.UserEmail));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPost("independent/add")]
        public async Task<ActionResult<ServiceResponse<IndependentHoursTracker>>> AddIndependentHours() {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string requestBody = await Task.Run(async () => await reader.ReadToEndAsync());

                var hours = JsonSerializer.Deserialize<IndependentHoursTracker>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var hoursEntry = _mapper.Map<IndependentHoursTracker>(hours);

                return Ok(await _independentHoursTrackerService.AddIndependentHours(hoursEntry));
            }
        }

        [HttpPost("supervised/get-all")]
        public async  Task<ActionResult<ServiceResponse<List<SupervisedHoursTracker>>>> GetSupervisedHours() {
            try {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var hours = JsonSerializer.Deserialize<SupervisedHoursTracker>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    DateTime? dateTime = hours.Date;

                    if(dateTime.HasValue) {
                        return Ok(await _supervisedHoursTrackerService.GetSupervisedHoursByMonth(hours.UserEmail, dateTime));
                    }

                    return Ok(await _supervisedHoursTrackerService.GetSupervisedHoursByMonth(hours.UserEmail));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPost("supervised/add")]
        public async Task<ActionResult<ServiceResponse<SupervisedHoursTracker>>> AddSupervisedHours() {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string requestBody = await Task.Run(async () => await reader.ReadToEndAsync());

                var hours = JsonSerializer.Deserialize<SupervisedHoursTracker>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                var hoursEntry = _mapper.Map<SupervisedHoursTracker>(hours);

                return Ok(await _supervisedHoursTrackerService.AddSupervisedHours(hoursEntry));
            }
        }
    }
}