using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddIndependentHoursTrackerSupervisedHoursTracker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IndependentHoursTrackers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Supervisor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Organization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Restricted = table.Column<float>(type: "real", nullable: false),
                    Unrestricted = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndependentHoursTrackers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SupervisedHoursTrackers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Supervisor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Organization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IndividualRestricted = table.Column<float>(type: "real", nullable: false),
                    IndividualUnrestricted = table.Column<float>(type: "real", nullable: false),
                    GroupUnrestricted = table.Column<float>(type: "real", nullable: false),
                    ContactType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormatType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupervisedHoursTrackers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IndependentHoursTrackers");

            migrationBuilder.DropTable(
                name: "SupervisedHoursTrackers");
        }
    }
}
