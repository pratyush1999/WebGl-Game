document.addEventListener('keydown', function (event) { if (event.defaultPrevented) {
        return;
    }var key = event.key; 
    if (key === "ArrowLeft") {
       hero.xspeed=-hero.maxxspeed;
    }
    if (key === 'd') {
       hero.flagy=1;
    }
    if (key=='g') {
      hero.grayscale=1-hero.grayscale;
    }
    if (key === "ArrowRight") {
       hero.xspeed=hero.maxxspeed;
    }
    if (key === " ") {
      if(hero.yspeed<=0)
       hero.yspeed+=hero.inityspeed;
     else hero.yspeed+=hero.inityspeed/4;
    }
    if (key=='s') {
      alert("Score:"+hero.score);
      alert("Lives Remaining:"+hero.lives);
    }
  });
