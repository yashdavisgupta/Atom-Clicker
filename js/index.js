//Variables (These won't move between three.js, math, or materialize stuff.)
var renderer, scene, camera, composer, nucleus, cloud, particle, controls, number, multiplier, autoAdd, clickAdd;
//Global, Manipulated, Variables
var gcolor1, gcolor2, elenum, pronum, neunum, energy, score;
elenum = 1;
pronum = 1;
neunum = 0;
energy = 1;
score = 0;
//General Administrative Code
function save() {
    document.cookie = "electrons = " + elenum + ";" + "path=/";
    document.cookie = "protons = " + pronum + ";" + "path=/";
    document.cookie = "neutrons = " + neunum + ";" + "path=/";
    document.cookie = "energy = " + energy + ";" + "path=/";
    document.cookie = "score = " + score + ";" + "path=/";
}
function loadHelper(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return 0;
}
function load() {
    var elec=loadHelper("electrons");
    if (elec != "") {
        return 0;
    } else {
       save();
       }
    }
//LOOK! Its all three.js stuff!
window.onload = function() {
    init();
    animate();
    load();
}
function init() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    document.getElementById('canvas').appendChild(renderer.domElement);
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    scene.add(camera);

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);

    nucleus = new THREE.Object3D();
    cloud = new THREE.Object3D();
    particle = new THREE.Object3D();
    scene.add(nucleus);
    scene.add(cloud);
    scene.add(particle);
    var geometry = new THREE.TetrahedronGeometry(2, 0);
    var geom = new THREE.IcosahedronGeometry((1 + ((pronum + neunum) / 32)), 1);
    var geom2 = new THREE.IcosahedronGeometry(15, 1);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });
    for (var i = 0; i < elenum; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(((Math.random()*2) - 1), ((Math.random()*2) - 1), ((Math.random()*2) - 1)).normalize();
        mesh.position.multiplyScalar(100 + (Math.random() * 100));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
    }
    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });
    var mat2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        side: THREE.DoubleSide
    });
    var solid = new THREE.Mesh(geom, mat);
    solid.scale.x = solid.scale.y = solid.scale.z = 16;
    nucleus.add(solid);
    var buffer = new THREE.Mesh(geom2, mat2);
    buffer.scale.x = buffer.scale.y = buffer.scale.z = 10;
    cloud.add(buffer);
    //var textMesh = new THREE.Mesh( textGeom, material );
    //scene.add( textMesh );
    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);
    var lights = [];
    lights[0] = new THREE.DirectionalLight(0xffffff, 1);
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight(0x19ffb2, 1);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight(0xb219ff, 1);
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
    window.addEventListener('resize', onWindowResize, false);
};
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate);
    particle.rotation.x += (0.0005 * (.5 + (energy / 50)));
    particle.rotation.y -= (0.0040 * (.5 + (energy / 50)));
    nucleus.rotation.x -= (0.0020 * (.5 + (energy / 50)));
    nucleus.rotation.y -= (0.0030 * (.5 + (energy / 50)));
    cloud.rotation.x -= (0.0010 * (.5 + (energy / 50)));
    cloud.rotation.y += (0.0020 * (.5 + (energy / 50)));
    renderer.clear();
    renderer.render(scene, camera)
    controls.update();
};
function render() {
    renderer.render(scene, camera);
}
//Math Stuff!
number = 0
autoAdd = 0
clickAdd = 1
setInterval(function(){
    number = number + (autoAdd * 0.025)
    document.getElementById('score').innerHTML = number;
}, 25);
$("#canvas").click(function() {
    number = number + clickAdd;
    document.getElementById('score').innerHTML = number;
});
//Just things to make the UI pretty
$("#protontab").click(function(){
    document.getElementsByClassName("indicator")[0].className = "indicator proton";
});
$("#neutrontab").click(function(){
    document.getElementsByClassName("indicator")[0].className = "indicator neutron";
});
$("#electrontab").click(function(){
    document.getElementsByClassName("indicator")[0].className = "indicator electron";
});
$("#energytab").click(function(){
    document.getElementsByClassName("indicator")[0].className = "indicator energy";
});
