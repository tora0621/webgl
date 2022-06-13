import WEBPACK from 'webpack';
import PATH from 'path';
import MINI_CSS_EXTRACT_PLUGIN from 'mini-css-extract-plugin'; // CSS別ファイル出力
const KB: number = 1024; // キロバイト

module.exports = (env: any, argv: any): WEBPACK.Configuration => {
  const config: WEBPACK.Configuration = {
    mode: argv.mode,
    target: ['web', 'es5'],
    entry: { main: ['./src/ts/index.ts', './src/scss/style.scss'] },
    output: {
      path: PATH.resolve(__dirname, 'common/'),
      filename: 'js/build.js',
      assetModuleFilename: (pathData) => {
        const filepath = PATH.dirname(pathData.filename ?? '')
          .split('/')
          .slice(1)
          .join('/');
        return `${filepath}/[name][ext][query]`;
      },
    },
    resolve: {
      extensions: ['.ts', '.js'],
      mainFields: ['browser', 'main'],
    },
    performance: {
      maxAssetSize: 500 * KB, // 500KB以上のアセットを警告
      maxEntrypointSize: 1000 * KB, // 出力は1MBまで許可
    },
    module: {
      rules: [
        {
          test: /\.ts$|\.m?js$/,
          use: ['babel-loader'],
          include: [PATH.resolve(__dirname, 'src'), PATH.resolve(__dirname, 'node_modules/js-base64/base64.mjs')],
        },
        {
          test: /\.s[ac]ss$|\.css$/i,
          use: [
            {
              loader: MINI_CSS_EXTRACT_PLUGIN.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: argv.mode === 'development',
              },
            },
            {
              loader: 'postcss-loader', // PurgeCSSに利用
            },
            {
              loader: 'resolve-url-loader', // url()の相対パス参照の解決
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'), // Dart Sass使用
                sourceMap: true, // resolve-url-loaderに必須
                sassOptions: {
                  outputStyle: argv.mode === 'production' ? 'compressed' : 'expanded', // CSSミニファイ化出力
                  charset: false, // @charsetを出力しない
                },
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg|png|jpe?g|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 5 * KB, // 5KBまで
            },
          },
          generator: {
            emit: false, // ファイル生成無効
          },
        },
      ],
    },
    plugins: [
      new MINI_CSS_EXTRACT_PLUGIN({ filename: 'css/style.css' }), // CSS別ファイル出力先
      new WEBPACK.ProvidePlugin({
        // jQuery読み込み
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
  };
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }
  return config;
};
