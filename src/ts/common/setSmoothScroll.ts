/**
 * スムーススクロールを設定
 * @description aタグにhref属性の値が#前方一致で該当コンテンツにスクロール移動 href属性が、#のみ又は、値なしの場合は画面一番上にスクロール移動
 */
export function setSmoothScroll(): void {
  setPageScroll();
  openPageScroll();
}

// 開いたページでページ内スクロールを実行する
function openPageScroll(): void {
  const hash: string = location.hash;
  if (hash !== '') {
    $(window).on('load', () => ankerScroll(hash));
  }
}

// ページ内スクロールを設定する
function setPageScroll(): void {
  $('a[href^="#"]').on('click', (e) => {
    const me = $(e.currentTarget);
    if (me.hasClass('noscroll')) return false;
    ankerScroll(me.attr('href') ?? '');
  });
}

// アンカー位置にページスクロールさせる
function ankerScroll(href: string): void {
  let speed: number = 400;
  let target: JQuery = $(href == '#' || href == undefined || href == '' ? 'html' : href);
  let fix: number = $('.header').outerHeight() ?? 0;
  let top: number = (target.offset()?.top ?? 0) - fix;
  $('body,html').animate({ scrollTop: top }, speed, 'swing');
}
