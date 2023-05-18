import React, { useState, useEffect } from "react";
import axios from "axios";


const User = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const refreshList = () => {
    axios
      .get(process.env.BACKEND_API_URL + "users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };

  const changeUserMail = (e) => {
    setUserMail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const addClick = () => {
    setModalTitle("Add User");
    setUserId(0);
    setUserName("");
    setUserMail("");
    setPassword("");
  };

  const editClick = (dep) => {
    setModalTitle("Edit User");
    setUserId(dep.id);
    setUserName(dep.username);
    setUserMail(dep.email);
    setPassword(dep.password);
  };

  const createClick = () => {
    axios
      .post(process.env.BACKEND_API_URL + "users/", {
        username: userName,
        email: userMail,
        password: password,
      })
      .then((response) => {
        console.log(response.data)
        alert(response.status);
        refreshList();
      })
      .catch((error) => {
        alert("Failed");
      });
  };

  const updateClick = (id) => {
    axios
      .put(process.env.BACKEND_API_URL + "users/" + id, {
        id: userId,
        username: userName,
        email: userMail,
        password: password,
      })
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
        .delete(process.env.BACKEND_API_URL + "users/" + id)
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
        Add User
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>UserId</th>
            <th>UserName</th>
            <th>UserName</th>
            <th>password</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((dep) => (
            <tr key={dep.id}>
              <td>{dep.id}</td>
              <td>{dep.username}</td>
              <td>{dep.email}</td>
              <td>{dep.password}</td>
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
                <span className="input-group-text">UserName</span>
                <input
                  type="text"
                  className="form-control"
                  value={userName}
                  onChange={changeUserName}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">User Mail</span>
                <input
                  type="text"
                  className="form-control"
                  value={userMail}
                  onChange={changeUserMail}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={changePassword}
                />
              </div>

              {userId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => createClick()}
                >
                  Create
                </button>
              ) : null}

              {userId !== 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => updateClick(userId)}
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

export default User;
