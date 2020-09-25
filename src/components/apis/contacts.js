import base from './base';

const contactsAPI = {
  getContacts: () => {
    return base.getData(`/api/contacts/`);
  },

  createContact: (contact) => {
    return base.postData('/api/contacts/', contact)
  },

  editContact: (contact) => {
    return base.putData(`/api/contacts/${contact.id}`, contact)
  },

  deleteContact: (contactId) => {
    return base.delete(`/api/contacts/${contactId}`)
  }
}

export default contactsAPI;