using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Data;
using StudentTracker.Models;

namespace StudentTracker.Services.Supervisor
{
    public class SupervisorService : ISupervisorService
    {
        private IMapper _mapper;
        private DataContext _context;

        public SupervisorService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        async Task<bool> ISupervisorService.AddSupervisor(Models.Supervisor newSupervisor)
        {
            var dbUser = _mapper.Map<Models.Supervisor>(newSupervisor);
            _context.Supervisors.Add(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<ServiceResponse<List<Models.Supervisor>>> ISupervisorService.GetSupervisors(string email)
        {
            Console.WriteLine("Email: " + email);
            var serviceResponse = new ServiceResponse<List<Models.Supervisor>>();
            var dbUser = await _context.Supervisors.Where(s => s.userEmail == email).ToListAsync();
            serviceResponse.Data = dbUser.Select(s => _mapper.Map<Models.Supervisor>(s)).ToList();
            return serviceResponse;
        }

        async Task<ServiceResponse<Models.Supervisor>> ISupervisorService.UpdateSupervisor(Models.Supervisor updatedSupervisor)
        {
            var serviceResponse = new ServiceResponse<Models.Supervisor>();
            var dbUser = await _context.Supervisors.FirstOrDefaultAsync(s => s.BACBID.Equals(updatedSupervisor.BACBID));
            dbUser = _mapper.Map<Models.Supervisor>(updatedSupervisor);
            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<Models.Supervisor>(dbUser);
            return serviceResponse;
        }
    }
}