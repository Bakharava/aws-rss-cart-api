module.exports = function (options, webpack) {
    return {
        ...options,
        entry: './src/lambda.js',
        externals: [],
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        },
        plugins: [
            ...options.plugins,
        ],
    };
};