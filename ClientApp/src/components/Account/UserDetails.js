

export default function UserDetails({ authentication }) {

  // ----- Backend stuff ----- //
  // request profile -> either a customer or an employee
  // IF CustomerId in Users is NULL THEN
  // SELECT * FROM Employees
  // WHERE Users.EmployeeId == Employees.EmployeeId

  // IF EmployeeId in Users is NULL THEN
  // SELECT * FROM Customers
  // WHERE Users.CustomerId == Customers.CustomerId

  // ----- Check role of person on front end and make appropriate request ----- //

  const fetchCustomerProfile = async () => {

    try {
      const response = await fetch('profile/GetCustomerProfile', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CustomerId: authentication.currentUser.CustomerId}) // explicitly state each parameter, both this line and line below work tho >:(
        // body: JSON.stringify( credentials )
      });
      // console.log("response: ", response);
  
      const result = await response.json();
      return result;
    } catch (error) {
      // console.log("error in loginUser with creds: ", credentials);
      console.log("error: ", error);
    }
  }
  return (
    <>
      <h1>User Profile</h1>
    </>
  );
}