const withLess = require('@zeit/next-less')

module.exports = (phase, { defaultConfig }) => {
    console.log('phase', phase);
    console.log('defaultConfig', defaultConfig);
    return withLess({
        lessLoaderOptions: {
            javascriptEnabled: true //开启内联JavaScript
        }
    });
}
