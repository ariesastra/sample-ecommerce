import React from 'react';
import {Container} from 'react-bootstrap';
import Header from './components/Headers';
import Footer from './components/Footer';

function App() {
  return (
    // Fragment (is empty element)
    <>
      <Header/>
      <Container>
      <main className="py-3">
        <h1>Welcome to Shopyey</h1>
      </main>
      </Container>
      <Footer/>
    </>
  )
}

export default App;
