namespace PostOffice;

public class CustomersArray {
	public static Customer[] CustomerArr = new Customer[] 
	{ 
    new Customer { CustomerId=0, Email="johnsmith@gmail.com", FirstName="John", MiddleInitial='P', LastName="Smith", PhoneNumber="234-567-8910", User = UsersArray.UserArr[3]},
    new Customer { CustomerId=1, Email="janedoe@gmail.com", FirstName="Jane", LastName="Doe", User = UsersArray.UserArr[4]},
    
	};
}