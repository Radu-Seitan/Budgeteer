namespace Budgeteer.Domain.Entities
{
    public class Cart
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public virtual ICollection<CartProduct> CartProducts { get; set; } = new HashSet<CartProduct>();
    }
}
