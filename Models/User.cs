using PostOffice;

public class User 
{
  public int UserId { get; set; }
  public string Username { get; set; }
  public string Password { get; set; }
  public int RoleTypeId { get; set; }
  // public string Email { get; set; }
  public Customer? Customer { get; set; } = null;
  public int? EmployeeId { get; set; } = null;
}