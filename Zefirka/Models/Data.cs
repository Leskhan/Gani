using Microsoft.EntityFrameworkCore;

namespace Zefirka.Models
{
    [Keyless]
    public class Data
    {
        public DateTime? Date { get; set; }
        public int? Temperature { get; set; }
        public int? Wind { get; set; }
    }
}
