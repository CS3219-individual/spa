import React, { useEffect, useState, useContext } from "react";
import API from "./apis"

import styles from "./ContactList.module.css";

import ModalForm from "./ModalForm"

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
  ModalHeader
} from "shards-react";
import { ContactsContext } from "./ContactList";
export const ContactContext = React.createContext({});
export const ModalContext = React.createContext(false);

const ContactTable = () => {

  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({ _id: null });
  let [contacts, setContacts] = useContext(ContactsContext)

  useEffect(async () => {
    await API.contacts.getContacts().then(res => {
      setContacts(res.data)
      setIsLoading(false);
    }).catch(err => {
      let msg = err.toString()
      if (msg != undefined) {
        alert("ERROR HAS OCURRED: ", msg);
      } else {
        alert("ERROR HAS OCURRED");
      }
    });

  }, [])

  const handleEditClick = (contact) => {
    setContact(contact);
    setOpenEdit(!openEdit);
  }
  const handleDelete = async (id) => {
    await API.contacts.deleteContact(id).then(async res => {
      // alert(`Contact ${id} deleted successfully`)
      await API.contacts.getContacts().then(res => {
        setContacts(res.data)
      }).catch(err => {
        let msg = err.toString()
        if (msg != undefined) {
          alert("ERROR HAS OCURRED: ", msg);
        } else {
          alert("ERROR HAS OCURRED");
        }
      });

    }).catch(err => {
      let msg = err.toString()
      if (msg != undefined) {
        alert("ERROR HAS OCURRED: ", msg);
      } else {
        alert("ERROR HAS OCURRED");
      }
    });
  }

  // https://l57885k8d9.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts
  // res.data.{name, gender, email, phone}

  if (isLoading) {
    return (<h3 className={styles.loading}> Loading Content...</h3>)

  }

  return (
    <ModalContext.Provider value={[openEdit, setOpenEdit]}>
    <ContactContext.Provider value={[contact, setContact]}>
    <ContactsContext.Provider value={[contacts, setContacts]}>
    <table className={styles.customers}>
      <tbody>
        <tr>
          <th>name</th>
          <th>gender</th>
          <th>email</th>
          <th>phone</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {
          contacts.map((contact, idx) => {
            return (
              <tr>
                <td>{contact.name}</td>
                <td>{contact.gender}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
          <Button size="sm" onClick={() => handleEditClick(contact)}>Edit</Button>
                </td>
                <td>
                  <Button onClick={() => handleDelete(contact._id)}size="sm">Delete</Button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
        <Modal open={openEdit} toggle={() => setOpenEdit(!openEdit)}>
          <ModalHeader>EDIT</ModalHeader>
          <ModalBody>
            <ModalForm />
          </ModalBody>
          </Modal>
    </ContactsContext.Provider>
    </ContactContext.Provider>
    </ModalContext.Provider>
  )

}

export default ContactTable