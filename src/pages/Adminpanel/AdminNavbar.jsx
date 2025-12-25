import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../Style/AdminNavbar.css";
import { FaBars } from 'react-icons/fa';
import logo from "../../assets/logo.jpeg";

function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('userName');
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <FaBars size={24} color="black" />
      </label>
      <img src={logo} alt="logo" className="logo" />
      <ul>
        <li>
          <Link to="/blogPost">Post Blog</Link>
        </li>
        <li>
          <Link to="/blogTable">Blogs</Link>
        </li>
        <li className="nav-item">
          <button
            className="btn deletebtn logout-btn"
            onClick={() => setShowModal(true)}
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn deletebtn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;