import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function Logout({size, setIsAuthenticated}) {
	const navigate = useNavigate();

	const logout = () => {
		sessionStorage.removeItem('token');
		// navigate("/");
		setIsAuthenticated(false);
		// window.location.reload(true);
	}
	return(
		<Button className="" color="primary" size={size} onClick={logout}>Logout</Button>
	);
}