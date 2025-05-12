import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import DestinationsList from '../features/destinations/DestinationsList';
import DestinationDetail from '../features/destinations/DestinationDetail';
import HousesList from '../features/houses/HousesList';
import Login from '../features/auth/Login';
import SignUp from '../features/auth/SignUp';
import BookingForm from '../features/bookings/BookingForm';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<DestinationsList />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/houses" element={<HousesList />} />
            <Route path="/booking/:destinationId" element={isAuthenticated ? <BookingForm /> : <Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
