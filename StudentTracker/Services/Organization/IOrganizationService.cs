using StudentTracker.Models;

namespace StudentTracker.Services.Organization
{
    public interface IOrganizationService
    {
        Task<bool> AddOrganization(Models.Organization newOrganization);
        Task<ServiceResponse<Models.Organization>> UpdateOrganization(Models.Organization updatedOrganization);

        Task<ServiceResponse<List<Models.Organization>>> GetOrganizations(string email);
    }
}