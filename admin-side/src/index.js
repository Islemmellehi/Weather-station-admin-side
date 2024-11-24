import React from "react";
import ReactDOM from "react-dom/client"; // Use ReactDOM.createRoot for React 18
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home.js";
import UserManager from "./Pages/UsersManager/UserManager.js";

const root = ReactDOM.createRoot(document.getElementById("root")); // Initialize root
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> {/* Default Home page */}
      </Route>
      <Route path="/admin/users" element={<UserManager />} />
    </Routes>
  </Router>
);
