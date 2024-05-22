﻿using Budgeteer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Budgeteer.Infrastructure.Configurations
{
    public class CartProductConfiguration : IEntityTypeConfiguration<CartProduct>
    {
        public void Configure(EntityTypeBuilder<CartProduct> builder)
        {
            builder.ToTable("CartProducts")
                .HasKey(cp => new
                {
                    cp.CartId,
                    cp.ProductId
                });

            builder.Property(cp => cp.Quantity)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(cp => cp.Price)
                .IsRequired()
                .HasDefaultValue(0);

            builder.HasOne(cp => cp.Cart)
                .WithMany(c => c.CartProducts)
                .HasForeignKey(cp => cp.CartId)
                .HasConstraintName("FK_CartProduct_Cart");

            builder.HasOne(cp => cp.Product)
                .WithMany(p => p.CartProducts)
                .HasForeignKey(cp => cp.ProductId)
                .HasConstraintName("FK_CartProduct_Product");
        }
    }
}
