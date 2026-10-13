import { verifyToken } from '../utils/jwt.js'

export function authenticate(req, res, next) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'No token provided.' })
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }

  const token = authorization.split(' ')?.[1]

  if (!token) {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }

  const user = verifyToken(token)

  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }

  req.user = user

  next()
}
