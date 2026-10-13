import express from 'express'
import { findByUsername } from '../utils/db.js'
import { signToken } from '../utils/jwt.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req?.body || {}

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'username or password can not be null' })
  }

  const user = findByUsername(username)
  if (!user) {
    return res.status(401).json({ error: 'username does not exist' })
  }

  if (user._password !== password) {
    return res.status(401).json({ error: 'The password is wrong' })
  }

  const token = signToken({
    id: user.id,
    username,
    password,
    role: user.role
  })

  return res.status(200).json({ token })
})

export default router
