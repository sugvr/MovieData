import React, { useState } from 'react'
import axios from 'axios';
import './App.css';

import Camera from './Photos/camera.png'
import Arnold from './Photos/Arnold.png'
import monkey from './Photos/monkey.png'
import wonder from './Photos/wonder.png'
import coraje from './Photos/coraje.png'
import harry from './Photos/harry.png'

function App() {
  const [movie, setMovie] = useState([])
  const [name, setName] = useState('')


  function onNameChange(e) { //read the label in the html
    setName(e.target.value)
  };

  function handleSubmit(e) { //read the data
    e.preventDefault();
    axios({
      "method": "GET",
      "url": "https://movie-database-imdb-alternative.p.rapidapi.com/",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "00b4989841msh6f66d81551f861cp141a21jsn826d038ef1fe",
        "useQueryString": true
      }, "params": {
        "page": "1",
        "r": "json",
        "s": `${name}`
      }
    })
      .then((response) => {
        setMovie(response.data.Search)
        console.log(response.data)
        window.location.href = '#data'
      })
      .catch((error) => {
        console.log(error)
      })

  }

  let renderBody;
  if (movie) {
    renderBody = movie.map(movie => {
      return <div class="advisor_thumb">
      <img src={movie.Poster} className="photo" alt="Foto de pelicula" />
      <div class="single_advisor_details_info">
        <h4>{movie.Title}</h4>
        <p class="designation">{movie.Year}</p>
        <p class="designation">{movie.Type}</p>
      </div>
    </div>
    });
  } else {
    renderBody = "No se encuentra ningun resultado";
  }



  // const renderBody = () => {
  //   return movie.map(({ Title, Year, Type, Poster }) => {
  //     return (
  //       <>
  //         <div class="advisor_thumb">
  //           <img src={Poster} className="photo" alt="Foto de pelicula" />
  //           <div class="single_advisor_details_info">
  //             <h4>{Title}</h4>
  //             <p class="designation">{Year}</p>
  //             <p class="designation">{Type}</p>
  //           </div>
  //         </div>
  //       </>
  //     )
  //   })
  // }

  return (
    <>
      <div className="Title">
        <div>
          <h1>Movie Data</h1>
        </div>


        <div className="App">
          <div>
            <form className="form" onSubmit={handleSubmit}>
              <h3>Nombre de pelicula: </h3>
              <input type="text" className="browser-default custom-select" onChange={onNameChange} />
              <button class="btn btn-one" disabled={name.length<1} type="submit"><span>Buscar</span></button>
            </form>
          </div>

          <div>
            <img className="camera" src={Camera} alt="rollo de camara" />
          </div>
        </div>


        <div>
          <img className="clip" src={Arnold} atl="foto de personaje" />
          <img className="clip" src={monkey} atl="foto de personaje" />
          <img className="clip" src={wonder} atl="foto de personaje" />
          <img className="clip" src={coraje} atl="foto de personaje" />
          <img className="clip" src={harry} atl="foto de personaje" />
        </div>

      </div>



      <div class="container" id="data">

        <div class="single_advisor_profile wow fadeInUp">
          {renderBody}

        </div>

      </div>


    </>
  );
}


export default App;