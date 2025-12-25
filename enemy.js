class Enemy {
  constructor(ctx) {
    
    this.ctx = ctx;
    this.position = {
      x:60,
      y:60,
    };

    this.size = {
      width:50,
      height:50,
    };
    this.life=2;
    this.healthBar=this.life*25;
    this.color = "black";
    this.speed = 0.5;
    this.direction = {
    x:1,
    y:1,
    }
    this.isBlast=false;
    this.image= new Image();
    this.image.src="enemy.png";
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
    );
    


  }
  
  update(){
    this.position.y=this.position.y+this.speed*this.direction.y; 
  }
}
export default Enemy;

