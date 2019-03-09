var cubeRotation = 0.0;
var tracks=new Array();
var trains=new Array();
var walls=new Array();
var boots=new Array();
var coins=new Array();
var obstacleStands=new Array();
var  obstacles1=new Array();
 var powerups=new Array();
main();
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

 
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

   
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}
//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  hero = new hero(gl, [2, 5, -1.0]);
  tracks.push(new track(gl, [hero.pos[0]-1.4, hero.pos[1]-1/10.0-1/15.0-1, hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -5.0, 5.0));
  var t=tracks[tracks.length-1];
  trains.push(new train(gl, [t.pos[0], t.pos[1]+2, t.pos[2]-10], -1.0, -1.0+4.0/3.0, -1.0, -0.5, -4.0, 1.0));
  walls.push(new train(gl, [t.pos[0]-0.5, t.pos[1]+2, t.pos[2]], -3.0, -1.0, -1.0, -0., -4.0, 10.0));
  walls.push(new train(gl, [t.pos[0]-0.5, t.pos[1]+2, t.pos[2]], 4.0, 5.0, -1.0, -0., -4.0, 1.0));
  tracks.push(new track(gl, [hero.pos[0], t.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -5.0, 5.0));
  tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -5.0, 5.0));
  boots.push(new boot(gl, [hero.pos[0], t.pos[1]+t.y2+0.1, t.pos[2]-6], -0.01, 0.01, -0.1, 0.1, -0.005, 0.005));
  //obstacles1.push(new obstacle1(gl, [hero.pos[0], t.pos[1]+t.y2+0.1, t.pos[2]-10], -0.1, 0.1, -0.1, 0.1, -0.05, 0.05));;
  coins.push(new coin(gl, [hero.pos[0]-0.1, t.pos[1]+t.y2+0.1-4, t.pos[2]-4], -0.01, 0.01, -0.1, 0.1, -0.005, 0.005))
  obstacles1.push(new obstacle1(gl, [hero.pos[0], t.pos[1]+1.3, t.pos[2]-10], -0.2, 0.2, -0.1, 0.1, -0.05, 0.05)); 
  obstacleStands.push(new obstacleStand(gl, [hero.pos[0]-0.2, t.pos[1]+t.y2+0.1, t.pos[2]-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  obstacleStands.push(new obstacleStand(gl, [hero.pos[0]+0.2, t.pos[1]+t.y2+0.1, t.pos[2]-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  // If we don't have a GL context, give up now
  powerups.push(new powerup(gl, [hero.pos[0]+0.2, t.pos[1]+t.y2+0.1-3, t.pos[2]-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
  // Vertex shader program
      const texture_track = loadTexture(gl, "file:///Users/pratyushkumar/graphics/Webgl-Subway-Surfers/Assignment3/WebGLBoilerPlate/track.png");
      const texture_wall = loadTexture(gl, "file:///Users/pratyushkumar/graphics/Webgl-Subway-Surfers/Assignment3/WebGLBoilerPlate/wall.jpeg");
      const texture_train = loadTexture(gl, "file:///Users/pratyushkumar/graphics/Webgl-Subway-Surfers/Assignment3/WebGLBoilerPlate/train.png");
       const texture_obstacle1 = loadTexture(gl, "file:///Users/pratyushkumar/graphics/Webgl-Subway-Surfers/Assignment3/WebGLBoilerPlate/strips.jpg"); 
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    drawScene(gl, programInfo, deltaTime, texture_track, texture_wall, texture_train, texture_obstacle1);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Draw the scene.
//
function tick(gl){
  var temp_track=tracks[tracks.length-1];
   tracks.push(new track(gl, [0.2, temp_track.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -1.0, 1.0));
  tracks.push(new track(gl, [2,  temp_track.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -1.0, 1.0));
  tracks.push(new track(gl, [3.4,  temp_track.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -1.0, 1.0));
hero.tickHero();
for (var p of tracks)
{
  p.tickTrack(0);
}
for (var p of obstacles1)
{
  p.tickObstacle1(0);
  if (checkCollisionyz(p, hero)) {
        hero.pos[2]-=1; 
        hero.zspeed-=hero.zspeed/4;
        hero.flag=1;
  }
}
for(var p of boots)
{
  if (checkCollisionyz(p, hero)) {
    hero.onboot=20;
    hero.test=1;
  }
}
for(var c of coins){
  if (checkCollisionyz(c, hero)) {
    hero.test=1;
  }
}
hero.onTrain=0;
for (var p of trains)
{
  p.tickTrain(0);
     if(checkCollisionxz(p, hero)&&hero.pos[1]<p.pos[1]+p.y2-hero.y1-0.15&&hero.pos[2]-hero.zspeed>p.pos[2])
      {
        hero.pos[2]+=1;
      } 
    else if(checkCollisionxz(p, hero)&&hero.pos[1]<p.pos[1]+p.y2-hero.y1-0.15)
      {
        hero.pos[0]-=hero.xspeed; 
        hero.zspeed-=hero.zspeed/4;
        hero.flag=1;
      }
      else if (checkCollisionyz(p, hero)) {
        hero.onTrain=1;
        hero.pos[1]=p.pos[1]+p.y2-hero.y1;
      } 
  
}
hero.xspeed=0;
}
function drawScene(gl, programInfo, deltaTime, texture_track, texture_wall, texture_train, texture_obstacle1) {
  
  tick(gl);
  gl.clearColor(0, 255, 255, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [hero.pos[0], 5, hero.pos[2]+2]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [hero.pos[0], 5, hero.pos[2]-5], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

hero.drawHero(gl, viewProjectionMatrix, programInfo, deltaTime);
for (var p of tracks)
{
  p.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime, texture_track);
}
for (var p of trains)
{
  p.drawTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture_train);
}
for (var p of walls)
{
  p.drawTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture_wall);
}
for (var p of obstacles1)
{
  p.drawObstacle1(gl, viewProjectionMatrix, programInfo, deltaTime, texture_obstacle1);
}
for (var p of obstacleStands)
{
  p.drawObstacleStand(gl, viewProjectionMatrix, programInfo, deltaTime);
}
for(var b of boots){
  b.drawBoot(gl, viewProjectionMatrix, programInfo, deltaTime);
}
for(var c of coins){
  c.drawCoin(gl, projectionMatrix, programInfo, deltaTime);
}
for(var f of powerups){
  f.drawPowerup(gl, projectionMatrix, programInfo, deltaTime);
}
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
function checkCollisionxz(obj1, obj2){
x11=obj1.pos[2]+obj1.z1;
x12=obj1.pos[2]+obj1.z2;
x21=obj2.pos[2]+obj2.z1;
x22=obj2.pos[2]+obj2.z2;
temp_list=[];
temp_list.push([x11, x12]);
temp_list.push([x21, x22]);
temp_list.sort(function(a, b){return a[0] - b[0]});
if (temp_list[0][1]<temp_list[1][0]) {
  return 0;
}
x11=obj1.pos[0]+obj1.x1;
x12=obj1.pos[0]+obj1.x2;
x21=obj2.pos[0]+obj2.x1;
x22=obj2.pos[0]+obj2.x2;
var temp_list=[];
temp_list.push([x11, x12]);
temp_list.push([x21, x22]);
temp_list.sort(function(a, b){return a[0] - b[0]});
if (temp_list[0][1]<temp_list[1][0]) {
  return 0;
}
return 1;
}
function checkCollisionyz(obj1, obj2){
x11=obj1.pos[1]+obj1.y1
x12=obj1.pos[1]+obj1.y2;
x21=obj2.pos[1]+obj2.y1;
x22=obj2.pos[1]+obj2.y2;
temp_list=[];
temp_list.push([x11, x12]);
temp_list.push([x21, x22]);
temp_list.sort(function(a, b){return a[0] - b[0]});
if (temp_list[0][1]<temp_list[1][0]) {
  return 0;
}
x11=obj1.pos[2]+obj1.z1;
x12=obj1.pos[2]+obj1.z2;
x21=obj2.pos[2]+obj2.z1;
x22=obj2.pos[2]+obj2.z2;
temp_list=[];
temp_list.push([x11, x12]);
temp_list.push([x21, x22]);
temp_list.sort(function(a, b){return a[0] - b[0]});
if (temp_list[0][1]<temp_list[1][0]) {
  return 0;
}
x11=obj1.pos[0]+obj1.x1;
x12=obj1.pos[0]+obj1.x2;
x21=obj2.pos[0]+obj2.x1;
x22=obj2.pos[0]+obj2.x2;
var temp_list=[];
temp_list.push([x11, x12]);
temp_list.push([x21, x22]);
temp_list.sort(function(a, b){return a[0] - b[0]});
if (temp_list[0][1]<temp_list[1][0]) {
  return 0;
}
return 1;
}