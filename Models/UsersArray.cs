namespace PostOffice;

public class UsersArray {
	public static User[] UserArr = new User[] 
	{ 
		new User { UserId=0, RoleType=Roles.ADMIN, EmployeeId=0, Username="admin", Password="admin", CustomerId=null },
	 	new User { UserId=1, RoleType=Roles.ADMIN, EmployeeId=1, Username="andres", Password="andres", CustomerId=null },
		new User { UserId=2, RoleType=Roles.EMPLOYEE, EmployeeId=2, Username="employee", Password="employee", CustomerId=null },
		new User { UserId=3, RoleType=Roles.CUSTOMER, EmployeeId=null, Username="customer", Password="customer", CustomerId=0 },

	};
}
