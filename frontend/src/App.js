import React from 'react';

// Dependencies
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Component
import Header from './components/Headers';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

// Style

function App() {
  return (
    // Fragment (is empty element)
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
