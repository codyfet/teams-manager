const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssestsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

/**
 * Возвращает optimization конфиг в зависимости от режима сборки.
 */
const getOptimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssestsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return config;
};

/**
 * Возвращает конфиг для обработки js|jsx файлов в зависимости от режима сборки.
 */
const getJsLoaders = () => {
    const loaders = [{
        loader: "babel-loader"
    }];

    if (isDev) {
        loaders.push("eslint-loader");
    }

    return loaders;
};

/**
 * Возвращает конфиг для обработки css файлов.
 * Также позволяет расиширить его для обработки less или других форматов.
 *
 * @param {string[]} extraLoaders Массив дополнительных лоадеров (например для обработки less).
 */
const getCssLoaders = (extraLoaders) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                plugins: () => [require("autoprefixer")],
            }
        }
    ];

    if (extraLoaders) {
        loaders.push(extraLoaders);
    }

    return loaders;
};

/**
 * Возвращает имя файла с хэшем, либо без - в зависимости от режима сборки.
 *
 * @param {string} extension Расщирение.
 */
const getDistFilename = (extension) => {
    return isDev ? `[name].${extension}` : `[name].[hash].${extension}`;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: ["@babel/polyfill", "./index.js"],
    output: {
        filename: getDistFilename("js"),
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 4210,
        hot: isDev,
        historyApiFallback: true,
        proxy: {
            "/api/**": {
                target: "http://localhost:3000",
                secure: false
            }
        }
    },
    devtool: isDev ? "source-map" : "",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: getJsLoaders()
            },
            {
                test: /\.css$/,
                use: getCssLoaders()
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: "url-loader",
            },
            { // Load other files, images etc
                test: /\.(png|j?g|gif|ico)?$/,
                use: "url-loader",
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css", ".less", ".png"],
        alias: {
            "../../theme.config$": path.join(
                __dirname,
                "my-custom-semantic-theme/theme.config",
            ),
        },
    },
    optimization: getOptimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            },
            favicon: "./Assets/acc_favicon.ico"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash].css",
        })
    ]
};