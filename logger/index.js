const appRoot = require('app-root-path');
const winston = require('winston');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// Logger default path
const logDirectory = path.join(appRoot.path, 'log');

function ensureLogPath(_path = logDirectory) {
  // check log directory exists else create
  if (!fs.existsSync(_path)) {
    try {
      fs.mkdirSync(_path);
    } catch (e) {
      throw e;
    }
  }
}

// Access log
// create a rotating write stream
function getRotatableStream({
  compress = undefined, interval = '1d', maxFiles = 10, _logDirectory = logDirectory,
} = {}) {
  return rfs('access.log', {
    path: _logDirectory,
    interval,
    compress,
    maxFiles,
  });
}


/**
 * @param  {Object} [options]
 * @param  {String} [options.filename] - filename, complete path
 * @param  {String} [options.logLevel] - logLevel, `info`, `warn`, `debug`...
 * @param  {String} [options.logRotateDuration] - logRotateDuration,
 *        eg  `1d` => 1 day,
 *            `1m` => 1 min,
 *            `1h` => 1 hour,
 *            `5s` => 5 sec, '
 * @param  {Boolean} [options.json] - json, eg 'true | false'
 */
const LoggerConst = ({
  logLevel, filename, logRotateDuration, json,
} = {}) => {
  // ensure log path
  ensureLogPath(filename);

  // instantiate a new Winston Logger with the settings defined above
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Stream({
        stream: getRotatableStream({
          compress: 'gzip',
          interval: logRotateDuration,
          logDirectory: filename || logDirectory,
          maxFiles: 10,
          json,
        }),
        handleExceptions: true,
        level: logLevel || 'debug',
      }),
    ],
    // do not exit on handled exceptions
    exitOnError: false,
  });

  // Add logs into the console, if the environment is !production
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      level: logLevel || 'debug',
      handleExceptions: true,
      json: json || false,
      colorize: true,
    }));
  }


  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: (message, encoding) => {
    /* use the 'info' log level so the output will be picked
    up by both transports (file and console)
    */
      logger.info(message);
      logger.info(encoding);
    },
  };
  return logger;
};

module.exports = LoggerConst;
