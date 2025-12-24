class Bullet{
  constructor(ctx,canvas,x,y){
    this.ctx=ctx;
    this.canvas=canvas;
    this.position={
      x: x,
      y: y,
    };
    this.size={
      width:20,
      height:20,
    };
    this.speed=2;
    this.bulletHit=false;
    this.image= new Image();
    this.image.src="spaceBullet.png";
  }

 draw(){
    this.ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      );
    
  }

  moveUp(){
    this.position.y-=this.speed;
    if(this.position.y<0)
    {
      this.position.y=0;
    }
  }
  moveDown(){
    this.position.y+=this.speed;
    if(this.position.y>this.canvas.height)
    {
      this.position.y=this.canvas.height;
    }
  }

}

export default Bullet;
