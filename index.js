"use strict";

const chalk = require("chalk");
const readline = require("readline");
const PI = Math.PI;
const random = (n,x) => n + Math.random()*(x-n);
const clamp = (v,n,x) => v > x ? x : (v < n ? n : v);
let frame = 0;
const fillscreen = function(){
    let [w,h] = process.stdout.getWindowSize();
    console.clear();
    Array(h).fill("-").forEach(v=>process.stdout.write(v.repeat(w)));
}

const draw = function(){
    frame++;
    let st = Date.now();
    let [w,h] = process.stdout.getWindowSize();
    let o = "";
    for(let y = 0; y < h; y++){
        let e = 0;
        if(y+1 == h) e = 10;
        for(let x = 0; x < w-e; x++){
            let hp = Math.sin(PI * x / w);
            let vp = Math.sin(PI * y / h / 2);

            let nv = clamp(vp/2,0,1) * hp * hp;
            let xv = vp * hp * hp;
            
            let rv = Math.floor(random(nv,xv) * 255);
            let gv = Math.floor(random(nv/2,xv/2) * 128);
            if(gv == 0) gv = 1;
            if(rv == 0) rv = 1;
            let bloco = chalk.bgRgb(rv,gv,0)(" `"[Math.round(hp*(1-vp)*random(0,10)/17)]);
            o += bloco;
        }
    }

    o += ((Date.now() - st)).toFixed(5);
    readline.cursorTo(process.stdout,0,0);
    process.stdout.write(o);
    if(frame > 100) 
        process.exit(0); 
    else 
        setTimeout(draw,1);
};
fillscreen();
// setInterval(draw, 16);
draw();
// setTimeout(function(){process.exit()}, 1000);



