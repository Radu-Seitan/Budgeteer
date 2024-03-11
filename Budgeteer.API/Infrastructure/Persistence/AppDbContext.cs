using Microsoft.EntityFrameworkCore;
using Budgeteer.Domain.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Budgeteer.Infrastructure.Persistence
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<AppImage> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Store>(store =>
            {
                store.Property(s => s.Name)
                    .HasMaxLength(40);

                store.HasOne(s => s.Image)
                    .WithMany(i => i.Stores)
                    .HasForeignKey(s => s.ImageId)
                    .OnDelete(DeleteBehavior.SetNull);

                store.HasMany(s => s.Expenses)
                    .WithOne(e => e.Store)
                    .HasForeignKey(e => e.StoreId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<User>(user =>
            {
                user.Property(u => u.Username)
                    .HasMaxLength(40);

                user.HasMany(u => u.Incomes)
                    .WithOne(i => i.User)
                    .OnDelete(DeleteBehavior.Cascade);

                user.HasMany(u => u.Expenses)
                    .WithOne(i => i.User)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Following code ensures that enum properties are sent to DB in their string form
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    var propertyType = Nullable.GetUnderlyingType(property.ClrType) ?? property.ClrType;
                    if (propertyType.IsEnum)
                    {
                        property.SetColumnType("nvarchar(64)");
                        property.SetProviderClrType(typeof(string));
                    }
                }
            }
        }
    }
}
