// require('app-module-path').addPath(__dirname);

const log = require('./util/log')

// exports demo
const baseModule = require('base-module');
log(baseModule.getChineseDateString());

// // module.exports demo
// const getChineseDateString = require('base-module');
// log(getChineseDateString());

// // extend module search path
// log(module.paths)

// // default extensions
// log(require.extensions)

// // require cache
// log(require.cache)