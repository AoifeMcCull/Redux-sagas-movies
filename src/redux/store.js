import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield all([
    watchFetchAllMovies(),
    watchFetchOneMovieGenres(),
    watchFetchOneMovieDetails(),
  ]);
}

function* watchFetchAllMovies() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
}

function* watchFetchOneMovieGenres() {
  yield takeEvery('FETCH_ONE_MOVIE_GENRES', function* (action) {
    const {id} = action.payload;
    yield call(fetchOneMovieGenres, id);
  });
}

function* watchFetchOneMovieDetails() {
  yield takeEvery('FETCH_ONE_MOVIE_DETAILS', function* (action) {
    const {id} = action.payload;
    yield call(fetchOneMovieDetails, id);
  });
}

function* fetchAllMovies() {
  try {
    console.log('fetching all movies')
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchOneMovieDetails(id) {
  try {
    const detailsResponse = yield axios.get(`/api/movies/${id}`);
    yield put({
      type:'SET_MOVIES',
      payload:detailsResponse.data
    });
  } catch (err) {
    console.log('error fetching one movie details', err)
  }
}

function* fetchOneMovieGenres(id) {
  try {
    const genresResponse = yield axios.get(`/api/genres/${id}`);
    yield put({
      type:'SET_GENRES',
      payload: genresResponse.data
    });
  } catch (err) {
      console.log('error fetching one movie genres', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
