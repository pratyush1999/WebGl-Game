/// <reference path="webgl.d.ts" />

let Jet = class {
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
     [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  0.0,  Math.random()],    
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   

        ];
        this.faceColors1 = [
     [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  0.0,  Math.random()],    
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   

        ];
        this.faceColors2 = [
     [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  0.0,  Math.random()],    
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   

        ];
        this.figure3=new cuboidColor(gl, this.pos, this.faceColors, x1, x2, y1, y2, z1, z2);
        this.figure1=new cuboidColor(gl, [this.pos[0]+this.x1, this.pos[1], this.pos[2]+z2+0.1], this.faceColors1, x1/4.0, x2/4.0, y1/2.0, y2/2.0, -0.01, 0.01);
        this.figure2=new cuboidColor(gl, [this.pos[0]+this.x2, this.pos[1], this.pos[2]+z2+0.1], this.faceColors2, x1/4.0, x2/4.0, y1/2.0, y2/2.0, -0.01, 0.01);
    }

    drawJet(gl, projectionMatrix, programInfo, deltaTime) {
        this.figure3.drawCuboidColor(gl, projectionMatrix, programInfo, deltaTime) ;
        this.figure1.drawCuboidColor(gl, projectionMatrix, programInfo, deltaTime) ;
        this.figure2.drawCuboidColor(gl, projectionMatrix, programInfo, deltaTime) ;
    }
    tickJet(x){
        // this.figure3.pos=this.pos;
        // this.figure1.pos=[this.pos[0]+this.x1, this.pos[1], this.pos[2]+this.z2+0.1];
        // this.figure2.pos=[this.pos[0]+this.x2, this.pos[1], this.pos[2]+this.z2+0.1];
    }
};