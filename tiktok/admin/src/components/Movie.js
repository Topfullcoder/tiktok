import React, { useEffect, useState } from "react";
import axios from "axios";


const Movie = () => {
  const [movieId, setMovieId] = useState(0);
  const [movieName, setMovieName] = useState("");
  const [movieType, setMovieType] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieFileName, setMovieFileName] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const refreshList = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_API_URL + "movie-list-datetime/")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const changeMovieName = (e) => {
    setMovieName(e.target.value);
  };

  const changeMovieType = (e) => {
    setMovieType(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeTags = (e) => {
    setTags(e.target.value);
  };

  const changeSocialLink = (e) => {
    setSocialLink(e.target.value);
  };

  const addClick = () => {
    setModalTitle("Add Movie");
    setMovieId(0);
    setMovieName("");
    setMovieType("");
    setDescription("");
    setTags([]);
    setMovieFileName("");
    setSocialLink("");
  };
  const editClick = (emp) => {
    setModalTitle("Edit Movie");
    setMovieId(emp.id);
    setMovieName(emp.movietitle);
    setMovieType(emp.movietype);
    setDescription(emp.description);
    setTags(emp.tags);
    setMovieFileName(emp.moviesrc);
    setSocialLink(emp.socialink);
  };

  const createClick = () => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_API_URL + "movies/",
        {
          movietitle: movieName,
          movietype: movieType,
          description: description,
          tags: tags,
          moviesrc: movieFileName,
          socialink: socialLink,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response)
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
        process.env.REACT_APP_BACKEND_API_URL + "movies/" + id,
        {
          id: movieId,
          movietitle: movieName,
          movietype: movieType,
          description: description,
          tags: tags,
          moviesrc: movieFileName,
          socialink: socialLink,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert(response.data);
        refreshList();
      })
      .catch((error) => {
        alert("Failed");
      });
  };

  const deleteClick = (id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(process.env.REACT_APP_BACKEND_API_URL + "movies/" + id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert(response.data);
          refreshList();
        })
        .catch((error) => {
          alert("Failed");
        });
    }
  };

  const movieUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    axios
      .post(process.env.REACT_APP_BACKEND_API_URL + "movies/", formData)
      .then((response) => {
        const data = response.data;
        setMovieFileName(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Movie
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>MovieId</th>
            <th>MovieName</th>
            <th>MovieType</th>
            <th>Description</th>
            <th>Tags</th>
            <th>HeartNumbers</th>
            <th>Movie Source</th>
            <th>Social Link</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.movietitle}</td>
              <td>{emp.movietype}</td>
              <td>{emp.description}</td>
              <td>
                {emp.tags.map((tag) => (
                  <div>{tag}</div>
                ))}
              </td>
              <td>{emp.hearts}</td>
              <td>{emp.moviesrc}</td>
              <td>{emp.socialink}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(emp)}
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
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0
                      0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(emp.MovieId)}
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

            <div className="modal-body d-flex flex-row">
              <div className="d-flex w-100 flex-column bd-highlight mb-3">
                <div className="p-2 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Movie Name</span>
                    <input
                      type="text"
                      className="form-control"
                      value={movieName}
                      onChange={changeMovieName}
                    />
                  </div>
                </div>

                <div className="p-2 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Movie Type</span>
                    <input
                      type="text"
                      className="form-control"
                      value={movieType}
                      onChange={changeMovieType}
                    />
                  </div>
                </div>

                <div className="p-2 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Description</span>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={changeDescription}
                    />
                  </div>
                </div>

                <div className="p-2 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">T a g s</span>
                    <input
                      type="text"
                      className="form-control"
                      value={tags}
                      onChange={changeTags}
                    />
                  </div>
                </div>

                <div className="p-2 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Social Link</span>
                    <input
                      type="text"
                      className="form-control"
                      value={socialLink}
                      onChange={changeSocialLink}
                    />
                  </div>
                </div>
                <div className="p-2  bd-highlight">
                <input className="m-2" type="file" onChange={movieUpload} />
              </div>

              {movieId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}

              {movieId !== 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={updateClick(movieId)}
                >
                  Update
                </button>
              ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
