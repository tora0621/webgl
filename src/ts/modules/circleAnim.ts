import * as THREE from 'three';

export const circleAnim = () => {
  const target = $('.js-canvas-circle');
  if (!target.length) return;

  console.log('circle start');

  const width = window.innerWidth;
  const height = window.innerHeight;

  const init = () => {
    // シーンを作る
    const scene = new THREE.Scene();

    // カメラを作る
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 100, 1000);

    // レンダラーを作る
    const canvasElement = document.querySelector('canvas')!;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);

    // ライトを作る
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    console.log('test');
    light.position.set(0, 0, 0);
    scene.add(light);

    const x_size = window.innerWidth;
    const y_size = window.innerHeight;
    const length = 800;
    const plane_scale = 4;
    const plane: any = [];

    for (let i = 0; i < length; i++) {
      let geometry = new THREE.SphereGeometry(plane_scale, plane_scale, plane_scale);
      var material = new THREE.MeshBasicMaterial({
        color: '0xcccccc',
        opacity: 0.1,
        transparent: true,
      });

      plane[i] = new THREE.Mesh(geometry, material);

      plane[i].position.x = x_size * (Math.random() - 0.5);
      plane[i].position.y = y_size * (Math.random() - 0.5);
      plane[i].position.z = x_size * (Math.random() - 0.5);
      scene.add(plane[i]);
    }

    function random(min: number, max: number) {
      let rand = Math.floor(min + (max - min + 1) * Math.random());
      return rand;
    }

    const tick = () => {
      for (let i = 0; i < length; i++) {
        plane[i].position.x += random(-5, 5) * 0.1;
        plane[i].position.y += 2.5;
        plane[i].position.z += random(-5, 5) * 0.1;
        if (plane[i].position.y > height) {
          plane[i].position.x = x_size * (Math.random() - 0.5);
          plane[i].position.y = 0;
          plane[i].position.z = x_size * (Math.random() - 0.5);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    //リサイズ時にcanvas幅を再計算
    onResize();
    window.addEventListener('resize', onResize);

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    tick();

    const start = () => {
      renderer.render(scene, camera);
    };
    start();
  };

  // ページの読み込みを待つ
  window.addEventListener('load', init);
};
