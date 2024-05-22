﻿using Budgeteer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Budgeteer.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Product").HasKey(p => p.Id);

            builder.Property(p => p.Name).HasMaxLength(255);

            builder.HasMany(p => p.Categories).WithMany(c => c.Products)
                .UsingEntity<Dictionary<string, object>>("ProductCategory", 
                    e => e.HasOne<Category>().WithMany().HasForeignKey("CategoryId").HasConstraintName("FK_ProductCategory_Category"),
                    e => e.HasOne<Product>().WithMany().HasForeignKey("ProductId").HasConstraintName("FK_ProductCategory_Product"));
        }
    }
}
