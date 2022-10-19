import { useEffect } from 'react';
import * as THREE from 'three';
import './App.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector2 } from 'three';




function App() {

  //function is run when the page first loads

  useEffect(() => { 
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.setZ(50);

  //Renderer

  const canvas = document.getElementById('my-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  //Controls

  const controls = new OrbitControls(camera, renderer.domElement); 
  const pointer = new THREE.Vector2();


  
  function onPointerMove( event ) {

	pointer.x =  ( event.clientX / window.innerWidth ) * 1.5;
	pointer.y =  ( event.clientY / window.innerHeight ) * -1.5;

  };

  //Light

  const ambientLight = new THREE.AmbientLight(0xffffff, 2); //color and intensity
  scene.add(ambientLight);

  //GLTF load
  
  let loadedModel;
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('./cube.gltf', (gltfScene) => {
    loadedModel = gltfScene;
    scene.add(gltfScene.scene);
  });

  //

  const animate = () => {
    if (loadedModel) {   
    loadedModel.scene.scale.set(10, 10, 10);
    
    loadedModel.scene.position.y = THREE.MathUtils.lerp(loadedModel.scene.position.y, (pointer.y * Math.PI) / 0.6, 0.1);
    loadedModel.scene.position.x = THREE.MathUtils.lerp(loadedModel.scene.position.x, (pointer.x * Math.PI) / 0.6, 0.1);
    
    }

    controls.update();

    renderer.render(scene, camera);

    window.addEventListener( 'pointermove', onPointerMove );

    window.requestAnimationFrame( animate );

    };
  
  animate();
}, []);

  return (
    <div>
      <canvas id="my-canvas"></canvas>
        
    </div>
  )
}

export default App


