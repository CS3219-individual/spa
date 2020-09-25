import React, { useEffect, useState } from "react";
import API from "./apis"

import styles from "./ContactList.module.css";
import ContactTable from "./ContactTable"

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  FormGroup,
  Col,
  Row,
  Form,
  Collapse,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";


export const ContactsContext = React.createContext([]);

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setError] = useState("");

  const onSubmit = () => {
    API.contacts.createContact(formState).then(async res => {
      if (res.errors != null) {
        let messages = Object.values(res.errors).map(obj => obj.message)
        alert(`ERROR HAS OCCURRED: ${messages}`)
        // throw new Error(res.errors[0].message)
      }
      await API.contacts.getContacts().then(res => {
        setContacts(res.data)
      })
    }).catch(err => {
      if (err != undefined) {
        alert(`ERROR HAS OCCURRED: ${err.message}`)
      } else {
        alert("UNKNOWN ERROR HAS OCURRED");
      }
    });
  }

  const [formState, setFormState] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
  });
  const handleChangeValue = (name) => (e) => {
    setFormState(Object.assign({}, formState, { [name]: e.target.value }));
  };
  // https://react-hook-form.com/

  return (
    <div>
      <h1 className={`mb-5 ${styles.primary}`}>Contact List SPA</h1>
      <ContactsContext.Provider value={[contacts, setContacts]}>
        <ContactTable />
      </ContactsContext.Provider>
      <div className='mt-3'>
        <div>
          {/* {ModalForm()} */}
          {/* <Button onClick={() => setOpen(!open)}>Create Contacts</Button> */}
          <Form>
            <Row>
              <FormGroup>
                <Col>
                  <label htmlFor="#name">name</label>
                  <FormInput size="sm" placeholder="name" value={formState.name} onChange={handleChangeValue('name')} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col>
                  <label htmlFor="#gender">gender</label>
                  <FormInput size="sm" placeholder="gender" value={formState.gender} onChange={handleChangeValue('gender')} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col>
                  <label htmlFor="#email">email</label>
                  <FormInput size="sm" placeholder="email" value={formState.email} onChange={handleChangeValue('email')} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col>
                  <label htmlFor="#phone">phone</label>
                  <FormInput size="sm" placeholder="phone" value={formState.phone} onChange={handleChangeValue('phone')} />
                </Col>
              </FormGroup>
              {errorMessage}
            </Row>
            <Button onClick={onSubmit} size="sm">Create Contacts</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactList