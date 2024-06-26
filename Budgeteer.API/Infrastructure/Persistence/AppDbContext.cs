﻿using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Budgeteer.Infrastructure.Persistence
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid>
    {
        public DbSet<Income> Incomes { get; set; }

        public DbSet<Expense> Expenses { get; set; }

        public DbSet<Store> Stores { get; set; }

        public DbSet<AppImage> Images { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<CartProduct> CartProducts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) :
            base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            new CategoryConfiguration().Configure(builder.Entity<Category>());
            new ProductConfiguration().Configure(builder.Entity<Product>());
            new CartConfiguration().Configure(builder.Entity<Cart>());
            new CartProductConfiguration().Configure(builder.Entity<CartProduct>());

            builder.Entity<Store>(store =>
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

            builder.Entity<User>(user =>
            {
                user.Property(u => u.UserName)
                    .HasMaxLength(40);

                user.HasMany(u => u.Incomes)
                    .WithOne(i => i.User)
                    .OnDelete(DeleteBehavior.Cascade);

                user.HasMany(u => u.Expenses)
                    .WithOne(i => i.User)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Following code ensures that enum properties are sent to DB in their string form
            foreach (var entityType in builder.Model.GetEntityTypes())
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
