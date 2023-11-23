namespace PostOffice;

public class UsersArray {
	public static User[] UserArr = new User[] 
	{ 
		new User { UserId=0, RoleTypeId=0, EmployeeId=0, Username="admin", Password="admin", Customer=null },
	 	new User { UserId=1, RoleTypeId=0, EmployeeId=1, Username="andres", Password="andres", Customer=null },
		new User { UserId=2, RoleTypeId=1, EmployeeId=2, Username="employee", Password="employee", Customer=null },
		new User { UserId=3, RoleTypeId=2, EmployeeId=null, Username="johnsmith", Password="johnsmith", Customer=CustomersArray.CustomerArr[0] },
		new User { UserId=4, RoleTypeId=2, EmployeeId=null, Username="janedoe", Password="janedoe", Customer=CustomersArray.CustomerArr[1] },

	};
}
