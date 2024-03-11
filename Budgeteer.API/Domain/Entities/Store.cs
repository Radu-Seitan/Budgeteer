namespace Budgeteer.Domain.Entities
{
    public class Store : BaseEntity
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public AppImage Image { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}
