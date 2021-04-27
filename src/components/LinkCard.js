import React from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../actions";
import { Link } from "react-router-dom";

export default function LinkCard({ link, refreshLinks }) {
  const dispatch = useDispatch();

  const id = link._id,
    name = link.url,
    url = link.url,
    description = link.description,
    archived = link.archived

  const linkObj = {
    id,
    name,
    url,
    description,
    archived
  };

  const archiveLink = async () => {
    link.archived = !link.archived;
    try {
      await fetch("/.netlify/functions/updateLink", {
        method: "PUT",
        body: JSON.stringify(link),
      });
      refreshLinks();
    } catch (error) {
      console.error("Some error happened while archiving", error);
    }
  };

  const deleteLink = async () => {
    const id = link._id;
    try {
      await fetch("/.netlify/functions/deleteLink", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      refreshLinks();
    } catch (error) {
      console.error("Some error happened while deleting", error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header">{link.name}</div>
      <div className="card-body">
        <a href={link.url}>{link.url}</a>
        <p>{link.description}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-warning mr-2" onClick={archiveLink}>
          {link.archived ? "Un-archive" : "Archive"}
        </button>
        <button className="btn btn-danger" onClick={deleteLink}>
          Delete
        </button>
        <Link
          to="/edit"
          className="btn btn-warning ml-2"
          onClick={() => dispatch(setFormData(linkObj))}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
