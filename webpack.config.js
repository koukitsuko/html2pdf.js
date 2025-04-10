const path = require('node:path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('./package.json');

const banner = `${pkg.name} v${pkg.version}
Copyright (c) ${(new Date).getFullYear()} Erik Koopmans
Released under the ${pkg.license} License.`;

module.exports = (env = {}) => {
  const isDev = env.dev;
  const mode = isDev ? 'development' : 'production';
  const watch = !!isDev;
  const useAnalyzer = !!env.analyzer;

  // Base configuration shared between outputs
  const baseConfig = {
    mode,
    watch,
    watchOptions: {
      ignored: /node_modules/,
    },
    target: 'browserslist',
    optimization: {
      minimize: !isDev,
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new webpack.BannerPlugin(banner),
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };

  // CommonJS configuration
  const cjsConfig = {
    ...baseConfig,
    name: 'cjs',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'html2pdf.cjs' : 'html2pdf.min.cjs',
      library: {
        type: 'commonjs2',
        export: 'default'
      },
      globalObject: 'this'
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    plugins: [
      ...baseConfig.plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: useAnalyzer ? 'server' : 'disabled',
        analyzerPort: 'auto',
        defaultSizes: 'stat',
        reportFilename: 'report-cjs.html',
      }),
    ],
  };

  // ESM configuration
  const esmConfig = {
    ...baseConfig,
    name: 'esm',
    entry: './src/esm-wrapper.js',
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'html2pdf.mjs' : 'html2pdf.min.mjs',
      library: {
        type: 'module',
      },
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    plugins: [
      ...baseConfig.plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: useAnalyzer ? 'server' : 'disabled',
        analyzerPort: 'auto',
        defaultSizes: 'stat',
        reportFilename: 'report-esm.html',
      }),
    ],
  };

  // UMD configuration for browsers
  const umdConfig = {
    ...baseConfig,
    name: 'umd',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? 'html2pdf.js' : 'html2pdf.min.js',
      library: {
        name: 'html2pdf',
        type: 'umd',
        export: 'default',
        umdNamedDefine: true,
      },
      globalObject: 'this'
    },
    devtool: isDev ? 'eval-source-map' : 'source-map',
    plugins: [
      ...baseConfig.plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: useAnalyzer ? 'server' : 'disabled',
        analyzerPort: 'auto',
        defaultSizes: 'stat',
        reportFilename: 'report-umd.html',
      }),
    ],
  };

  return [cjsConfig, esmConfig, umdConfig];
};
