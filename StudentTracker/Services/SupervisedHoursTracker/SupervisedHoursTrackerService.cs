using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Data;
using StudentTracker.Models;

namespace StudentTracker.Services.SupervisedHoursTracker
{
    public class SupervisedHoursTrackerService : ISupervisedHoursTrackerService
    {

        private IMapper _mapper;
        private DataContext _context;

        public SupervisedHoursTrackerService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        async Task<bool> ISupervisedHoursTrackerService.AddSupervisedHours(Models.SupervisedHoursTracker supervisedHours)
        {
            supervisedHours.CreatedAt = DateTime.Now;
            supervisedHours.UpdatedAt = DateTime.Now;
            var dbUser = _mapper.Map<Models.SupervisedHoursTracker>(supervisedHours);
            _context.SupervisedHoursTrackers.Add(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        async Task<ServiceResponse<List<Models.SupervisedHoursTracker>>> ISupervisedHoursTrackerService.GetSupervisedHoursByMonth(string userEmail, DateTime? dateTime)
        {
            Console.WriteLine("SH Email: " + userEmail);
            var serviceResponse = new ServiceResponse<List<Models.SupervisedHoursTracker>>();
            var query = _context.SupervisedHoursTrackers.Where(i => i.UserEmail == userEmail);

            if (dateTime.Value.Year != 1)
            {
                Console.WriteLine("With date: " + dateTime + " " + dateTime.Value.Month);
                query = query.Where(i => i.Date.Year == dateTime.Value.Year && i.Date.Month == dateTime.Value.Month);
            }

            Console.WriteLine("No datetime : " + dateTime + " " + dateTime.Value.Year);

            var dbUser = await query.ToListAsync();
            serviceResponse.Data = dbUser.Select(s => _mapper.Map<Models.SupervisedHoursTracker>(s)).ToList();
            return serviceResponse;
        }
    }
}