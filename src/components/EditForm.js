import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFormData } from "../actions";
import { useHistory } from "react-router";

export default function EditForm({ refreshLinks }) {
  const dispatch = useDispatch();
  let history = useHistory();

  const { setForm } = useSelector((state) => state);
  const linkId = setForm.id;
  const linkName = setForm.name;
  const linkUrl = setForm.url;
  const linkDescription = setForm.description;
  const archived = setForm.archived;

  const [id, setId] = useState(linkId);
  const [name, setName] = useState(linkName);
  const [url, setUrl] = useState(linkUrl);
  const [description, setDescription] = useState(linkDescription);

  const resetForm = () => {
    setId("");
    setName("");
    setDescription("");
    setUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { _id: id, name, url, description, archived };
    try {
      await fetch("/.netlify/functions/updateLink", {
        method: "PUT",
        body: JSON.stringify(body),
      });
      (function resetStoreFunc() {
        dispatch(setFormData({}));
      })();
      refreshLinks();
      resetForm();
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
      <hr />
      <div className="card">
        <div className="card-header">Update Link</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                name="url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
