const langs = ['fr', 'ar'];
const formats = ['string', 'datetime'];

//TODO: Merge those two
const langMiddlewear = (req, res, next) => {
  if (req.query.lang && !langs.includes(req.query.lang)) {
    return res.status(400).json({
      error: `The language ${
        req.query.lang
      } is not supported, The supported languages are: ${langs.join(',')}`
    });
  } else {
    req.lang = req.query.lang ? req.query.lang : langs[0];
    delete req.query.lang;
    next();
  }
};

const formatMiddlewear = (req, res, next) => {
  if (req.query.format && !formats.includes(req.query.format)) {
    return res.status(400).json({
      error: `The time format ${
        req.query.format
      } is not supported, The supported formats are: ${formats.join(',')}`
    });
  } else {
    req.format = req.query.format ? req.query.format : formats[0];
    delete req.query.string;
    next();
  }
};

module.exports = {
  langMiddlewear,
  formatMiddlewear
};
