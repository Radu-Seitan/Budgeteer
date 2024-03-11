namespace Budgeteer.Domain.Entities
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        protected BaseEntity()
        {
            CreatedAt = DateTime.Now;
        }
    }
}
