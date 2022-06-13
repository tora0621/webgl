import { isTablet } from './isTablet';
import { isSumaho } from './isSumaho';

/**
 * @description 各デバイス用(PC,タブレット,スマホ)imgタグ レスポンシブイメージ処理
 * (例)<img src="" data-pcimg="./img/pc.jpg" data-tabletimg="./img/tablet.jpg" data-sumahoimg="./img/sumaho.jpg" alt="">
 * data-tabletimgを省略するとdata-pcimgと同じ画像になります。
 * @returns void
 */
export function setResponsiveImg(): void {
  $(window).on('load resize', (e) => {
    $('img[data-pcimg]').each((i, el) => {
      const img: JQuery = $(el);
      const data: JQuery.PlainObject = img.data();
      let srcPath: string = '';

      if (e.type === 'load' && img.attr('src') !== '') console.error('src属性に値を入力しないでください。');
      if (data.pcimg === '' || data.pcimg === undefined) console.error('data-pcimg属性にPC表示用の画像パス設定してください。');
      if (data.tabletimg === '' || data.tabletimg === undefined) data.tabletimg = data.pcimg;
      if (data.sumahoimg === '' || data.sumahoimg === undefined) console.error('data-sumahoimg属性にスマホ表示用の画像パス設定してください。');

      if (isSumaho()) {
        srcPath = data.sumahoimg;
      } else if (isTablet()) {
        srcPath = data.tabletimg;
      } else {
        srcPath = data.pcimg;
      }

      if (srcPath) img.attr({ src: srcPath });
    });
  });
}
