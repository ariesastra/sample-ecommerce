import React from 'react';

// Dependencies
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Component
import Header from './components/Headers';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

// Style

function App() {
  return (
    // Fragment (is empty element)
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
