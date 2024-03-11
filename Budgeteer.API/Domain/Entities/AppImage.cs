using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budgeteer.Domain.Entities
{
    public class AppImage
    {
        public Guid Id { get; set; }
        public byte[] Content { get; set; }
        public string Type { get; set; }
        public int StoreId { get; set; }
        public List<Store> Stores { get; set; }
    }
}
