import { breakPoint } from './var';
/**
 * @description タブレット表示であるか判定
 * @returns {boolean} 閲覧デバイスのブラウザ幅がタブレットのブレークポイント以内あればtrue,それ以外はfalse
 */
export function isTablet(): boolean {
  const deviceWidth: number = window.innerWidth;
  return deviceWidth < breakPoint.tablet;
}
