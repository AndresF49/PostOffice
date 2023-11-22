namespace PostOffice;

public class UsersArray {
	public static User[] UserArr = new User[] 
	{ 
		new User { UserId=0, Email="admin@gmail.com", RoleTypeId=0, EmployeeId=0, Username="admin", Password="admin", CustomerId=null },
	 	new User { UserId=1, Email="andres@gmail.com", RoleTypeId=0, EmployeeId=1, Username="andres", Password="andres", CustomerId=null },
		new User { UserId=2, Email="employee@gmail.com", RoleTypeId=1, EmployeeId=2, Username="employee", Password="employee", CustomerId=null },
		new User { UserId=3, Email="johnsmith@gmail.com", RoleTypeId=2, EmployeeId=null, Username="johnsmith", Password="johnsmith", CustomerId=1 },
		new User { UserId=4, Email="janedoe@gmail.com", RoleTypeId=2, EmployeeId=null, Username="janedoe", Password="janedoe", CustomerId=2 },

	};
}
