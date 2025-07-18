const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve('./dist'),
        filename: 'script/bundle.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true, // 加速编译，只做转译不做类型检查
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
