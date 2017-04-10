const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");
const path = require("path");
const paths = require("../path.json");

const settings = require("../common/webpack.js")(paths.src, paths.build, undefined, undefined, undefined);

settings.webpack.cache = true;
settings.webpack.devtool = "source-map";
settings.webpack.entry = {
    app: [settings.paths.app]
};


settings.webpack.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,

    // display only errors to reduce the amount of output
    // stats: "errors-only",

    // parse host and port from env so this is easy
    // to customize
    // host: process.env.HOST,
    host: "0.0.0.0",
    port: process.env.PORT || 8080
};


settings.webpack.plugins.push(new webpack.HotModuleReplacementPlugin());

/* Use production parameter for hiding warnings which are coming from React library. */
/* webPackConfig.plugins.push(new webpack.DefinePlugin({
 "process.env": {
 NODE_ENV: JSON.stringify("production")
 }
 }));
 */

settings.webpack.plugins.push(new CopyWebpackPlugin([
    {
        from: path.join("..", paths.assets)
    }
]));

settings.webpack.plugins.push(new CachePlugin({}));

module.exports = settings.webpack;
