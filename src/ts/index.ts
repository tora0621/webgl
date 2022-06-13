/**
 * こちらのファイルがビルドされて、common\js\build.jsに吐き出されます。
 * 各モジュールは、こちらのファイルから読み込んでください。
 *
 * 例) スムーススクロールモジュール読み込み、実行
 * import setSmoothScroll from './common/setSmoothScroll';
 * setSmoothScroll();
 */

// ※ベースコーディング時にtestフォルダと合わせて削除してください。ここから↓
import { sample } from './modules/_sample';
import { test } from './sample';
test();
sample();
// ↑ここまで
