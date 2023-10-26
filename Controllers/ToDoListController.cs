using Microsoft.AspNetCore.Mvc;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDoListController : ControllerBase
{

	private static IEnumerable<ToDoItem> ListItems = new[] {
		new ToDoItem { Id=1, DueDate=DateOnly.FromDateTime(DateTime.Now), Item="Write React code"},
		new ToDoItem { Id=2, DueDate=DateOnly.FromDateTime(DateTime.Now), Item="Develop backend!"}

	};

    private readonly ILogger<ToDoListController> _logger;

    public ToDoListController(ILogger<ToDoListController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ToDoItem> Get()
    {

		return ListItems;
		
    }

	// [HttpPost]
	// public IActionResult PostToDoItem(ToDoItem toDoItem) 
	// {
	// 	// supposed to be an async/await because we will be waiting for response from DB

	// 	// DB SQL query or sumthin

	// 	ListItems.Add(toDoItem);

	// 	return Ok();

	// }
}

