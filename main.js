import './style.css'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene() //create a new scenefor the website

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000) //creates a human eye

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
}) //create a renderer so that we are able to render things to the screen. I.e. select the attrivute in the html file so that we know where to render it

renderer.setPixelRatio(window.devicePixelRatio) //set it based on the device
renderer.setSize(window.innerWidth, window.innerHeight) //based on width and height
camera.position.setZ(30) //move it along the z-axis
renderer.render(scene,camera) //finally render to the screen

// create a geometry or shape you want to render

const geometry = new THREE.TorusGeometry(10,3,16,100)

// create material which is used to wrap the geometry

const material = new THREE.MeshStandardMaterial({color:0xFF6347}) // based on lighting. Colors ae based on hexadecimal so must addthe 0x in front of the color

//create a lightbulb affect



//create a mesh by combining the geometry and the material

const torus = new THREE.Mesh(geometry, material)

// add the rous to the scene

scene.add(torus)

//create a lightbulb affect

const pointLight = new THREE.PointLight(0xffffff) 
pointLight.position.set(5,5,5)

//create a ambient light, something like the sun above. Lightup the entire scene

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

//add a light helper to show us the position of where the light is shining

const lightHelper = new THREE.PointLightHelper(pointLight);

//add a grid helper to draw out a 2d grid. For visualization purposes only

const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper);

// add a controller such that we can control the page with our mouse

const controls = new OrbitControls(camera, renderer.domElement)

//create a lot of stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100)) // randomly position the stars. 

  star.position.set(x,y,z)
  scene.add(star)

}

Array(200).fill().forEach(addStar)

//load a simple jpg image using three.js

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture

//now use texture mapping to map 2d elements to 3d elemets. Kind of like my math ia

const avatar = new THREE.TextureLoader().load("Anthony.jpg")

const thony = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:avatar})
)
scene.add(thony)

const moonTexture = new THREE.TextureLoader().load("Moon.png")
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map:moonTexture})
)

scene.add(moon)

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

moon.position.z = 30
moon.position.setX(-10)

function moveCamera() {
    const t = document.body.getBoundingClientRect().top

    moon.rotation.x += 0.05
    moon.rotation.y += 0.075
    moon.rotation.z += 0.05
  
    thony.rotation.y += 0.01
    thony.rotation.z += 0.01

    camera.position.z = t * -0.01 //multiply by negative value as the position is negative at first
    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002


}

document.body.onscroll = moveCamera







//re-render the renderer

function animate() {
  requestAnimationFrame(animate); //whenever the browser repaints your screen, call this function



  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

 

  controls.update() //called so that the changes are updated in the ui


  renderer.render(scene,camera)
}

animate()



