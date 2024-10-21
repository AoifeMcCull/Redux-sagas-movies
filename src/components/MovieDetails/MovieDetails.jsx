import react, {useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
//show movie title, poster, description, and all genres
function MovieDetails() {
    const id = useParams();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres)
    const movies = useSelector(store => store.movies)
    useEffect(() => {
        dispatch({ 
            type: 'FETCH_ONE_MOVIE_GENRES',
            payload: id
        });
        dispatch({
            type:'FETCH_ONE_MOVIE_DETAILS',
            payload: id
        })
      }, []);

    return(
        <div>
            <section className= 'detailsList'>
                {movies.map(movie => {
                    return(
                        <div key={movie.id}>
                            <p className='movieTitle'>{movie.title}</p>
                            <img className='moviePoster' src={movie.poster}></img>
                            <p className='movieDescription'>{movie.description}</p>
                        </div>
                    
                )
                })}
            </section>
            <section className='genresList'>
                <h2>Genres</h2>
                {genres.map(genre => {
                    return(
                    <div key={genre.name}>
                    <p>{genre.name}</p>
                    </div>
                    )
                })}
            </section>
        </div>
    )
        
}

export default MovieDetails