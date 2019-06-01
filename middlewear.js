//TODO: Extract this logic into a middlewear
const langs = ['fr', 'ar'];

const langMiddlewear = (req, res, next) => {
  if (req.query.lang && !langs.includes(req.query.lang)) {
    return res.status(400).json({
      error: `The language ${
        req.query.lang
      } is not supported, The supported languages are: ${langs.join(',')}`
    });
  } else {
    req.lang = req.query.lang ? req.query.lang : 'fr';
    delete req.query.lang;
    next();
  }
};

module.exports = {
  langMiddlewear
};
