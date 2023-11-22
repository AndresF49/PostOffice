namespace PostOffice;

public class CustomersArray {
	public static Customer[] CustomerArr = new Customer[] 
	{ 
    new Customer { CustomerId=0, Email="customer@gmail.com", FirstName="CustomerFirst", LastName="CustomerLast", MiddleInitial='C', PhoneNumber="123-456-7891", },
    new Customer { CustomerId=1, Email="johnsmith@gmail.com", FirstName="John", MiddleInitial='P', LastName="Smith", PhoneNumber="234-567-8910", },
    new Customer { CustomerId=2, Email="janedoe@gmail.com", FirstName="Jane", LastName="Doe" },
    
	};
}