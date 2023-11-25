import { Roles } from "../Account/Roles";
import CreatePackage from "./CreatePackage";
import Packages from "./Packages";
import SearchPackage from "./SearchPackage";


export default function PackagesPage({ authentication }) {

	return (
		<>
			{authentication.role === Roles[3] && <Packages authentication={authentication} />}
			{
				(authentication.role === Roles[2] || authentication.role == Roles[1]) 
				&& <SearchPackage authentication={authentication} />
			}
			<CreatePackage authentication={authentication} /> 
		</>
	);
}