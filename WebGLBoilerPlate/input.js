document.addEventListener('keydown', function (event) { if (event.defaultPrevented) {
        return;
    }var key = event.key; 
    if (key === "ArrowLeft") {
       hero.xspeed=-hero.maxxspeed;
    }
    if (key === 'd') {
       hero.flagy=1;
    }
    if (key === "ArrowRight") {
       hero.xspeed=hero.maxxspeed;
    }
    if (key === " ") {
       hero.yspeed+=hero.inityspeed;
    }
  });
