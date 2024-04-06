using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentTracker.Models;

namespace StudentTracker.Services.IndependentHoursTracker
{
    public interface IIndependentHoursTrackerService
    {
        Task<bool> AddIndependentHours(Models.IndependentHoursTracker independentHours);

        Task<ServiceResponse<List<Models.IndependentHoursTracker>>> GetIndependentHoursByMonth(string userEmail, DateTime? dateTime = null);
    }
}