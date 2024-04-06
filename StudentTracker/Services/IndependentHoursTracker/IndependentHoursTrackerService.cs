using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Data;
using StudentTracker.Models;

namespace StudentTracker.Services.IndependentHoursTracker
{
    public class IndependentHoursTrackerService : IIndependentHoursTrackerService
    {
        private IMapper _mapper;
        private DataContext _context;

        public IndependentHoursTrackerService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        async Task<bool> IIndependentHoursTrackerService.AddIndependentHours(Models.IndependentHoursTracker independentHours)
        {
            independentHours.CreatedAt = DateTime.Now;
            independentHours.UpdatedAt = DateTime.Now;
            var dbUser = _mapper.Map<Models.IndependentHoursTracker>(independentHours);
            _context.IndependentHoursTrackers.Add(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<ServiceResponse<List<Models.IndependentHoursTracker>>> IIndependentHoursTrackerService.GetIndependentHoursByMonth(string userEmail, DateTime? dateTime)
        {
            Console.WriteLine("IH Email: " + userEmail);
            var serviceResponse = new ServiceResponse<List<Models.IndependentHoursTracker>>();
            var query = _context.IndependentHoursTrackers.Where(i => i.UserEmail == userEmail);

            if (dateTime.Value.Year != 1)
            {
                Console.WriteLine("With date: " + dateTime + " " + dateTime.Value.Month);
                query = query.Where(i => i.Date.Year == dateTime.Value.Year && i.Date.Month == dateTime.Value.Month);
            }

            var dbUser = await query.ToListAsync();
            serviceResponse.Data = dbUser.Select(s => _mapper.Map<Models.IndependentHoursTracker>(s)).ToList();
            return serviceResponse;
        }
    }
}