import jwt from 'jsonwebtoken'

/**
 *
 * @param {object} payload
 * @returns {string}
 */
export function signToken(payload) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not configured')
  }

  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  })

  return token
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    })
  } catch {
    return null
  }
}
