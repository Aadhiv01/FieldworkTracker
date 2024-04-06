using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Data;
using StudentTracker.Models;

namespace StudentTracker.Services.Organization
{
    public class OrganizationService : IOrganizationService
    {

        private IMapper _mapper;
        private DataContext _context;

        public OrganizationService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        async Task<bool> IOrganizationService.AddOrganization(Models.Organization newOrganization)
        {
            var dbUser = _mapper.Map<Models.Organization>(newOrganization);
            _context.Organizations.Add(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<ServiceResponse<List<Models.Organization>>> IOrganizationService.GetOrganizations(string email)
        {
            Console.WriteLine("Organization uEmail: " + email);
            var serviceResponse = new ServiceResponse<List<Models.Organization>>();
            var dbUser = await _context.Organizations.Where(o => o.userEmail == email).ToListAsync();
            serviceResponse.Data = dbUser.Select(o => _mapper.Map<Models.Organization>(o)).ToList();
            return serviceResponse;
        }

        async Task<ServiceResponse<Models.Organization>> IOrganizationService.UpdateOrganization(Models.Organization updatedOrganization)
        {
            var serviceResponse = new ServiceResponse<Models.Organization>();
            var dbUser = await _context.Organizations.FirstOrDefaultAsync(o => o.userEmail.Equals(updatedOrganization.userEmail));
            dbUser = _mapper.Map<Models.Organization>(updatedOrganization);
            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<Models.Organization>(dbUser);
            return serviceResponse;
        }
    }
}