/**
 * @description data-grid属性設定した要素に弊社gridクラスセレクタ設定、子要素に対してgクラスセレクタ設定、カンマ区切りはPC,tablet,sumaho <div data-grid="2,3,6">
 */
export function setGrid(): void {
  $('[data-grid]').each(function () {
    const me: JQuery = $(this);
    if (!chkDataGrid(me)) return; //data-grid値チェック

    me.addClass('grid')
      .find('>*:not(".none")')
      .each(function (i) {
        const [g, sg, ssg]: number[] = me
          .data('grid')
          .split(',')
          .map((n: string) => Number(n));
        let cls: string[] = [`g${g}`, `sg${sg}`, `ssg${ssg}`];

        if (g === 12 || (i + 1) % (12 / g) === 1) cls.push('fst');
        if (sg === 12 || (i + 1) % (12 / sg) === 1) cls.push('sfst');
        if (ssg === 12 || (i + 1) % (12 / ssg) === 1) cls.push('ssfst');

        $(this).addClass(cls.join(' '));
      });
  });
}

/**
 * @description data-grid属性の値確認
 * @param {JQuery} data-grid属性を設定している要素
 * @returns {boolean} data-grid属性値が1-12カンマ区切り(1-12,1-12,1-12)の時true、そうでない時false
 */
function chkDataGrid(el: JQuery): boolean {
  const g = el.data('grid');
  if (/^([1-9]|[1][0-2]),([1-9]|[1][0-2]),([1-9]|[1][0-2])$/.test(g)) {
    return true;
  } else {
    console.error(
      el[0],
      `
上記セレクタのdata-grid="${g}"に誤りがあります。
data-gridの値は、数値(1-12)をカンマ区切りで設定してください。
カンマ区切りの数値は、PC,タブレット,スマホでのグリッドのカラム値となります。
(例) <div data-grid="2,3,6"></div>`
    );
    return false;
  }
}
