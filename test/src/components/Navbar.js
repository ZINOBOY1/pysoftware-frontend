import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMenuItems } from '../api/Api'; 
const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function loadMenuItems() {
      const items = await fetchMenuItems();
      setMenuItems(items);
    }
    loadMenuItems();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Pysoftware</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {menuItems.map(item => (
              <li key={item.id} className="nav-item">
                <Link className="nav-link" to={`/${item.href}`}>{item.menu_item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
