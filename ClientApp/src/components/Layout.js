import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default function Layout(props) {

  return(
    <div>
      <NavMenu setAuthentication={props.setAuthentication} />
      <Container tag="main">
        {props.children}
      </Container>
    </div>
  );
}
