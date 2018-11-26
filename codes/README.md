# Brightlab Codes and messages

> Create independent file inside the components folder for each service 

> Then export each service's custom code using `index.js` file.

## Code Structure
  ```
    CODE_1100: {
      statusCode: 1100,
      status: true,
      msg: 'OK',
    },  
  ```

### e.g.
  ```
    // components/xyzService.code.js
    module.exports = {
        CODE_1100: {
        statusCode: 1100,
        status: true,
        msg: 'OK',
      },
      CODE_110X: {
        statusCode: 110X,
        status: true,
        msg: '...',
      }
    }

    // index.js
    const XyzSvcCode = require('./components/xyzService.code');

    // import other code components.

    // now export
    module.exports = {
      XyzSvcCode,
    };

  ```