module.exports = `
<!DOCTYPE html>
<html>
<head>
    <meta charset=UTF-8 />
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
<script src="three.min.js"></script>
<script src="GLTFLoader.js"></script>
<script src="OrbitControls.js"></script>
<script>
    //import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
    let scene, camera, renderer;
    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        camera = new THREE.PerspectiveCamera(1 ,window.innerWidth/window.innerHeight,1,5000);
        camera.rotation.y = 45/180*Math.PI;
        camera.position.x = 500;
        camera.position.y = 500;
        camera.position.z = 1000;

        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);

        controls = new THREE.OrbitControls(camera,renderer.domElement);
        controls.target.set(0, 1, 0);
        controls.update();

        controls.addEventListener('change', renderer);
        hlight = new THREE.AmbientLight (0x404040,100);
        scene.add(hlight);
        directionalLight = new THREE.DirectionalLight(0xffffff,100);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        light = new THREE.PointLight(0xc4c4c4,10);
        light.position.set(0,300,500);
        scene.add(light);
        light2 = new THREE.PointLight(0xc4c4c4,10);
        light2.position.set(500,100,0);
        //scene.add(light2);
        light3 = new THREE.PointLight(0xc4c4c4,10);
        light3.position.set(0,100,-500);
        //scene.add(light3);
        light4 = new THREE.PointLight(0xc4c4c4,10);
        light4.position.set(-500,300,500);
        //scene.add(light4);

        var loader = new THREE.GLTFLoader();
        loader.load('scene.gltf', function(gltf){
            model = gltf.scene.children[0];
            model.scale.set(1,1,1);
            scene.add(gltf.scene);
            animate();
        });
    }
    function animate() {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }
    init();
</script>
</body>
</html>
`;