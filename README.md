# BLab Shared modules

## Usage
  1. Codes and Messages
      ```
        const {codes} = require('brightlab-shared');
        // for `xyx` service, 
        // const x = codes.xyzSvcCodes;  // codes.EquipmentSvcCodes
        // x.status // true|false,
        // x.msg // some message
        // x.statusCode // code
      ```
  2. Access Utils
      ```
        const {utils} = require('brightlab-shared')
        const {err, data} = await utils.execAsync(AsyncFunc())
        if (err) {
          return err
          //  or
          return Promise.reject(err)
        }
      ```

  3. Logger
      ```
        const logger = require('brightlab-shared').logger({
            logLevel: 'warn', // default debug
            filename: 'complete path', // default appRoot/log/[time].access.log 
            logRotateDuration: '1d', // 1d = 1 day, 10s = 10sec, 1h = 1 hour 
            json: false, // true or false
          })
      ```