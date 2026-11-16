import React from 'react'
import Card from './Card/Card.jsx'
import './Cards.css'

const Cards = ({ movies, loading, error, hasSearched }) => {
  return (
    <main className='cards-container' aria-live='polite'>
      {loading && <p className='cards-message'>Searching movies...</p>}
      {error && <p className='cards-message' role='alert'>{error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p className='cards-message'>
          {hasSearched ? 'No movies found.' : 'Search for a movie to get started.'}
        </p>
      )}
      <div className='cards'>
        {movies.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  )
}

export default Cards
