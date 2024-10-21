import react, {useEffect} from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
//show movie title, poster, description, and all genres
function MovieDetails() {
    const id = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)
    const oneMovie = useSelector(store => store.oneMovie)
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

    const backToList = () => {
        dispatch({
            type:'SET_ONE_MOVIE',
            payload: {}
        })
        history.push('/')
    }

    return(
        <div data-testid = 'movieDetails'>
            <section className= 'detailsList'>
                <div key={oneMovie.id}>
                    <p className='movieTitle'>{oneMovie.title}</p>
                    <img className='moviePoster' src={oneMovie.poster}></img>
                    <p className='movieDescription'>{oneMovie.description}</p>
                </div>
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
            <button data-testid='toList'
            onClick={backToList}
            >
                Back
            </button>
        </div>
    )
        
}

export default MovieDetails