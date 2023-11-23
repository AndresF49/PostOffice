namespace PostOffice;

public class UsersArray {
	public static User[] UserArr = new User[] 
	{ 
		new User { UserId=0, RoleTypeId=0, EmployeeId=0, Username="admin", Password="admin", CustomerId=null },
	 	new User { UserId=1, RoleTypeId=0, EmployeeId=1, Username="andres", Password="andres", CustomerId=null },
		new User { UserId=2, RoleTypeId=1, EmployeeId=2, Username="employee", Password="employee", CustomerId=null },
		new User { UserId=3, RoleTypeId=2, EmployeeId=null, Username="customer", Password="customer", CustomerId=0 },

	};
}
