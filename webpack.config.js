const path = require('path');

const threadLoader = {
    loader: 'thread-loader',
    options: {
        workers: 4,
        // additional node.js arguments
        workerNodeArgs: ['--max-old-space-size=4096'],
        workerParallelJobs: 3,
    },
};

const entrypoint_chunks = [
    'entrypoint',
    ...[...Array(7).keys()].map((i) => `entrypoint_${i+2}`)
];

module.exports = {
    mode: 'production',
    profile: true,
    entry: {
        ...entrypoint_chunks.reduce((memo, chunk) => {
            memo[chunk] = {
                import: `./src/${chunk}.js`,
            }
            return memo;
        }, {}),
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve('./build'),
        pathinfo: false,
        globalObject: 'this',
        chunkFilename: '[name].[contenthash].js',
        hashFunction: 'xxhash64',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    'node_modules/',
                    'build/',
                ].map(p => path.resolve(p)),
                use: [
                    threadLoader,
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: [
                    'build/',
                ].map(p => path.resolve(p)),
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.css'],
        modules: ['node_modules'],
    },
    resolveLoader: {
        modules: [path.resolve('node_modules')],
    },
    bail: true,
    devtool: 'source-map',
    optimization: { moduleIds: 'deterministic' },
};
