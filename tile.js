class Tile
{
    constructor(img, x,y,posX,posY,dlX,dlY,rodzaj,op,ctx,color)
    {
        this.img=img; //sprite
        this.x=x; //pozycja w sprite
        this.y=y; 
        this.posX=posX; //pozycja na canvasie
        this.posY=posY;
        this.dlX=dlX; //dlugosc 
        this.dlY=dlY;
        this.rodzaj=rodzaj;  //0 - pusty prostokat, 1 - rysowany ze sprite,  3 - grywalny bloczek
        this.op=op; //opacity
        this.zaznaczonyMasowo=false;
        this.ctx=ctx;
        this.color=color
        this.zaznaczony=false;
        
        ctx.globalAlpha = op;
        if(rodzaj==2)this.rysujCien()
        if(rodzaj == 1 ||rodzaj==2)ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
        else if(rodzaj == 0)
        {
        
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.posX, this.posY, this.dlX, this.dlY);
        }
    }
    changeOP(op)
    {
        this.ctx.clearRect(this.posX,this.posY,this.dlX,this.dlY);
        this.ctx.globalAlpha = op;
        this.op=op;
        if(this.rodzaj == 1 )this.ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
        else if(this.rodzaj ==0 )
        {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.posX, this.posY, this.dlX, this.dlY);
        }
    }
    changerColor(color)
    {
        this.ctx.globalAlpha = this.op;
        
        this.color=color;
        this.ctx.fillStyle = this.color;
        if(this.rodzaj==0)this.ctx.fillRect(this.posX, this.posY, this.dlX, this.dlY);
        else if(this.rodzaj==1)
        {
            if(color==colorBloczkaZaznaczonego)this.ctx.globalAlpha = 0.4;
            else this.ctx.globalAlpha = 1;
            this.ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
            //this.ctx.fillRect(this.posX, this.posY, this.dlX, this.dlY);
        }
    }
    wypelnij()
    {
        //this.ctx.clearRect(this.posX,this.posY,this.dlX,this.dlY);
        if(this.rodzaj==1)
        {
            console.log(this.x,this.y)
            this.ctx.globalAlpha = 1;
            this.ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
        }
       
    }
    czysc()
    {
        this.ctx.clearRect(this.posX,this.posY,this.dlX,this.dlY);
    }
    rysuj()
    {
        this.ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
    }
    rysujCien()
    {
        
        this.ctx.globalAlpha = 0.5;
        if(this.posX<1396)this.ctx.fillRect(this.posX+this.dlX/2, this.posY+this.dlY, this.dlX, this.dlY);
        else this.ctx.fillRect(this.posX+this.dlX/2, this.posY+this.dlY, this.dlX/2, this.dlY);
        this.ctx.globalAlpha = 1;
    }
}
