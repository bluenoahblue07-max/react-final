import { useEffect, useMemo, useState } from 'react'
import Nav from './Components/Nav/Nav.jsx'
import Cards from './Components/Cards/Cards.jsx'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('title-asc')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = () => {
    const query = searchValue.trim()
    if (!query) {
      setSearchQuery('')
      setMovies([])
      setError('')
      setLoading(false)
      return
    }

    setSearchQuery(query)
  }

  useEffect(() => {
    if (!searchQuery) {
      return undefined
    }

    const controller = new AbortController()

    const fetchMovies = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          s: searchQuery,
          type: 'movie'
        })
        const response = await fetch(`/api/omdb?${params}`, {
          signal: controller.signal
        })
        const data = await response.json()

        if (!response.ok) {
          const detail = data.Error ? `: ${data.Error}` : ''
          throw new Error(
            `OMDb returned HTTP ${response.status}${detail}. Check that your API key is valid and activated.`
          )
        }

        if (data.Response === 'False') {
          if (data.Error === 'Movie not found!') {
            setMovies([])
            setError('No movies found.')
            return
          }
          throw new Error(data.Error || 'Movie search failed.')
        }

        setMovies(Array.isArray(data.Search) ? data.Search : [])
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setMovies([])
          setError(fetchError.message || 'Movie search failed.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchMovies()
    return () => controller.abort()
  }, [searchQuery])

  const sortedMovies = useMemo(() => {
    const getYear = (movie) => Number.parseInt(movie.Year, 10) || 0
    const compare = {
      'title-asc': (a, b) => a.Title.localeCompare(b.Title),
      'title-desc': (a, b) => b.Title.localeCompare(a.Title),
      'year-desc': (a, b) => getYear(b) - getYear(a),
      'year-asc': (a, b) => getYear(a) - getYear(b)
    }[sortBy]

    return [...movies].sort(compare)
  }, [movies, sortBy])

  return (
    <>
      <Nav
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <Cards
        movies={sortedMovies}
        loading={loading}
        error={error}
        hasSearched={Boolean(searchQuery)}
      />
    </>
  )
}

export default App

