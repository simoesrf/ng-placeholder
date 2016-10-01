Error.stackTraceLimit = Infinity;


var appContext = require.context('./tests', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);