/**
 * @typedef {Object} execAsyncReturn
 * @property {error} err
 * @property {Object} data
 */
/**
 * execAsync function to execute async functions
 * @param  {function} fn - any async function
 * @returns {execAsyncReturn}
 */
const execAsync = async fn => new Promise((resolve) => {
  fn()
    .then((data) => {
      resolve({ data });
    })
    .catch((err) => {
      resolve({ err });
    });
});


module.exports = {
  execAsync,
};
