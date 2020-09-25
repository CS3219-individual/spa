
import React, { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";

const CustomNavbar = () => {
  // constructor(props) {
  //   super(props);

    // this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.toggleNavbar = this.toggleNavbar.bind(this);

    // this.state = {
    //   dropdownOpen: false,
    //   collapseOpen: false
    // };
  // }
  const [dropdownOpen, toggleDropdown] = useState(false);
  const [collapseOpen, toggleNavBar] = useState(false);

  // toggleDropdown() {
  //   this.setState({
  //     ...this.state,
  //     ...{
  //       dropdownOpen: !this.state.dropdownOpen
  //     }
  //   });
  // }

  // toggleNavbar() {
  //   this.setState({
  //     ...this.state,
  //     ...{
  //       collapseOpen: !this.state.collapseOpen
  //     }
  //   });
  // }

    return (
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="#">CS3219</NavbarBrand>
        <NavbarToggler onClick={() => toggleNavBar(!collapseOpen)} />

        <Collapse open={collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink active href="#">
                Active
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" disabled>
                Disabled
              </NavLink>
            </NavItem>
            <Dropdown
              open={dropdownOpen}
              toggle={() => toggleDropdown(!dropdownOpen)}
            >
              <DropdownToggle nav caret>
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>

          <Nav navbar className="ml-auto">
            <InputGroup size="sm" seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroupText>
              </InputGroupAddon>
              <FormInput className="border-0" placeholder="Search..." />
            </InputGroup>
          </Nav>
        </Collapse>
      </Navbar>
    );
}

export default CustomNavbar