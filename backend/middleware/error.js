const errorHandler = (err, req, res, next) => {
  console.log('Middleware Error Handling');
  const errStatus = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const errMsg =
    errStatus === 500 ? errorFormatter(err.message) : err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    statusCode: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};
const errorFormatter = (e) => {
  let errors = {};
  //console.log(e);
  const allErrors = e.substring(e.indexOf(':') + 1).trim();
  //console.log(allErrors);
  const allErrorsArray = allErrors.split(',').map((err) => err.trim());
  //console.log(allErrorsArray);
  allErrorsArray.forEach((error) => {
    const errorData = error.split(':').map((err) => err.trim());
    console.log(errorData);
    const [key, value] = errorData;
    if (key && value) {
      if (!key.includes('index') && !value.includes('dup key')) errors[key] = value;
      else {
        var RegExp = /[^0-9a-zA-Z@.]/g;
        errors[`${errorData[2].replace(RegExp, '')} already exists`] = errorData[3].replace(
          RegExp,
          ''
        );
      }
    } else {
      return (errors['undefined error'] = errorData[0]);
    }
  });
  return errors;
};
module.exports = {
  errorHandler
};
