import * as THREE from 'three';

export const sampleThree = () => {
  // ------------------------------------------------
  // 絶対入れる部分
  // ------------------------------------------------
  const target = $('.js-sample-three');
  if (!target.length) return;

  // シーンを作成
  const scene = new THREE.Scene();

  console.log(THREE);
  console.log(scene);

  // カメラを作成（カメラはperspectiveCamera）
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 4;

  // rendererを作成（アンチエイリアスも指定）
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  // レンダラーの色、サイズを指定
  renderer.setClearColor('#000000');
  renderer.setSize(window.innerWidth, window.innerHeight);

  // DOMにrenderを追加する。
  document.body.appendChild(renderer.domElement);

  // ------------------------------------------------
  // プロジェクトごとに自由に書くところ
  // ------------------------------------------------

  // CubeをbasicMaterialで作成。
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: '#433F81' });

  const cube = new THREE.Mesh(geometry, material);

  // Add cube to Scene
  scene.add(cube);

  // Render Loop
  const render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
  };

  render();
};
