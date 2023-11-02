import { Home } from "./components/Home";
import { Login } from "./components/Account/Login";
import { Register } from "./components/Account/Register";
import SearchPackage from "./components/Package/SearchPackage";
import Packages from "./components/Package/Packages";
import EmployeePage from "./components/Employee/EmployeePage";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/searchpackage',
    element: <SearchPackage />
  },
  {
    path: '/packages',
    element: <Packages />
  },
  {
    path: '/employee',
    element: <EmployeePage />
  }
];

export default AppRoutes;
