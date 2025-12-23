class Ship{
  constructor(ctx,canvas){
    this.ctx=ctx;
    this.canvas=canvas;
    this.position={
      x: window.innerWidth/2,
      y: window.innerHeight-60,
    };
    this.size={
      width:60,
      height:60,
    };
    this.speed=20;

    this.image= new Image();
    this.image.src="shooterplane2.png";
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
    if(this.position.y+this.size.height>window.innerHeight)
    {
      this.position.y=window.innerHeight-this.size.height;
    }
  }

  moveLeft(){
    this.position.x-=this.speed;
    if(this.position.x<0)
    { 
        this.position.x =0;
    }
    
  }

  moveRight(){
    this.position.x+=this.speed;
    if(this.position.x+this.size.width>window.innerWidth)
    {
      this.position.x=window.innerWidth-this.size.width;
    }
  }
}

export default Ship;
