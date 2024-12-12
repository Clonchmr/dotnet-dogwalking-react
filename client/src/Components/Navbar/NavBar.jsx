import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

export const NavBar = () => {
  return (
    <div className="App">
      <>
        <Navbar color="light" expand="md">
          <Nav navbar>
            <NavbarBrand href="/">🐕‍🦺 🐩 DeShawn's Dog Walking</NavbarBrand>
            <NavItem>
              <NavLink href="/walkers">Walkers</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </>
    </div>
  );
};
