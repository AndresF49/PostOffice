import { useState } from "react";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import { Button } from "reactstrap";



export default function EmployeeAdminPage({ authentication }) {
  
  return (
    <>
      <AddEmployee authentication={authentication} />

      {/* <h1>Edit Employees</h1> */}
      <br></br>
      <EditEmployee />
      <br></br>
    </>
  );
}