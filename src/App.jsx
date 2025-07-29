import { useState } from 'react'




function App() {
  const [movies, setMovies] = useState([])
  const [movieTitle, setMovieTitle] = useState("")


  function searchMovie() {
   
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${movieTitle}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results)
      })
  }



  function handleSubmit(e) {
    e.preventDefault()
    searchMovie()
  }

  return (
    <>
      <header>
        <div className="container text-center">
          <h1>Boolflix</h1>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="container mt-4 d-flex">
            <input
              className="form-control"
              type="text"
              placeholder='Serch title'
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)} />
            <button className="btn btn-primary mx-3">Search</button>
          </div>
        </form>


        <div className="container">
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                Title:{movie.title}
                OriginalTitle:{movie.original_title}
                Languange:{movie.original_language}
                Vote:{movie.vote_count}
                </li>
              
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
