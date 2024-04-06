using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentTracker.Models
{
    public class SupervisedHoursTracker
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string UserEmail { get; set; } = string.Empty;
        
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public string Supervisor { get; set; } = string.Empty;

        [Required]
        public string Organization { get; set; } = string.Empty;


        public float IndividualRestricted { get; set; }

        public float IndividualUnrestricted { get; set; }

        public float GroupUnrestricted { get; set; }

        [Required]
        public string ContactType { get; set; } = string.Empty;

        [Required]
        public string FormatType { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}