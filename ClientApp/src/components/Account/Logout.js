import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function Logout({size, setIsAuthenticated, setAuthentication}) {
	const navigate = useNavigate();

	const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('authenticationItems');
		// navigate("/");
		setIsAuthenticated(false);
		setAuthentication(null);
		// window.location.reload(true);
	}
	return(
		<Button className="" color="primary" size={size} onClick={logout}>Logout</Button>
	);
}