import Home from "./components/Home";
import SearchPackage from "./components/Package/SearchPackage";
import Packages from "./components/Package/Packages";
import EmployeePage from "./components/Employee/EmployeePage";
import ErrorPage from "./components/ErrorPage";
import { Navigate } from "react-router-dom";


const AppRoutes = [
  {
    index: true,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/searchpackage',
    element: <SearchPackage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/packages',
    element: <Packages />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/employee',
    element: <EmployeePage />,
    errorElement: <ErrorPage />,
  },
  {                      
    path: "*",
    element: <Navigate to="/" />,
  },
                    
];

export default AppRoutes;
