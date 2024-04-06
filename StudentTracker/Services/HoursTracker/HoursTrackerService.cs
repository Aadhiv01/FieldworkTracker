using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Data;
using StudentTracker.Models;

namespace StudentTracker.Services.HoursTracker
{
    public class HoursTrackerService : IHoursTrackerService
    {
        private IMapper _mapper;
        private DataContext _context;

        public HoursTrackerService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        async Task<bool> IHoursTrackerService.AddHoursData(Models.HoursTracker hoursTracker)
        {
            hoursTracker.CreatedAt = DateTime.Now;
            hoursTracker.UpdatedAt = DateTime.Now;
            var dbUser = _mapper.Map<Models.HoursTracker>(hoursTracker);
            _context.HoursTrackers.Add(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<ServiceResponse<List<Models.HoursTracker>>> IHoursTrackerService.GetHoursData(string userEmail, DateTime? dateTime = null)
        {
            Console.WriteLine("HT Email: " + userEmail);
            var serviceResponse = new ServiceResponse<List<Models.HoursTracker>>();
            var query = _context.HoursTrackers.Where(i => i.UserEmail == userEmail);

            if (dateTime.Value.Year != 1)
            {
                Console.WriteLine("With HT date: " + dateTime + " " + dateTime.Value.Month);
                query = query.Where(i => i.Date.Year == dateTime.Value.Year && i.Date.Month == dateTime.Value.Month);
            }

            var dbUser = await query.ToListAsync();
            serviceResponse.Data = dbUser.Select(s => _mapper.Map<Models.HoursTracker>(s)).ToList();
            return serviceResponse;
        }
    }
}