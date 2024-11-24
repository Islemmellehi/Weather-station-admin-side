import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you're importing Link correctly
import '../Sidebar/Sidebar.css';

function MySidebar() {
  return (
    <div className="side-b">
      <aside className="sidebar">
        <div className="sidebar-header">

          <h2><Link to="/" className="sidebar-link-h">Admin Dashboard</Link></h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin/users" className="sidebar-link">
                <i className="fas fa-users"></i> User Management
              </Link>
            </li>
            <li>
              <Link to="/admin/weather-station" className="sidebar-link">
                <i className="fas fa-cloud-sun"></i> Weather Station Management
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default MySidebar;
