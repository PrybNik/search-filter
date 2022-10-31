import React from 'react';
import Rating from '@mui/material/Rating';

import { CATEGORIES_TITLES } from '../../constants/categories'
import './MoviesList.css';

const MoviesList = ({ moviesList }) => {

  return (
    <div className="movies-list-container">
      {moviesList.map(movie => {
        return (
          <div key={movie.title} className="movie-container">
            <div className="left">
              {movie.title}
              <Rating readOnly value={movie.rating} max={10} precision={0.1}/>
            </div>
            <div className="right">{CATEGORIES_TITLES[movie.data]}</div>
          </div>
        )
      })}
    </div>
  );
}

export default MoviesList;
