import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { UserContextProvider } from './contexts/user';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';

function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
