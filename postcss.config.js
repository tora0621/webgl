module.exports = {
  'plugins': {
    // 未使用CSSクラス削除
    '@fullhuman/postcss-purgecss': {
      // 分析ファイル指定（html及びts,php内のhtmlを想定）
      content: ['./**/*.html', './src/ts/**/*.ts', './wp/**/*.php'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      // 削除しないcssクラス指定
      safelist: {
        standard: ['tinymce', 'tbody', 'thead'],
        deep: [],
        greedy: [/slick/, /vbox/, /flatpickr/, /data\-aos/, /wp\-editor/],
        keyframes: [],
        variables: [],
      },
      keyframes: true, // 未使用の@keyframesを削除
      variables: true, // 未使用のCSS変数を削除
      fontFace: true, // 未使用の@font-faceを削除
    },
  },
};
