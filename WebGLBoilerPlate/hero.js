/// <reference path="webgl.d.ts" />

let hero = class {
    constructor(gl, pos) {
        this.rotation = 0;
        this.l=0.2;
        this.w=0.2;
        this.h=0.2+2/26.0+2/30.0;
        this.flagy=0;
        this.ground=pos[1];
        this.pos = pos;
        this.zspeed=-0.5;
        this.maxzspeed=-0.5;
        this.maxxspeed=0.5;
        this.yspeed=0;
        this.inityspeed=0.05;
        this.gravity=-0.05/5;
        this.xspeed=0
        this.flag=0;
        this.test=0;
        this.onTrain=0;
        this.x1=-this.w/2;
        this.x2=this.w/2;
        this.y1=-this.h/2;
        this.y2=this.h/2;
        this.z1=-this.l/2;
        this.z2=this.l/2;
        this.faceColors = [
     [1.0,  1.0,  1.0,  1.0],   
    [1.0,  1.0,  0.0,  1.0],    
    [0.0,  0.0,  1.0,  1.0],   
    [0.0,  1.0,  1.0,  1.0],   
    [1.0,  0.0,  0.0,  1.0],   
    [1.0,  0.0,  1.0,  1.0],   

        ];
        this.torso=new cube(gl, [this.pos[0], this.pos[1], this.pos[2]], this.faceColors, 10);
        this.leg1=new cube(gl, [this.torso.pos[0]-0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]], this.faceColors, 26);
        this.leg2=new cube(gl, [this.torso.pos[0]+0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]], this.faceColors, 26);
        this.head=new cube(gl, [this.torso.pos[0], this.torso.pos[1]+1/10.0+1/30.0, this.torso.pos[2]], this.faceColors, 30);
    }   

    drawHero(gl, projectionMatrix, programInfo, deltaTime) {
        this.torso.drawCube(gl, projectionMatrix, programInfo, deltaTime);
        this.leg1.drawCube(gl, projectionMatrix, programInfo, deltaTime);
        this.leg2.drawCube(gl, projectionMatrix, programInfo, deltaTime);
        this.head.drawCube(gl, projectionMatrix, programInfo, deltaTime);
}
tickHero(){
    if (this.flag>0) {
        this.flag+=1;
        if (this.flag>6) {
            this.flag=0;
            this.zspeed=this.maxzspeed;
        }
    }
    this.pos[2]+=this.zspeed;
    //this.pos[2]+=this.zspeed;
    if((this.pos[1]>this.ground || this.yspeed>0)&&!this.onTrain)
     this.yspeed+=this.gravity;
    else
        this.yspeed=0;
    this.pos[1]+=this.yspeed;
    this.pos[0]+=this.xspeed;

     if (this.pos[1]<this.ground) {
        this.pos[1]=this.ground;
    }
      if (this.flagy>0) {
        this.flagy+=1;
        if (this.flagy>4) {
            this.flagy=0;
            this.pos[1]-=1;
        }
    }
    this.torso.pos=this.pos;
    this.leg1.pos=[this.torso.pos[0]-0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]];
    this.leg2.pos=[this.torso.pos[0]+0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]];
    this.head.pos=[this.torso.pos[0], this.torso.pos[1]+1/10.0+1/30.0, this.torso.pos[2]];
}
};