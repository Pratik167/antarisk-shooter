import Bullet from "./bullet.js";
import Enemy from "./enemy.js";
import Ship from "./ship.js";

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const score=document.getElementById("score");
const life=document.getElementById("life");

const ship=new Ship(ctx, canvas);
const bullets=[];

const enemies=[];
const maxEnemy=3;

let count=0;
let lives=5;

score.textContent="Score:"+count;
life.textContent="Lives:"+lives;



  // for (let i=0;i<maxEnemy;i++){
  //   const e=new Enemy(ctx,canvas);
  //   e.position.x=Math.floor(Math.random()*(canvas.width-e.size.width));
  //   e.position.y=Math.floor(Math.random()*-200);
  //   enemies.push(e);
  // }



  setInterval(function(){
    for(let i=0;i<maxEnemy;i++){
      const e=new Enemy(ctx,canvas);
      e.position.x=Math.floor(Math.random()*(canvas.width-e.size.width));
      e.position.y=Math.floor(Math.random()*-200);
      enemies.push(e);
    }
  },5000);



//bullet spawn ra haraunee
function bulletSpawn(){
  let bulletHit=false;

  for (let i=bullets.length-1;i>=0;i--){ 
    
      if (bullets[i].position.y<10||bulletHit) {
        { 
          bullets.splice(i,1); 
        } 
      }
      else if(!bulletHit){
        for(let j=0;j<enemies.length;j++){
          let enemy=enemies[j];
          if(bullets[i].position.x>=enemy.position.x&&bullets[i].position.x<enemy.position.x+enemy.size.width&&
            bullets[i].position.y>enemy.position.y&&bullets[i].position.y<enemy.position.y+enemy.size.height)
          {
            const hitt=new Audio("bomboclat.ogg");
            hitt.play();
            bulletHit=true;
            enemy.isBlast=true;
            

            count+=1;
            score.textContent="Score:"+count;
            console.log("layo");
          }
        }
        bullets[i].draw();
    bullets[i].moveUp(); 
      }
}
}



function gameLoop(){
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  enemySpawn();
  bulletSpawn();
  
  ship.draw();
}

gameLoop();


// gunda aaune ra goli soli lagne
function enemySpawn(){
  for (let i=0;i<enemies.length; i++){
    let enemy=enemies[i];
    enemy.update();
    enemy.draw();
    if (enemy.position.y>canvas.height||(enemy.position.x<ship.position.x+ship.size.width&&
      enemy.position.x+enemy.size.width>ship.position.x&&
      enemy.position.y<ship.position.y+ship.size.height&&
      enemy.position.y+enemy.size.height>ship.position.y)){
      lives--;
      life.textContent="Lives:"+lives;
      enemies.splice(i,1);
      // enemy.position.y=Math.floor(Math.random()*-200);
      // enemy.position.x=Math.floor(Math.random()*(canvas.width-enemy.size.width));
      if(lives==0)
      {
        count=0;
        score.textContent="Score:"+count;
        life.textContent="Lives:"+lives;
        alert("Game Over");
        enemies.splice(0,enemies.length);
        lives=5;
        life.textContent="Lives:"+lives;
      }
      
    }
    if(enemy.isBlast){
      console.log("moryo");
      enemies.splice(i,1);
      // const blastImage = new Image();
      // blastImage.src = "blast.png";
      // ctx.drawImage(blastImage,enemy.position.x,enemy.position.y,enemy.size.width,enemy.size.height);
      // enemy.position.y=Math.floor(Math.random()*-200);
      // enemy.position.x=Math.floor(Math.random()*(canvas.width-enemy.size.width));

    }

    
  }
}



// chalne kura
document.addEventListener("keydown",(event)=>{
  if (event.key=="a"||event.key=="A"||event.key=="ArrowLeft")
    {
      ship.moveLeft();
    } 
  if (event.key=="d"||event.key=="D"||event.key=="ArrowRight")
    {
      ship.moveRight();
    } 
  if (event.key=="w"||event.key=="W"||event.key=="ArrowUp")
    {
      ship.moveUp();
    } 
  if (event.key=="s"||event.key=="S"||event.key=="ArrowDown")
    {
      ship.moveDown();
    }
    if(event.key==" ")
    {
      pellet();
    } 
});


//click garda bullter aauxa
function pellet(){
  const fire=new Audio("pellet.ogg");
  fire.play();

  const newBullet=new Bullet(ctx,canvas,
    ship.position.x+(ship.size.width/2)-10,
    ship.position.y-10
  );

  bullets.push(newBullet);
}

document.addEventListener("click", pellet);



setInterval(function(){
    const theme=new Audio("themesong.ogg");
  theme.play();
  },2200);