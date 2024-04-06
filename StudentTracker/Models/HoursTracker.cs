using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentTracker.Models
{
    public class HoursTracker
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string HoursType { get; set; } = "Individual";

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
        public string SupervisorEmail { get; set; } = string.Empty;

        [Required]
        public string Organization { get; set; } = string.Empty;


        public float Restricted { get; set; } = 0.0f;

        public float Unrestricted { get; set; } = 0.0f;

        public string Description { get; set; } = string.Empty;

        public float IndividualRestricted { get; set; } = 0.0f;

        public float IndividualUnrestricted { get; set; } = 0.0f;

        public float GroupUnrestricted { get; set; } = 0.0f;

        public string ContactType { get; set; } = string.Empty;

        public string FormatType { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}