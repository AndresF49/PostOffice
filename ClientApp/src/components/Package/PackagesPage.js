import { Roles } from "../Account/Roles";
import CreatePackage from "./CreatePackage";
import Packages from "./Packages";
import SearchPackage from "./SearchPackage";


export default function PackagesPage({ authentication }) {

	return (
		<div className="m-3">
			{authentication.role === Roles[3] && 
			<>
				<h2>Here, Customers should be able to view all packages that are linked to their account</h2>
				Essentially, where they are Sender/Receiver. It is commented out right now
				{/* <Packages authentication={authentication} />  */}
			</>}
			{
				(authentication.role === Roles[2] || authentication.role === Roles[1]) 
				&& <SearchPackage authentication={authentication} />
			}
			<CreatePackage authentication={authentication} />
		</div>
	);
}