using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Zefirka.Models;
using Zefirka.Models.DB;
using Zefirka.ViewModels;

namespace Zefirka.Controllers
{
    public class HomeController : Controller
    {
        public HomeController(ILogger<HomeController> logger)
        {
            
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [ActionName("Calculator")]
        public IActionResult Calculator()
        {
            return View("Calculator");
        }

        [HttpGet]
        public DataViewModel GetData()
        {
            var data = new List<Data>();
            var dataViewModel = new DataViewModel();

            using (DataContext db = new DataContext())
            {
                data = db.Data.ToList();
            }

            dataViewModel.Date = data.Select(d => Convert.ToString(d.Date?.ToString("dd.MM"))).ToList();
            dataViewModel.Temperature = data.Select(d => Convert.ToInt32(d.Temperature)).ToList();
            dataViewModel.Wind = data.Select(d => Convert.ToInt32(d.Wind)).ToList();
            return dataViewModel;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}