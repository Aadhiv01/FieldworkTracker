using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTracker.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIndependentHoursTrackerSupervisedHoursTrackerDateTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "SupervisedHoursTrackers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndTime",
                table: "SupervisedHoursTrackers",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "SupervisedHoursTrackers",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "IndependentHoursTrackers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndTime",
                table: "IndependentHoursTrackers",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "IndependentHoursTrackers",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "SupervisedHoursTrackers");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "SupervisedHoursTrackers");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "SupervisedHoursTrackers");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "IndependentHoursTrackers");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "IndependentHoursTrackers");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "IndependentHoursTrackers");
        }
    }
}
