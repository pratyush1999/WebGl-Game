/// <reference path="webgl.d.ts" />

let coin = class {
    constructor(gl, pos, x1, x2, y1, y2, z1, z2) {
        
        this.rotation = 0;
        this.l=z2-z1;
        this.w=x2-x1;
        this.h=y2-y1;
        this.x1=x1;
        this.x2=x2;
        this.y1=y1;
        this.y2=y2;
        this.z1=z1;
        this.z2=z2;
        this.pos = pos;
        this.faceColors = [
     [1.0,  1.0,  1.0,  1.0],   
    [1.0,  1.0,  0.0,  1.0],    
    [0.0,  0.0,  1.0,  1.0],   
    [0.0,  1.0,  1.0,  1.0],   
    [1.0,  0.0,  0.0,  1.0],   
    [1.0,  0.0,  1.0,  1.0],   

        ];
        this.figure=new cuboidColor(gl, this.pos, this.faceColors, x1, x2, y1, y2, z1, z2);
        
    }

    drawCoin(gl, projectionMatrix, programInfo, deltaTime) {
        this.figure.drawCuboidColor(gl, projectionMatrix, programInfo, deltaTime) ;
    }
  
};