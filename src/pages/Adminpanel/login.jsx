import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import logo from "../../assets/logo.jpeg";
import '../../Style/Login.css'; // Import custom styles

const Login = () => {
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');
  const navigate = useNavigate();

  const errorNotification = () => {
    toast.warn("UserName OR Password Wrong", {
      autoClose: 2000,
    });
  };

  const emptyNotification = () => {
    toast.warn("Enter userName and password both", {
      autoClose: 2000,
    });
  };

  const login = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      emptyNotification();
      return;
    }

    axios.post("http://localhost:3001/api/user/auth", { userName, password })
    .then(result => {
      sessionStorage.setItem('userName', userName);
      navigate('/BlogPost'); // Redirect to the main app page
    })
    .catch(err => {
      console.error("Login failed:", err.response.data.message || "Server error");
      errorNotification();
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+923176988576';
    const message = encodeURIComponent('Hello, I would like to inquire about...');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100 ">
          {/* Left Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center  p-4">
            <img src={logo} alt="Illustration" className="img-fluid mb-3" style={{ maxWidth: '80%' }} />
            <p className="text-center text-secondary">
            Stay connected with iCell Mobile – your trusted network for seamless SIM, data, and packages, designed for ultimate convenience and speed
            </p>
          </div>

          {/* Right Section */}
          <div className="col-md-6 bg-white p-4  shadow-lg rounded">
            <form onSubmit={login}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="UserName or phone number"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control form-control-lg custom-input"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg custom-input"
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg mb-3 custom-button"
                >
                  Log in
                </button>
              </div>
              <a href="./" className="text-decoration-none text-primary d-block text-center mb-3">
                Home page
              </a>
              <hr className="text-secondary" />
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary btn-lg custom-button"
                  onClick={handleWhatsAppClick}
                >
                  Contact with Anorex
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
