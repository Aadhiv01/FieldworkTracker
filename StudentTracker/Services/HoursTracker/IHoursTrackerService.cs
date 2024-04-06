using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentTracker.Models;

namespace StudentTracker.Services.HoursTracker
{
    public interface IHoursTrackerService
    {
        Task<bool> AddHoursData(Models.HoursTracker hoursTracker);

        Task<ServiceResponse<List<Models.HoursTracker>>> GetHoursData(string userEmail, DateTime? dateTime = null);
    }
}