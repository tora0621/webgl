import * as THREE from 'three';

export const rainAnim = () => {
  const target = $('.js-canvas-rain');
  if (!target.length) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  scene.rotation.x = Math.PI;

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, -500, 1000);

  const canvasElement = document.querySelector('canvas')!;
  const renderer = new THREE.WebGL1Renderer({
    canvas: canvasElement,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);

  const light = new THREE.AmbientLight(0xffffff, 1.0);
  light.position.set(0, 0, 0);
  scene.add(light);

  const x_size = window.innerWidth;
  const y_size = window.innerHeight;
  const length = 600;
  const plane_scale = 0.5;
  const plane_scale02 = 10;
  const plane: any = [];

  for (let i = 0; i < length; i++) {
    let geometry = new THREE.PlaneGeometry(plane_scale, plane_scale02);
    var material = new THREE.MeshBasicMaterial({
      color: '0xafafb0',
      opacity: 0.4,
      transparent: true,
      side: THREE.DoubleSide,
    });
    plane[i] = new THREE.Mesh(geometry, material);

    plane[i].position.x = x_size * (Math.random() - 0.5);
    plane[i].position.y = y_size * (Math.random() - 0.5);
    plane[i].position.z = x_size * (Math.random() - 0.5);
    scene.add(plane[i]);
  }

  const random = (min: number, max: number) => {
    let rand = Math.floor(min + (max - min + 1) * Math.random());
    return rand;
  };

  const tick = () => {
    for (let i = 0; i < length; i++) {
      plane[i].position.x += random(-5, 5) * 0;
      plane[i].position.y += 5.5;
      if (plane[i].position.y > height) {
        plane[i].position.x = x_size * (Math.random() - 0.5);
        plane[i].position.y = 0;
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  //アニメ―ション
  const start = () => {
    renderer.render(scene, camera);
  };
  tick();
  start();
};
