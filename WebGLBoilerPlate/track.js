/// <reference path="webgl.d.ts" />

let track = class {
    constructor(gl, pos, x1, x2, y1, y2, z1, z2, pebbels) {
        
        this.rotation = 0;
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;
        this.z1=z1;
        this.z2=z2;
        this.pos = pos;
        this.pebbels=pebbels;
          this.faceColors = [
     [56/256,  57/256,  58/256,  1],   
   [56/256,  57/256,  58/256,  1],  
    [56/256,  57/256,  58/256,  1],   
   [56/256,  57/256,  58/256,  1],  
    [56/256,  57/256,  58/256,  1],   
   [56/256,  57/256,  58/256,  1],      
        ];
        const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
  ];
        this.figure=new cuboid(gl, this.pos, this.faceColors, x1, x2, y1, y2, z1, z2, textureCoordinates);
        this.figure1 = new cuboidColor(gl, this.pos, this.faceColors, x1, x2, y1, y2, z1, z2);

    }

    drawTrack(gl, projectionMatrix, programInfo, deltaTime, texture) {
        if(this.pebbels)
        this.figure.drawCuboid(gl, projectionMatrix, programInfo, deltaTime, texture) ;
        else
            this.figure1.drawCuboidColor(gl, projectionMatrix, programInfo, deltaTime) ;
    }
    tickTrack(x){
        this.pos[2]+=x;
        this.figure.pos=this.pos
    }
};