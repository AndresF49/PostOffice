import { Button } from "reactstrap";

export default function Logout({size, setAuthentication}) {

	const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('authenticationItems');

		setAuthentication(null);
	}
	return(
		<Button color="primary" size={size} onClick={logout}>Logout</Button>
	);
}