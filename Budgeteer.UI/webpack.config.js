const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env, argv) {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    return {
        stats: 'errors-warnings',
        bail: true,
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isEnvProduction
                ? '[name].[contenthash:8].js'
                : '[name].bundle.js',
            chunkFilename: isEnvProduction
                ? '[name].[contenthash:8].chunk.js'
                : '[name].chunk.js',
        },
        mode: isEnvProduction
            ? 'production'
            : isEnvDevelopment && 'development',
        devtool: isEnvProduction
            ? 'hidden-source-map'
            : isEnvDevelopment && 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|bmp|webp)$/,
                    type: 'asset/inline',
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
                favicon: './src/asset/inline/icons/favicon.ico',
            }),
            new ModuleNotFoundPlugin(path.resolve(__dirname, '.')),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env),
            }),
            new CopyWebpackPlugin({
                patterns: [{ from: 'src/asset', to: 'asset' }],
            }),
        ],
        devServer: {
            static: path.join(__dirname, './src'),
            port: 3000,
            hot: true,
            compress: true,
            open: true,
            historyApiFallback: true,
        },
    };
};
