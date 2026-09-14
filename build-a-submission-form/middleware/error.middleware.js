


/**
 * Handles requests that do not match any defined route.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
export function notFoundHandler(req,res,next){
  const error = new Error(req.originalUrl)
  error.status = 404

  return next(error)
}

/**
 * Handles application errors and returns a JSON response.
 * @param {Error & { status?: number }} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
export function finalErrorHandler(err,req,res,next){
  // 2) 从 err.status 获取状态，没有则 500
  const status = err.status || 500;

  // 4) 判断 message
  let message;
  if (status === 500) {
    message = 'Internal Server Error (Check Server Logs)';
  } else {
    message = err.message;
  }

  // 3) 返回 JSON: error, status, message
  res.status(status).json({
    error: true,
    status: status,
    message: message
  });
}