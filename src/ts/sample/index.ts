/**
 * モジュールのテスト用
 * ※ベースコーディング時にindex.tsからの読み込みと合わせて削除してください。
 */

import { setSmoothScroll } from '../common/setSmoothScroll';
import { isSumaho } from '../common/isSumaho';
import { isTablet } from '../common/isTablet';
import { getRelPath } from '../common/getRelPath';
import { setResponsiveImg } from '../common/setResponsiveImg';
import { setSlider } from './setSlider';
import { reservation } from './reservation';
import { setResponsiveImgMaps } from '../common/setResponsiveImgMaps';
import { setMatchHeight } from '../common/setMatchHeight';
import { setGrid } from '../common/setGrid';
import { setPopup } from './setPopup';
import { Base64 } from 'js-base64';
import { sampleThree } from '../modules/sampleThree';

export function test(): void {
  // console.log('isSumaho実行結果:' + isSumaho());
  // console.log('isTablet実行結果:' + isTablet());
  // console.log('ルートからの相対パス:' + getRelPath());
  // reservation();
  // setGrid();
  // setPopup();
  // setResponsiveImg();
  // setResponsiveImgMaps();
  // setSlider();
  // setMatchHeight();
  // setSmoothScroll();
  // base64_test();
  sampleThree();
}
