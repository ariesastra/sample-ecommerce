import React from 'react';
import {Container} from 'react-bootstrap';
import Header from './components/Headers';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    // Fragment (is empty element)
    <>
      <Header/>
      <Container>
      <main className="py-3">
        <HomeScreen/>
      </main>
      </Container>
      <Footer/>
    </>
  )
}

export default App;
