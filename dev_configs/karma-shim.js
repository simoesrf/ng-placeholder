var appContext = require.context('../src/tests', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);