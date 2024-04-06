using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTracker.Migrations
{
    /// <inheritdoc />
    public partial class UpdateIndependentHoursTrackerSupervisedHoursTracker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "SupervisedHoursTrackers",
                type: "datetime2",
                nullable: false,
                defaultValue: DateTime.Now);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "SupervisedHoursTrackers",
                type: "datetime2",
                nullable: false,
                defaultValue: DateTime.Now);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "IndependentHoursTrackers",
                type: "datetime2",
                nullable: false,
                defaultValue: DateTime.Now);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "IndependentHoursTrackers",
                type: "datetime2",
                nullable: false,
                defaultValue: DateTime.Now);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "SupervisedHoursTrackers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "SupervisedHoursTrackers");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "IndependentHoursTrackers");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "IndependentHoursTrackers");
        }
    }
}
