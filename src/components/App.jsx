import React, { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';


const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const normalizedFind = newContact.name.toLowerCase();
    const findName = contacts.find(contact => contact.name.toLowerCase() === normalizedFind);
    if (findName) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const getContacts = () => {
    const normalizedFind = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFind)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const visibleContacts = getContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
