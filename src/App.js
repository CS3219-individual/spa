import React from 'react';
import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import CustomNavbar from "./components/Navbar"
import ContactList from "./components/ContactList"

import { Container } from "shards-react";

function App() {
  return (
    <div>
      <CustomNavbar/>
      <Container className="mt-5" >
        <ContactList/>
      </Container>
    </div>
  );
}

export default App;
