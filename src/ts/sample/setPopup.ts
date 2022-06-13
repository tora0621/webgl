require('venobox');
require('venobox/venobox/venobox.min.css');

/**
 * @description ポップアップ画像
 */
export function setPopup(): void {
  setPopupImage();
}

/**
 * 通常のポップアップ画像設定
 */
function setPopupImage(): void {
  $('.js-popup').venobox({
    infinigall: true,
    numeratio: true,
    titleattr: 'data-title',
    titlePosition: 'bottom',
    bgcolor: '#000000',
  });
}
