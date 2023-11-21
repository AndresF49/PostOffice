import { useRouteError } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <Card>
        <CardHeader>Oops!</CardHeader>
        <CardBody>
          <p>Sorry, an unexpected error has occured.</p>
          <p><i>{error.statusText || error.message}</i></p>
        </CardBody>
      </Card>
    </div>
    
  );
}