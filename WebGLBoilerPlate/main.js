var cubeRotation = 0.0;
var tracks=new Array();
var trains=new Array();
var walls=new Array();
var boots=new Array();
var coins=new Array();
var obstacleStands=new Array();
var  obstacles1=new Array();
 var jets=new Array();
main();
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

 
  const level = 0;
  
    internalFormat=gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
    srcFormat=gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([135, 143, 155, 255]);  
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
  walls.push(new hero(gl, [2, 5, 0.1], 1));
  hero = new hero(gl, [2, 5, -1.0], 0); 
  tracks.push(new track(gl, [hero.pos[0]-1.4, hero.pos[1]-1/10.0-1/15.0-1, hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -30.0, 5.0, 0));
  var t=tracks[tracks.length-1];
  for(var i=0;i>-30;i-=2)
  {
    tracks.push(new track(gl, [hero.pos[0]-1.4, t.pos[1]+t.y2, hero.pos[2]+i], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
    tracks.push(new track(gl, [hero.pos[0]-1.4, t.pos[1]+t.y2, hero.pos[2]-i], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
  }
  tracks.push(new track(gl, [hero.pos[0]-1.4, hero.pos[1]-1/10.0-1/15.0-1, hero.pos[2]-30], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -30.0, 5.0, 0));
  for(var i=0;i>-30;i-=2)
  {
    tracks.push(new track(gl, [hero.pos[0]-1.4, t.pos[1]+t.y2, hero.pos[2]+i-30], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
    tracks.push(new track(gl, [hero.pos[0]-1.4, t.pos[1]+t.y2, hero.pos[2]-i-30], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
  }
  trains.push(new train(gl, [t.pos[0], t.pos[1]+t.y2+1-0.2, t.pos[2]-10], -1.0, -1.0+4.0/3.0, -1.0, 1, -10.0, 1.0));
  trains.push(new train(gl, [t.pos[0]+2.7, t.pos[1]+t.y2+1-0.2, t.pos[2]-10], -1.0, -1.0+4.0/3.0, -1.0, 1, -10.0, 1.0));
  walls.push(new train(gl, [t.pos[0]-0.5, t.pos[1]+2, t.pos[2]], -3.0, -1.0, -1.0, -0., -4.0, 4.0));
  walls.push(new train(gl, [t.pos[0]-0.5, t.pos[1]+2, t.pos[2]], 4.0, 5.0, -1.0, -0., -4.0, 4.0));
  tracks.push(new track(gl, [hero.pos[0], t.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -30.0, 5.0, 0));
  tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -30.0, 5.0, 0));
  for(var i=0;i>-30;i-=2)
  {
    tracks.push(new track(gl, [hero.pos[0], t.pos[1]+t.y2, hero.pos[2]+i], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
    tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1]+t.y2, hero.pos[2]+i], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
     tracks.push(new track(gl, [hero.pos[0], t.pos[1]+t.y2, hero.pos[2]-i], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
    tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1]+t.y2, hero.pos[2]-i], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
  }
  tracks.push(new track(gl, [hero.pos[0], t.pos[1], hero.pos[2]-30], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -30.0, 5.0, 0));
  tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1], hero.pos[2]-30], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -30.0, 5.0, 0));
  for(var i=0;i>-30;i-=2)
  {
    tracks.push(new track(gl, [hero.pos[0], t.pos[1]+t.y2, hero.pos[2]+i-30], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
    tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1]+t.y2, hero.pos[2]+i-30], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
     tracks.push(new track(gl, [hero.pos[0], t.pos[1]+t.y2, hero.pos[2]-i-30], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
    tracks.push(new track(gl, [hero.pos[0]+1.4, t.pos[1]+t.y2, hero.pos[2]-i-30], -1.0, -1.0+4.0/3.0, -0.001, 0.001, -1.0/2, 1.0/2, 1));
    tracks[tracks.length-1].pebbles=1;
  }
  boots.push(new boot(gl, [hero.pos[0], t.pos[1]+t.y2+0.1, t.pos[2]-8], -0.05, 0.05, -0.1, 0.1, -0.005, 0.005));
  for(var i=0;i<10;i+=1)
    {
        hero.forcoin++;
      boots.push(new coin(gl, [hero.pos[0]-1.4, t.pos[1]+t.y2+0.1, t.pos[2]-3-i], -0.1, 0.1, -0.1, 0.1, -0.1, 0.1));
    }
   for(var i=0;i<5;i+=1)
    boots.push(new coin(gl, [hero.pos[0]+1.4, t.pos[1]+t.y2+0.1, t.pos[2]-3-i-20], -0.1, 0.1, -0.1, 0.1, -0.1, 0.1));
   for(var i=0;i<5;i+=1)
    boots.push(new coin(gl, [hero.pos[0]-1.4, t.pos[1]+t.y2+0.1, t.pos[2]-3-i-20], -0.1, 0.1, -0.1, 0.1, -0.1, 0.1));
  //obstacles1.push(new obstacle1(gl, [hero.pos[0], t.pos[1]+t.y2+0.1, t.pos[2]-10], -0.1, 0.1, -0.1, 0.1, -0.05, 0.05));;
  //coins.push(new coin(gl, [hero.pos[0]-0.1, t.pos[1]+t.y2+0.1-4, t.pos[2]-4], -0.01, 0.01, -0.1, 0.1, -0.005, 0.005))
  obstacles1.push(new obstacle1(gl, [hero.pos[0]-0.1, t.pos[1]+1.3, t.pos[2]-10], -0.2, 0.2, -0.1, 0.1, -0.05, 0.05)); 

  obstacleStands.push(new obstacleStand(gl, [hero.pos[0]-0.3, t.pos[1]+t.y2+0.1, t.pos[2]-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  obstacleStands.push(new obstacleStand(gl, [hero.pos[0]+0.1, t.pos[1]+t.y2+0.1, t.pos[2]-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  obstacles1.push(new obstacle1(gl, [hero.pos[0]-0.1, t.pos[1]+1.3, t.pos[2]-10-10], -0.2, 0.2, -0.1, 0.1, -0.05, 0.05)); 

  obstacleStands.push(new obstacleStand(gl, [hero.pos[0]-0.3, t.pos[1]+t.y2+0.1, t.pos[2]-10-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  obstacleStands.push(new obstacleStand(gl, [hero.pos[0]+0.1, t.pos[1]+t.y2+0.1, t.pos[2]-10-10], -0.005, 0.005, -0.1, 0.1, -0.005, 0.005));
  obstacleStands.push(new jet(gl, [hero.pos[0], t.pos[1]+t.y2+0.04, t.pos[2]-4], -0.1, 0.1, -0.1, 0.1, -0.02, 0.02));
  obstacleStands.push(new jet(gl, [hero.pos[0]-0.1/2, t.pos[1]+t.y2+0.04, t.pos[2]-4+0.1], -0.1/4, 0.1/4, -0.1/2, 0.1/2, -0.02, 0.02));
  obstacleStands.push(new jet(gl, [hero.pos[0]+0.1/2, t.pos[1]+t.y2+0.04, t.pos[2]-4+0.1], -0.1/4, 0.1/4, -0.1/2, 0.1/2, -0.02, 0.02));
  obstacleStands.push(new jet(gl, [hero.pos[0], t.pos[1]+t.y2+0.04, t.pos[2]-4-10], -0.1, 0.1, -0.1, 0.1, -0.02, 0.02));
  obstacleStands.push(new jet(gl, [hero.pos[0]-0.1/2, t.pos[1]+t.y2+0.04, t.pos[2]-4+0.1-10], -0.1/4, 0.1/4, -0.1/2, 0.1/2, -0.02, 0.02));
  obstacleStands.push(new jet(gl, [hero.pos[0]+0.1/2, t.pos[1]+t.y2+0.04, t.pos[2]-4+0.1-10], -0.1/4, 0.1/4, -0.1/2, 0.1/2, -0.02, 0.02));
  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
  // Vertex shader program

 texture_pebbles = loadTexture(gl, "stones.jpeg"); 
   texture_wall = loadTexture(gl, "wall.jpeg");
 texture_train = loadTexture(gl, "train.png");
  texture_obstacle1 = loadTexture(gl, "strips.jpg"); 
  

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
 
  const fsSource_grayscale = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;

    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);
        gl_FragColor = vec4(grayscale, vColor.a);
    }
  `;
  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgramgrayscale = initShaderProgram(gl, vsSource, fsSource_grayscale);

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
const programInfoGrayScale = {
    program: shaderProgramgrayscale,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramgrayscale, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgramgrayscale, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramgrayscale, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramgrayscale, 'uModelViewMatrix'),
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
    if (hero.pos[2]<-30) {
      alert('Game Over');
      alert("Score:"+hero.score);
      alert("Lives Remaining:"+hero.lives);
      return ;
    }
            if (hero.grayscale) {          
              drawScene(gl, programInfoGrayScale, deltaTime, texture_wall, texture_train, texture_obstacle1, texture_pebbles);

            }else
          drawScene(gl, programInfo, deltaTime, texture_wall, texture_train, texture_obstacle1, texture_pebbles);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// Draw the scene.
//
function tick(gl){
  var t=walls[walls.length-1];
  //  tracks.push(new track(gl, [0.2, temp_track.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -1.0, 1.0));
  // tracks.push(new track(gl, [2,  temp_track.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -1.0, 1.0));
  // tracks.push(new track(gl, [3.4,  temp_track.pos[1], hero.pos[2]], -1.0, -1.0+4.0/3.0, -1.0, 1.0, -1.0, 1.0));
  walls[0].pos[2]=hero.pos[2]+1;
  walls[0].tickHero();
  walls.push(new train(gl, [0.6, t.pos[1], hero.pos[2]], -3.0, -1.0, -1.0, -0., -20.0, 1.0));
  walls.push(new train(gl, [0.6-0.5-0.4, t.pos[1], hero.pos[2]], 4.0, 5.0, -1.0, -0., -20.0, 1.0));
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
        if (hero.flag>0) {
          hero.lives-=1;
        }
        hero.flag=1;
  }
}
for(var p of obstacleStands){
  if (checkCollisionyz(p, hero)&&p.isJet==1) {
    hero.fly=10;
  }
}
for(var p of boots)
{
  if (checkCollisionyz(p, hero)) {
    if (p.iscoin) {
      if (p.powerup) {
        hero.lives+=10;
      }
       hero.score+=1;
       p.pos[1]=-1000;
    }
    else{
    hero.onboot=20;
    p.pos[1]=-1000;
  }
  }
}
if (checkCollisionyz(walls[0], hero)&&hero.flag>0) {
  hero.lives-=2;
}
for(var i = walls.length - 1; i > 0; i--){
  if (checkCollisionyz(walls[i], hero)) {
    hero.pos[0]-=hero.xspeed;
  }
}
hero.onTrain=0;
for (var p of trains)
{
  p.tickTrain(0);
     if(checkCollisionxz(p, hero)&&hero.pos[1]<p.pos[1]+p.y2-hero.y1-0.15&&hero.pos[2]-hero.zspeed>p.pos[2])
      {
        hero.pos[2]+=1;
         if (hero.flag>0) {
          hero.lives-=1;
        }
        hero.flag=1;
      } 
    else if(checkCollisionxz(p, hero)&&hero.pos[1]<p.pos[1]+p.y2-hero.y1-0.15)
      {
        hero.pos[0]-=hero.xspeed; 
        hero.zspeed-=hero.zspeed/4;
         if (hero.flag>0) {
          hero.lives-=1;
        }
        hero.flag=1;
      }
     if (checkCollisionyz(p, hero)&&hero.prevy>p.pos[1]+p.y2) {
        hero.onTrain=1;
        hero.pos[1]=p.pos[1]+p.y2-hero.y1;
      } 
  
}
hero.xspeed=0;
}
function drawScene(gl, programInfo, deltaTime, texture_wall, texture_train, texture_obstacle1, texture_pebbles) {
  
  tick(gl);
  gl.clearColor(0, 0, 0, 1.0);  // Clear to black, fully opaque
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
    mat4.translate(cameraMatrix, cameraMatrix, [hero.pos[0], hero.pos[1]+0.8, hero.pos[2]+4]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [hero.pos[0], hero.pos[1], hero.pos[2]-5], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
hero.drawHero(gl, viewProjectionMatrix, programInfo, deltaTime);
for (var p of tracks)
{
  p.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime, texture_pebbles);
}
for (var p of trains)
{
  if(hero.time%2==0)
  p.drawTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture_train);
  else
  p.drawBrightTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture_train);  
}
for (var i = walls.length - 1; i > 0; i--)
{
  if(hero.time%2==1)
  walls[i].drawTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture_wall);
else
  walls[i].drawBrightTrain(gl, viewProjectionMatrix, programInfo, deltaTime, texture_wall);
}
if(hero.flag>7 || hero.pos[2]==-1+hero.zspeed)
{
  walls[0].drawHero(gl, viewProjectionMatrix, programInfo, deltaTime);
hero.test+=1;
}
for (var p of obstacles1)
{
  p.drawObstacle1(gl, viewProjectionMatrix, programInfo, deltaTime, texture_obstacle1);
}
for (var p of obstacleStands)
{
  if(p.isJet==0)
  p.drawObstacleStand(gl, viewProjectionMatrix, programInfo, deltaTime);
else
  p.drawJet(gl, viewProjectionMatrix, programInfo, deltaTime);
}
for(var b of boots){
  if(b.iscoin)
  b.drawCoin(gl, viewProjectionMatrix, programInfo, deltaTime);
else
  b.drawBoot(gl, viewProjectionMatrix, programInfo, deltaTime);
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