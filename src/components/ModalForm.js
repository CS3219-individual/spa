import API from "./apis"
import React, { useEffect, useState, useContext } from "react";
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
  Col,
  Row,
  Form,
  Collapse,
  Modal,
  ModalBody,
  FormGroup,
  ModalHeader
} from "shards-react";


import { ContactsContext } from "./ContactList"
import { ContactContext, ModalContext } from "./ContactTable"

const ModalForm = () => {
  const [openEdit, setOpenEdit] = useContext(ModalContext);
  const [contact, setContact] = useContext(ContactContext);
  let contactId = contact._id
  const [contacts, setContacts] = useContext(ContactsContext);
  const [formState, setFormState] = useState({
    id: contactId,
    name: contact.name,
    gender: contact.gender,
    email: contact.email,
    phone: contact.phone,
  });
  const onSubmit = () => {
    setOpenEdit(!openEdit)

    API.contacts.editContact(formState).then(async res => {
      if (res.errors != null) {
        let messages = Object.values(res.errors).map(obj => obj.message)
        alert(`ERROR HAS OCCURRED: ${messages}`)
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

  const handleChangeValue = (name) => (e) => {
    setFormState(Object.assign({}, formState, { [name]: e.target.value }));
  };

  return (
    <div>
      <Form >
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

        </Row>
        <Row>

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

        </Row>
          <Button onClick={onSubmit} size="sm">Submit</Button>
      </Form>

    </div>
  )
}

export default ModalForm