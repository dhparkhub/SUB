
/**
* @description Parsing error messages
* @param {object} err
* @returns {string} Parsed data from error message
*/
exports.getErrorMessage = (err) => {
  if (err.errors){
    for(let errName in  err.errors) {
      if(err.errors[errName].message) return err.errors[errName].message
    }
  }
  return 'Unknown server error'
}
