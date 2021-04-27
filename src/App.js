import React, { useEffect, useState } from "react";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";
import EditForm from './components/EditForm'
import { Route, BrowserRouter as Router } from "react-router-dom";

// Grab all the links
// display all the links
// implement delete and archive functionality
function App() {
  const [links, setLinks] = useState([]);
  const loadLinks = async () => {
    try {
      const res = await fetch("/.netlify/functions/getLinks");
      const links = await res.json();
      setLinks(links);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">List O' Link</h1>
      <Router>
        <Route path="/" exact component={() => (<LinkForm refreshLinks={loadLinks} />)} />
        <Route path="/" exact component={() => (<LinkList links={links} refreshLinks={loadLinks} />)} />
        <Route path="/edit" exact component={() => (<EditForm refreshLinks={loadLinks} />)} />
      </Router>
    </div>
  );
}

export default App;
