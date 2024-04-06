using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StudentTracker.Models;
using StudentTracker.Services.Organization;

namespace StudentTracker.Controllers
{
    [ApiController]
    [Route("fieldworktracker/[controller]")]
    [EnableCors("AllowSpecificOrigin")]
    public class OrganizationController : ControllerBase
    {
        private IMapper _mapper;
        private IOrganizationService _organizationService;

        public OrganizationController(IMapper mapper, IOrganizationService organizationService)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _organizationService = organizationService ?? throw new ArgumentNullException(nameof(organizationService));
        }

        [HttpPost("add-organization")]
        public async Task<ActionResult<ServiceResponse<Organization>>> AddOrganization() {
            try {
                Console.WriteLine("organization add backend");
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var organization = JsonSerializer.Deserialize<Organization>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(await _organizationService.AddOrganization(organization));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPost("get-all")]
        public async Task<ActionResult<ServiceResponse<List<Organization>>>> GetOrganizations() {
            try {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var organization = JsonSerializer.Deserialize<Organization>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(await _organizationService.GetOrganizations(organization.userEmail));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing login request: {ex.Message}");
                return BadRequest($"Error processing login request: {ex.Message}");
            }
        }

        [HttpPut("update")]
        public async Task<ActionResult<ServiceResponse<Organization>>> UpdateOrganization() {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    string requestBody = await reader.ReadToEndAsync();

                    var organization = JsonSerializer.Deserialize<Organization>(requestBody, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(await _organizationService.UpdateOrganization(_mapper.Map<Organization>(organization)));
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