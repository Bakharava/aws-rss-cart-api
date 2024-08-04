module.exports = function (options, webpack) {
    return {
        ...options,
        entry: ['./src/main.js'],
        externals: [],
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        },
        plugins: [
            ...options.plugins,
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    const lazyImports = [
                        '@nestjs/microservices/microservices-module',
                        '@nestjs/websockets/socket-module',
                    ];
                    // Ignoring non-essential modules for Lambda deployment
                    return lazyImports.includes(resource);
                },
            }),
        ],
    };
};