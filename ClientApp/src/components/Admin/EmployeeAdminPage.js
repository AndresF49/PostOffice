import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";



export default function EmployeeAdminPage({ authentication }) {

  return (
    <>
      {/* <h1>Add employee</h1> */}
      <AddEmployee authentication={authentication} />

      {/* <h1>Edit Employees</h1> */}
      <br></br>
      <EditEmployee />
    </>
  );
}