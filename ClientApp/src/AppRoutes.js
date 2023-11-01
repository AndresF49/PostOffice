import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Account/Login";
import { Register } from "./components/Account/Register";
import { ToDoList } from "./components/ToDoList";
import { SearchPackage } from "./components/Package/SearchPackage";
import Packages from "./components/Package/Packages";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/todolist',
    element: <ToDoList />
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
    path: '/package',
    element: <SearchPackage />
  },
  {
    path: '/packages',
    element: <Packages />
  }
];

export default AppRoutes;
