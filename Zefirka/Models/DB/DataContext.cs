using Microsoft.EntityFrameworkCore;

namespace Zefirka.Models.DB
{
    public class DataContext : DbContext
    {
        public DbSet<Data> Data { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=SmartHouseGani;Trusted_Connection=True;TrustServerCertificate=true");
        }
    }
}
