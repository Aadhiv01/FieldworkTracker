using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTracker.Migrations
{
    /// <inheritdoc />
    public partial class OrganizationsUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userId",
                table: "Organizations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "Organizations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
