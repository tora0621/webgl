import * as Sugar from 'sugar';
import flatpickr from 'flatpickr';
const japanese = require('flatpickr/dist/l10n/ja').default.ja; //カレンダー日本語
require('flatpickr/dist/flatpickr.min.css');

/**
 * @description 予約モジュール
 */
export function reservation(): void {
  $.ajax({
    url: '/common/reservation/index.html',
  })
    .done((data) => {
      $('.js-reservation').prepend(data);
      setFlatpickr();
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.error(`予約モジュール読み込みエラー: ${jqXHR.status}, ${textStatus}, ${errorThrown}`, jqXHR.responseText);
    });
}

/**
 * Flatpickrを設定する
 */
function setFlatpickr(): void {
  const sel: string = '.reservation-datePicker';
  const df: string = 'Y-m-d'; // 日付表示形式
  const today = new Sugar.Date().reset(); // 今日
  let min = today.clone().addDays(1).raw; // 翌日から
  let max = today.clone().addYears(1).raw; // 1年後まで

  flatpickr(sel, {
    locale: japanese, //カレンダー日本語
    dateFormat: df, // 日付表示形式
    defaultDate: min, // カレンダー初期日付
    minDate: min, // 選択可能な最小日付
    maxDate: max, // 選択可能な最大日付
    disableMobile: true, // スマホ時にネイティブのカレンダーを利用しない
  });
}
