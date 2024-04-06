using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StudentTracker.Models;

namespace StudentTracker.Services.Supervisor
{
    public interface ISupervisorService
    {
        Task<bool> AddSupervisor(Models.Supervisor newSupervisor);
        Task<ServiceResponse<Models.Supervisor>> UpdateSupervisor(Models.Supervisor updatedSupervisor);

        Task<ServiceResponse<List<Models.Supervisor>>> GetSupervisors(string email);
    }
}