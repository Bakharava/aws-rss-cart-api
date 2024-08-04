module.exports = function (options, webpack) {
    return {
        ...options,
        entry: './src/lambda.js',
        externals: [],
        externalDependencies: [
            "@nestjs/microservices",
            "@nestjs/platform-express",
            "class-transformer",
            "class-validator",
        ],
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        },
        plugins: [
            ...options.plugins,
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    const lazyImports = [
                        '@nestjs/microservices',
                        '@nestjs/platform-express',
                        'cache-manager', 'class-validator', 'class-transformer'];
                    if (!lazyImports.includes(resource)) {
                        return false;
                    }
                    try {
                        require.resolve(resource);
                    } catch (err) {
                        return true;
                    }
                    return false;
                },
            }),
        ],
    };
};

module.exports = function (options, webpack) {
    return {
        ...options,
        entry: ['./src/lambda.js'],
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