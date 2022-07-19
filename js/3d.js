// var camera, scene, renderer;
// var geometry, material, mesh;

// init();
// animate();

// function init() {

//     camera = new THREE.PerspectiveCamera(45, 6 / 7, 0.01, 10);
//     camera.position.z = 1;

//     scene = new THREE.Scene();

//     geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
//     material = new THREE.MeshNormalMaterial();

//     mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
//     scene.background = new THREE.Color(0x222222);
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(600, 700);

//     document.getElementById('3DModelContainer').appendChild(renderer.domElement);

// }

// function animate() {

//     requestAnimationFrame(animate);

//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.02;

//     renderer.render(scene, camera);

// }

// import * as THREE from './build/three.module.js';
// import { GLTFLoader } from './build/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';

function main() {
    const canvas = document.getElementById('c');
    console.log(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;

    const fov = 20;
    const aspect = 6 / 7; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(2, 6 / 7, 0.01, 10);
    // camera.position.z = 120;
    // camera.position.y = 150;
    // camera.position.x = 100;



    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    // {
    //     const planeSize = 20;

    //     const loader = new THREE.TextureLoader();
    //     const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png');
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.magFilter = THREE.NearestFilter;
    //     const repeats = planeSize / 2;
    //     texture.repeat.set(repeats, repeats);

    //     const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    //     const planeMat = new THREE.MeshPhongMaterial({
    //         map: texture,
    //         side: THREE.DoubleSide,
    //     });
    //     const mesh = new THREE.Mesh(planeGeo, planeMat);
    //     mesh.rotation.x = Math.PI * -.5;
    //     scene.add(mesh);
    // }

    {
        // const skyColor = 0xB1E1FF; // light blue
        // const groundColor = 0xB97A20; // brownish orange
        // const intensity = 1;
        // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        const light = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1);
        scene.add(light);
    }

    // {
    //     const color = 0xFFFFFF;
    //     const intensity = 0.8;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(5, 10, 2);
    //     scene.add(light);
    //     scene.add(light.target);
    // }

    function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
        const halfSizeToFitOnScreen = sizeToFitOnScreen * 1.2;
        const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
        const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
        // compute a unit vector that points in the direction the camera is now
        // in the xz plane from the center of the box
        const direction = (new THREE.Vector3())
            .subVectors(camera.position, boxCenter)
            .multiply(new THREE.Vector3(1, 0, 1))
            .normalize();

        // move the camera to a position distance units way from the center
        // in whatever direction the camera was from the center already
        camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

        // pick some near and far values for the frustum that
        // will contain the box.
        camera.near = boxSize / 100;
        camera.far = boxSize * 100;

        camera.updateProjectionMatrix();

        // point the camera to look at the center of the box
        camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
    }

    {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('../model/MODEL.gltf', (gltf) => {
            const root = gltf.scene;
            scene.add(root);

            // compute the box that contains all the stuff
            // from root and below
            const box = new THREE.Box3().setFromObject(root);

            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());

            // set the camera to frame the box
            frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

            // ;
        });
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {
        renderer.setSize(600, 700);
        // if (resizeRendererToDisplaySize(renderer)) {
        //     const canvas = renderer.domElement;
        //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
        //     camera.updateProjectionMatrix();
        // }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();