using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentTracker.Models;

namespace StudentTracker.Services.SupervisedHoursTracker
{
    public interface ISupervisedHoursTrackerService
    {
        Task<bool> AddSupervisedHours(Models.SupervisedHoursTracker supervisedHours);

        Task<ServiceResponse<List<Models.SupervisedHoursTracker>>> GetSupervisedHoursByMonth(string userEmail, DateTime? dateTime = null);
    }
}