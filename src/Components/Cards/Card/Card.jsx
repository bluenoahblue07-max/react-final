import React from 'react'
import './Card.css'

const Card = ({ movie }) => {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <article className='card-container'>
      {hasPoster ? (
        <img
          className='card-poster'
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          loading='lazy'
        />
      ) : (
        <div className='card-poster card-poster-placeholder'>No poster available</div>
      )}
      <div className='card'>
        <h2 className='card-title'>{movie.Title}</h2>
        <p className='card-subtitle'>{movie.Year} &middot; {movie.Type}</p>
      </div>
    </article>
  )
}

export default Card
