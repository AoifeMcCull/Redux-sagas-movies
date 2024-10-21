import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

import './MovieList.css';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const history = useHistory()
  const handlePosterClick = (id) => {
    console.log('routing to details for', id)
    history.push(`/details/${id}`);
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          console.log(movie)
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img data-testid = 'toDetails'
                src={movie.poster} 
                alt={movie.title} 
                onClick={() => handlePosterClick(movie.id)} 
                style={{ cursor: 'pointer' }}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
