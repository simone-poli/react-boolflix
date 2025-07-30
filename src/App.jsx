import { useState } from 'react'
import CountryFlag from 'react-country-flag'



function App() {
  const [movies, setMovies] = useState([])
  const [movieTitle, setMovieTitle] = useState("")


  function searchMovie() {

    const url = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${movieTitle}`
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


  function languageFlags(language) {
    const flags = {
      en: "GB",
      it: "IT",
      fr: "FR",
      es: "ES",
      de: "DE",
    }
    return flags[language] || null;
  }

  return (
    <>
      <header className="bg-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <img src="https://fontmeme.com/permalink/250730/3c20dfd41f94290e511eca21370fea4c.png" alt="" />
          <form onSubmit={handleSubmit}>
            <div className="container d-flex justify-content-center align-items-center">
              <input
                className="p-2"
                type="text"
                placeholder='Search title'
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)} />
              <button className="btn btn-outline-light btn-sm mx-3">Search</button>
            </div>
          </form>
        </div>
      </header>

      <main>
        <div className="container-fluid my-3">
          <div className="card border-0 p-0">
            <div className="row row-cols-1 row-cols-md-4">
              {movies.map((movie) => {
                const countryCode = languageFlags(movie.original_language);
                const vote = Math.ceil(movie.vote_average / 2);

                return (
                  <div className="col" key={movie.id}>
                    <div className="card border-0">
                      <div>
                        <img className=" position-relative object-fit-cover z-1 pt-3" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />
                      </div>
                      <div className="position-absolute top-0 left-50 pt-3">
                        <b>Title</b>: {movie.title || movie.name} <br />
                        <b>Original Title</b>: {movie.original_title || movie.original_name} <br />
                        <b>Language</b>:{' '}
                        {countryCode && (
                          <CountryFlag
                            countryCode={countryCode}
                            svg
                            style={{ width: '1.5em', height: '1.5em', marginRight: '0.3em' }}
                          />
                        )}
                        ({movie.original_language}) <br />
                        <b>Vote</b>:
                        <>
                          <i className={`fas fa-star ${vote >= 1 ? 'text-warning' : 'text-muted'}`}></i>
                          <i className={`fas fa-star ${vote >= 2 ? 'text-warning' : 'text-muted'}`}></i>
                          <i className={`fas fa-star ${vote >= 3 ? 'text-warning' : 'text-muted'}`}></i>
                          <i className={`fas fa-star ${vote >= 4 ? 'text-warning' : 'text-muted'}`}></i>
                          <i className={`fas fa-star ${vote >= 5 ? 'text-warning' : 'text-muted'}`}></i>
                        </>
                        <br />
                        <p className='text-break'> <b>Overview</b>: {movie.overview}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
