using PostOffice;

public class User 
{
  public int UserId { get; set; }
  public string Username { get; set; }
  public string Password { get; set; }
  public string RoleType { get; set; }
  public int? CustomerId { get; set; } = null;
  public int? EmployeeId { get; set; } = null;
}