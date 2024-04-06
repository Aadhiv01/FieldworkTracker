using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudentTracker.Models;

namespace StudentTracker.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Supervisor> Supervisors => Set<Supervisor>();
        public DbSet<Organization> Organizations => Set<Organization>();
        public DbSet<HoursTracker> HoursTrackers => Set<HoursTracker>();
        public DbSet<IndependentHoursTracker> IndependentHoursTrackers => Set<IndependentHoursTracker>();
        public DbSet<SupervisedHoursTracker> SupervisedHoursTrackers => Set<SupervisedHoursTracker>();
    }
}