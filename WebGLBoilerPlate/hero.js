/// <reference path="webgl.d.ts" />

let hero = class {
    constructor(gl, pos, police) {
        this.rotation = 0;
        this.l=0.2;
        this.w=0.2;
        this.police=police;
        this.h=0.2+2/26.0+2/30.0;
        this.flagy=0;
        this.ground=pos[1];
        this.fly=0;
        this.pos = pos;
        this.zspeed=-0.5;
        this.maxzspeed=-0.5;
        this.maxxspeed=0.5;
        this.yspeed=0;
        this.inityspeed=0.05;
        this.gravity=-0.05/5;
        this.xspeed=0
        this.flag=0;
        this.onboot=0;
        this.test=0;
        this.lives=10;
        this.onTrain=0;
        this.x1=-this.w/2;
        this.x2=this.w/2;
        this.y1=-this.h/2;
        this.y2=this.h/2;
        this.z1=-this.l/2;
        this.grayscale=0;
        this.z2=this.l/2;
        this.score=0;
        this.light=0;
        this.time=0;
        this.faceColors = [
     [1.0,  1.0,  1.0,  1.0],   
    [1.0,  1.0,  0.0,  1.0],    
    [0.0,  0.0,  1.0,  1.0],   
    [0.0,  1.0,  1.0,  1.0],   
    [1.0,  0.0,  0.0,  1.0],   
    [1.0,  0.0,  1.0,  1.0],   

        ];
          this.faceColorsBoots = [
     [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],    
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   
    [Math.random(),  Math.random(),  Math.random(),  Math.random()],   

        ];
        if (this.police) {
            this.faceColors=[[0.18051248869180225, 0.2283298625657868, 0.5467483470272795, 0.44639020016652176], [0.3337951914131473, 0.42016501493770486, 0.10386445771427522, 0.45927065614904583], [0.6248746852004524, 0.44112547231745836, 0.7207707367634765, 0.1615510035272537], [0.5769115310083794, 0.5697148287629078, 0.8359652705194119, 0.6724508270481632], [0.7922287727640749, 0.5289646853756049, 0.4103646185965222, 0.23738489994489353], [0.7473716223423715, 0.682795691892125, 0.8068308809270843, 0.715943191035724]] ;
        }
        this.torso=new cube(gl, [this.pos[0], this.pos[1], this.pos[2]], this.faceColors, 10);
        this.leg1=new cube(gl, [this.torso.pos[0]-0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]], this.faceColors, 26);
        this.leg2=new cube(gl, [this.torso.pos[0]+0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]], this.faceColors, 26);
        this.head=new cube(gl, [this.torso.pos[0], this.torso.pos[1]+1/10.0+1/30.0, this.torso.pos[2]], this.faceColors, 30);
        this.bootleg1=new cube(gl, [this.torso.pos[0]-0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]], this.faceColorsBoots, 26);
        this.bootleg2=new cube(gl, [this.torso.pos[0]+0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]], this.faceColorsBoots, 26);
    }   

    drawHero(gl, projectionMatrix, programInfo, deltaTime) {
        this.torso.drawCube(gl, projectionMatrix, programInfo, deltaTime);
        if (this.onboot>0) {
            this.bootleg1.drawCube(gl, projectionMatrix, programInfo, deltaTime);
            this.bootleg2.drawCube(gl, projectionMatrix, programInfo, deltaTime);
        }
        else{
             this.leg1.drawCube(gl, projectionMatrix, programInfo, deltaTime);
             this.leg2.drawCube(gl, projectionMatrix, programInfo, deltaTime);
        }
        this.head.drawCube(gl, projectionMatrix, programInfo, deltaTime);
}
invertGray()
{
   this.grayscale=1-this.grayscale;
}
tickHero(){
    this.time+=1;
    if (this.flag>0) {
        this.flag+=1;
        this.zspeed=this.maxzspeed/2;
        if (this.flag>10) {
            this.flag=0;
            this.zspeed=this.maxzspeed;
        }
    }
    this.pos[2]+=this.zspeed;
    if (this.onboot>0){
         this.inityspeed=0.1;
         this.onboot-=1;
    }else{
        this.inityspeed=0.05;
    }
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
        hero.pos[1]-=1;
        if (this.flagy>4) {
            this.flagy=0;
            this.pos[1]+=1;
        }
    }
     if (this.fly>0) {
        this.fly-=1;
        this.rotation=-90;
        this.pos[1]=9;
    }else
    this.rotation=0;
    this.torso.pos=this.pos;
    this.leg1.pos=[this.torso.pos[0]-0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]];
    this.leg2.pos=[this.torso.pos[0]+0.1/2, this.torso.pos[1]-1/10.0-1/26.0, this.torso.pos[2]];
    this.head.pos=[this.torso.pos[0], this.torso.pos[1]+1/10.0+1/30.0, this.torso.pos[2]];
    this.bootleg2.pos=this.leg2.pos;
    this.bootleg1.pos=this.leg1.pos;
    this.torso.rotation=this.rotation;
    this.head.rotation=this.rotation;
    this.leg1.rotation=this.rotation;
    this.leg2.rotation=this.rotation;
}
};