import * as Sugar from 'sugar';

/**
 * @description 閲覧ページからのルートの相対パスを返す
 * @returns {string} 相対パスを表す文字列
 */
export function getRelPath(): string {
  let href: string = $('link[rel="icon"]').attr('href') ?? '';
  if (href.startsWith('http')) {
    let relpath: sugarjs.String.Chainable<string> = new Sugar.String(location.pathname);
    relpath = relpath
      .remove(/[\w-\.]/g)
      .remove(/^\//)
      .replace(/\//g, '../');
    return relpath.raw;
  } else {
    let m: RegExpMatchArray | null = href.match(/^([\./]+)/g);
    return m?.pop() ?? '';
  }
}
