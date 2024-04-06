using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTracker.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSupervisorOrganization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userId",
                table: "Supervisors");

            migrationBuilder.RenameColumn(
                name: "supervisorEmail",
                table: "Supervisors",
                newName: "Email");

            migrationBuilder.AddColumn<string>(
                name: "userEmail",
                table: "Supervisors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "userEmail",
                table: "Organizations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userEmail",
                table: "Supervisors");

            migrationBuilder.DropColumn(
                name: "userEmail",
                table: "Organizations");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Supervisors",
                newName: "supervisorEmail");

            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "Supervisors",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
