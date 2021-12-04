function boxshot() {
  // Create the renderer and add it to the page's body element
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create the scene to hold the object
  var scene = new THREE.Scene();

  // Create the camera
  var camera = new THREE.PerspectiveCamera(
    35,                                     // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                    // Near plane distance
    1000                                    // Far plane distance
  );

  // Position the camera
  camera.position.set(-15, 10, 20);

  // Add the lights
  var light = new THREE.PointLight(0xffffff, .4);
  light.position.set(10, 10, 10);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0xbbbbbb);
  scene.add(ambientLight);

  // Load the textures (book images)
  var textureLoader = new THREE.TextureLoader();
  var bookCoverTexture = textureLoader.load('images/southern-gems-cover.png');
  var bookSpineTexture = textureLoader.load('images/southern-gems-spine.png');
  var bookBackTexture = textureLoader.load('images/southern-gems-back.png');
  var bookPagesTexture = textureLoader.load('images/southern-gems-pages.png');
  var bookPagesTopBottomTexture = textureLoader.load('images/southern-gems-pages-topbottom.png');


  // Use the linear filter for the textures to avoid blurriness
  bookCoverTexture.minFilter
    = bookSpineTexture.minFilter
    = bookBackTexture.minFilter
    = bookPagesTexture.minFilter
    = bookPagesTopBottomTexture.minFilter
    = THREE.LinearFilter;


  // Create the materials
  var bookCover = new THREE.MeshLambertMaterial({ color: 0xffffff, map: bookCoverTexture });
  var bookSpine = new THREE.MeshLambertMaterial({ color: 0xffffff, map: bookSpineTexture });
  var bookBack = new THREE.MeshLambertMaterial({ color: 0xffffff, map: bookBackTexture });
  var bookPages = new THREE.MeshLambertMaterial({ color: 0xffffff, map: bookPagesTexture });
  var bookPagesTopBottom = new THREE.MeshLambertMaterial({ color: 0xffffff, map: bookPagesTopBottomTexture });

  var materials = [
    bookPages,          // Right side
    bookSpine,          // Left side
    bookPagesTopBottom, // Top side
    bookPagesTopBottom, // Bottom side
    bookCover,          // Front side
    bookBack            // Back side
  ];

  // Create the book and add it to the scene
  var book = new THREE.Mesh(new THREE.BoxGeometry(7, 10, 1.2, 4, 4, 1), materials);
  scene.add(book);

  // Create the orbit controls for the camera
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enablePan = false;
  controls.enableZoom = false;

  // Begin the animation
  animate();

  /*
    Animate a frame
  */

  function animate() {

    // Update the orbit controls
    controls.update();

    // Render the frame
    renderer.render(scene, camera);

    // Keep the animation going
    requestAnimationFrame(animate);
  }
}