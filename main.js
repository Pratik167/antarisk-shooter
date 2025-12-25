import Bullet from "./bullet.js";
import Enemy from "./enemy.js";
import Ship from "./ship.js";

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.style.backgroundImage = "url('space.jpg')";

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let tt=1;

const theme=new Audio("theme.mp3");
const boosTheme= new Audio("bossMusic2.mp3");
// theme.play();

// setInterval(function(){
//   tt=15000;
//   theme.play();
//   },tt);



const score=document.getElementById("score");
const life=document.getElementById("life");
const enemyCount=document.getElementById("enemyCount");
const room=document.getElementById("level");

const ship=new Ship(ctx, canvas);
const bullets=[];

const enemies=[];
let levels=1;
let maxEnemy=0;
let eLeft=maxEnemy;

let isBoss=false;

let count=0;
let lives=5;

enemyCount.textContent="Enemy Left:"+eLeft;
score.textContent="Score:"+count;
life.textContent="Lives:"+lives;
room.textContent="Level:"+levels;

// levl haru 
function level(){
  if(levels%2==0)// image loads in levels+1 so if boss in lvl 10 set 9 
  {
    isBoss=true;
    canvas.style.backgroundImage = "url('bosslevel.png')";
    theme.pause();
    boosTheme.play();
  }
  else{
    isBoss=false;
    boosTheme.pause();
    theme.play();

    canvas.style.backgroundImage = "url('space.jpg')";
  }
maxEnemy=levels*2; // harek level increment ma kati enemy badne
eLeft=maxEnemy;
room.textContent="Level:"+levels;
levels+=1;
enemyCount.textContent="Enemy Left:"+eLeft;
if(isBoss==true)
{
  maxEnemy=1;
  eLeft=maxEnemy;
  enemyCount.textContent="Enemy Left:"+eLeft;
  for(let i=0;i<maxEnemy;i++){
        const e=new Enemy(ctx,canvas);
        e.position.x=Math.floor(Math.random()*(canvas.width-e.size.width));
        e.position.y=Math.floor(Math.random()*-100);
        e.life=5;
        e.speed=0.1;
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(
          e.position.x,
          e.position.y-10,
          5,
          e.size.height-40,
        );
        enemies.push(e);
      }
}
else{

  for(let i=0;i<maxEnemy;i++){
        const e=new Enemy(ctx,canvas);
        e.position.x=Math.floor(Math.random()*(canvas.width-e.size.width));
        e.position.y=Math.floor(Math.random()*-100);
        enemies.push(e);
      }
}
}
level();
  // setInterval(function(){
  //   for(let i=0;i<maxEnemy;i++){
  //     const e=new Enemy(ctx,canvas);
  //     e.position.x=Math.floor(Math.random()*(canvas.width-e.size.width));
  //     e.position.y=Math.floor(Math.random()*-100);
  //     enemies.push(e);
  //   }
  // },5000);


//bullet spawn ra haraunee
function bulletSpawn(){


  for (let i=bullets.length-1;i>=0;i--){ 
    
      if (bullets[i].position.y<10||bullets[i].bulletHit) {
        { 
          bullets.splice(i,1); 
        } 
      }
      else if(!bullets[i].bulletHit){
        for(let j=0;j<enemies.length;j++){
          let enemy=enemies[j];
          if(bullets[i].position.x>=enemy.position.x&&bullets[i].position.x<enemy.position.x+enemy.size.width&&
            bullets[i].position.y>enemy.position.y&&bullets[i].position.y<enemy.position.y+enemy.size.height)
          {
            enemy.healthBar-=25;
            enemy.life--;
            const hitt=new Audio("bomboclat.ogg");
            hitt.play();
            bullets[i].bulletHit=true;
            if(enemy.life==0||enemy.healthBar==0)
            {
              enemy.isBlast=true;
              eLeft--;
              count+=1;
            }
            enemyCount.textContent="Enemy Left:"+eLeft;
            if(eLeft==0)
            {
              level();
            }

            
            score.textContent="Score:"+count;
            console.log("layo");
          }
        }
        bullets[i].draw();
    bullets[i].moveUp(); 
      }
}
}





// gunda aaune ra goli soli lagne
function enemySpawn(){
  for (let i=0;i<enemies.length; i++){
    let enemy=enemies[i];
    // if(isBoss==true)
    // {
    //   // enemy.speed=0.1;
    //   enemy.life=5;
      
    // }
    enemy.update();
    enemy.draw();
    ctx.beginPath();
    if (enemy.position.y>0){
    ctx.fillStyle = "red";
    ctx.fillRect(
    enemy.position.x,
    enemy.position.y-10,
    enemy.healthBar,
    enemy.size.height-40,
  );
}
    if (enemy.position.y>canvas.height||(enemy.position.x<ship.position.x+ship.size.width&&
      enemy.position.x+enemy.size.width>ship.position.x&&
      enemy.position.y<ship.position.y+ship.size.height&&
      enemy.position.y+enemy.size.height>ship.position.y)){
        lives--;
        life.textContent="Lives:"+lives;
        const oof=new Audio("oof.ogg");
       oof.play();
       enemies.splice(i,1);
       eLeft--;
        enemyCount.textContent="Enemy Left:"+eLeft;
        if(eLeft==0)
            {
              level();
            }
      // enemy.position.y=Math.floor(Math.random()*-200);
      // enemy.position.x=Math.floor(Math.random()*(canvas.width-enemy.size.width));
      if(lives<=0)
      {alert("Game Over");
        count=0;
        score.textContent="Score:"+count;
        life.textContent="Lives:"+lives;
        enemies.splice(0,enemies.length);
        lives=2;
        life.textContent="Lives:"+lives;
        maxEnemy=0;
        eLeft=maxEnemy;
        enemyCount.textContent="Enemy Left:"+eLeft;
        levels=0;
        level();
      }
      
    }
    if(enemy.isBlast){
      console.log("moryo");
      enemies.splice(i,1);
      
    }

    
  }
}



// chalne kura
let keys=[];
document.addEventListener("keydown",(event)=>
  {keys[event.key]=true})
function moving(event){
  if (keys["a"]||keys["A"]||keys["ArrowLeft"]){
      ship.moveLeft();
    } 
  if (keys["d"]||keys["D"]||keys["ArrowRight"])
    {
      ship.moveRight();
    } 
    if (keys["w"]||keys["W"]||keys["ArrowUp"])
      {
        ship.moveUp();
    } 
  if (keys["s"]||keys["S"]||keys["ArrowDown"])
    {
      ship.moveDown();
    }
    // if(keys[" "])
    //   {
    //   pellet();
    // } 
};
document.addEventListener("keyup",(event)=>
{keys[event.key]=false})    

document.addEventListener("keyup",(e)=>{
  if(e.key==" ")
  {
    pellet();
  }
})

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




  function gameLoop(){
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    enemySpawn();
    moving();
    bulletSpawn();
    ship.draw();
    
  }
  
  gameLoop();