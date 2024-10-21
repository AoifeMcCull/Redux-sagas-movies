const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  res.sendStatus(500)
});

router.get('/:id', (req, res) => {
  //get all genres for specific movie id
  const id = req.params.id
  const query = `
    select genres.name from movies inner join movies_genres on movies.id = movies_genres.movie_id  inner join genres  on movies_genres.genre_id = genres.id where movies.id = ${id}
    `;
    pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all genres for id',id, err);
      res.sendStatus(500)
    })

});


module.exports = router;