import express from 'express'
import {
  getWatchlist,
  findById,
  addMovie,
  updateMovie,
  deleteMovie
} from '../utils/db.js'
import { authorizeModification } from '../middleware/authorize.js'

const router = express.Router()

router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)

  console.log('userId:', userId)

  const list = getWatchlist(userId)

  if (!list) {
    return res.status(500).json({ error: 'no watchlist' })
  }

  return res.status(200).json(list)
})

router.post('/:userId/movies', authorizeModification, (req, res) => {
  const userId = parseInt(req.params.userId)
  const { title, genre } = req.body

  if (!title || !genre) {
    return res.status(500).json({ error: 'title or genre is null' })
  }

  if (!findById(userId)) {
    return res.status(500).json({ error: "The user doesn't exist" })
  }

  const movie = addMovie(userId, { title, genre })
  if (movie) {
    return res.status(201).json({ movie })
  }
})

router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const userId = parseInt(req.params.userId)
  const movieId = parseInt(req.params.movieId)
  const { title, genre, watched } = req.body

  if (!findById(userId)) {
    return res.status(500).json({ error: "The user doesn't exist" })
  }

  const movie = updateMovie(userId, movieId, { title, genre, watched })
  if (movie) {
    return res.status(200).json({ movie })
  }
})

router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const userId = parseInt(req.params.userId)
  const movieId = parseInt(req.params.movieId)

  const r = deleteMovie(userId, movieId)
  if (r) {
    return res.status(200).json({ message: `${movieId} deleted` })
  }
})

export default router
