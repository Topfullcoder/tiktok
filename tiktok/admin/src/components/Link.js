import React, { useState, useEffect } from "react";
import axios from "axios";
import { variables } from "../Variables.js";

const Link = () => {
  const [links, setLinks] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [linkId, setLinkId] = useState(0);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");


  const refreshList = () => {
    axios
      .get(variables.API_URL + "links/")
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    refreshList();
  }, []);

  const changeLinkName = (e) => {
    setLinkName(e.target.value);
  };

  const changeLinkUrl = (e) => {
    setLinkUrl(e.target.value);
  };

  const addClick = () => {
    setModalTitle("Add Link");
    setLinkId(0);
    setLinkName("");
    setLinkUrl("");
  };

  const editClick = (dep) => {
    setModalTitle("Edit Link");
    setLinkId(dep.id);
    setLinkName(dep.linkname);
    setLinkUrl(dep.linkurl);
  };

  const createClick = () => {
    axios
      .post(
        variables.API_URL + "links/",
        {
          linkname: linkName,
          linkurl: linkUrl,
        }
      )
      .then((response) => {
        alert(response.status);
        refreshList();
      })
      .catch((error) => {
        alert("Failed");
      });
  };

  const updateClick = (id) => {
    axios
      .put(
        variables.API_URL + "links/" + id,
        {
          linkname: linkName,
          linkurl: linkUrl
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.status);
        refreshList();
      })
      .catch((error) => {
        alert("Failed");
      });
  };

  const deleteClick = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(variables.API_URL + "links/" + id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert(response.status);
          refreshList();
        })
        .catch((error) => {
          alert("Failed");
        });
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Link
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>LinkId</th>
            <th>LinkName</th>
            <th>LinkUrl</th> 
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {links.map((dep) => (
            <tr key={dep.id}>
              <td>{dep.id}</td>
              <td>{dep.linkname}</td>
              <td>{dep.linkurl}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(dep)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(dep.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">LinkName</span>
                <input
                  type="text"
                  className="form-control"
                  value={linkName}
                  onChange={changeLinkName}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">LinkUrl</span>
                <input
                  type="text"
                  className="form-control"
                  value={linkUrl}
                  onChange={changeLinkUrl}
                />
              </div>

              {linkId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => createClick()}
                >
                  Create
                </button>
              ) : null}

              {linkId !== 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => updateClick(linkId)}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
