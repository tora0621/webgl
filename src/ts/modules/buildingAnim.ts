import * as THREE from 'three';
const noise = require('simplenoise');

export const buildingAnim = () => {
  const target = $('.js-canvas');
  if (!target.length) return;

  let stageW = 0; // 画面の幅
  let stageH = 0; // 画面の高さ

  // canvas要素の参照を取得
  const canvas = document.querySelector('canvas')!;
  // 2Dの描画命令群を取得
  const context = canvas.getContext('2d')!;

  noise.seed(Math.random());

  // リサイズ
  const resize = () => {
    stageW = innerWidth * devicePixelRatio;
    stageH = innerHeight * devicePixelRatio;

    canvas.width = stageW;
    canvas.height = stageH;
  };

  //毎秒やる
  const tick = () => {
    requestAnimationFrame(tick);
    draw();
  };

  // 描画
  const draw = () => {
    // 画面をリセット
    context.clearRect(0, 0, stageW, stageH);
    context.lineWidth = 3;

    context.strokeStyle = 'white';
    // context.fillStyle = 'white';

    const ctx = canvas.getContext('2d')!;
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.)';

    const segmentNum = 3;
    const amplitude = stageH / 2;
    const time = Date.now() / 4000;

    const lineNum = 3;

    context.beginPath();
    for (let j = 0; j < lineNum; j++) {
      const h = Math.round((j / lineNum) * 360);
      const s = 100;
      const l = Math.round((j / lineNum) * 100);
      // 色を指定
      context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;
      for (let i = 0; i < segmentNum; i++) {
        const x = (i / (segmentNum - 1)) * stageW;
        const px = i / (100 + j); // 横軸の入力値
        const py = j / 100 + time; // 時間の入力値
        const y = amplitude * noise.perlin2(px, py) + stageH / 2;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
    }
    context.stroke();
  };

  tick();

  resize();

  window.addEventListener('resize', resize);
};
