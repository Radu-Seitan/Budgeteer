using Budgeteer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Budgeteer.Infrastructure.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Category").HasKey(c => c.Id);

            builder.Property(c => c.Name).HasMaxLength(255);

            builder.HasData(new Category
            {
                Id = 1,
                Name = "Altele"
            });
        }
    }
}
