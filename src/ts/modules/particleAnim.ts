import * as THREE from 'three';

export const particleAnim = () => {
  console.log('particle');
  const target = $('.js-canvas-particle');
  if (!target.length) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const init = () => {
    const scene = new THREE.Scene();

    //視野角とアスペクト比
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, 1000);

    const canvasElement = document.querySelector('canvas')!;
    const renderer = new THREE.WebGL1Renderer({
      canvas: canvasElement,
    });
    renderer.setSize(width, height);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1000);
    scene.add(light);

    //レンダー関数
    const start = () => {
      renderer.render(scene, camera);
    };

    const length = 600;
    const plane_scale = 6;
    const plane: THREE.Mesh[] = [];

    for (let i = 0; i < length; i++) {
      let geometry = new THREE.PlaneGeometry(plane_scale, plane_scale);

      let rect = [];

      let material;
      for (let ci = 0; ci < length; ci++) {
        const color = '0x' + Math.floor(Math.random() * 16777215).toString(16);
        material = new THREE.MeshBasicMaterial({
          color: Number(color),
          opacity: 0.8,
          transparent: true,
          side: THREE.DoubleSide,
        });
        rect.push(new THREE.Mesh(geometry, material));
      }

      plane[i] = new THREE.Mesh(geometry, material);

      plane[i].position.x = width * (Math.random() - 0.5);
      plane[i].position.y = height * (Math.random() - 0.5);
      plane[i].position.z = width * (Math.random() - 0.5);
      scene.add(plane[i]);
    }

    let geometry = new THREE.PlaneGeometry(plane_scale, plane_scale);
    let material = new THREE.MeshBasicMaterial({
      color: '0xffffff',
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < length; i++) {
      plane[i] = new THREE.Mesh(geometry, material);

      plane[i].position.x = width * (Math.random() - 0.5);
      plane[i].position.y = width * (Math.random() - 0.5);
      plane[i].position.z = width * (Math.random() - 0.5);
      scene.add(plane[i]);
    }

    const random = (min: number, max: number) => {
      let rand = Math.floor(min + (max - min + 1) * Math.random());
      return rand;
    };

    //ちらつかせていく
    let rot = 0;
    const tick = () => {
      rot += 0.2;
      const radion = (rot * Math.PI) / 180;
      camera.position.x = 1000 * Math.sin(radion);
      camera.position.z = 1000 * Math.cos(radion);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      for (let i = 0; i < length; i++) {
        plane[i].rotation.x += Math.random() * 0.1;
        plane[i].rotation.y += Math.random() * 0.1;
        plane[i].rotation.z += Math.random() * 0.1;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
    start();
  };

  init();
};
