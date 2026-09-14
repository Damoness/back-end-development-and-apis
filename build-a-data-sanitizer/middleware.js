// Strip HTML tags helper function
function stripHtmlTags(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
}


/**
 * Handles requests that do not match any defined route.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
export function inputCleaner(req,res,next){
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }

  if (req.body.comment) {
    req.body.comment = stripHtmlTags(req.body.comment);
  }

  next();
}

/**
 * Handles requests that do not match any defined route.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
export function inputValidator(req,res,next){
  if (req.body.username && req.body.username.length >= 3) {
    return next();
  }
  // Redirect and do NOT call next()
  return res.redirect('/form?error=Username must be at least 3 characters.');
}