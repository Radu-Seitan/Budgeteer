namespace Budgeteer.Domain.Entities
{
    public class CartProduct
    {
        public int CartId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public virtual Cart Cart { get; set; } = null!;

        public virtual Product Product { get; set; } = null!;
    }
}
