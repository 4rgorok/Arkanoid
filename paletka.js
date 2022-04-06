class Paletka
{
    constructor(img,ctx)
    {
        this.img=img; //sprite
        this.x=27; //pozycja w sprite
        this.y=1901; 
        this.posX=904; //pozycja na canvasie
        this.posY=920;
        this.dlX=240; //dlugosc 
        this.dlY=80;
        this.ctx=ctx;
        this.prawo=false;
        this.lewo=false;

        this.ctx.globalAlpha = 1;
        this.rysuj();
        
    }
    ruszaj()
    {
        this.ctx.clearRect(this.posX,this.posY,this.dlX,this.dlY); //ruszanie prawo lewo
        if(this.prawo)
        {
           
            this.posX+=10;
            if(this.posX+this.dlX>1460)this.posX=1460-this.dlX;
          
        }
        else if(this.lewo)
        {
           
            this.posX-=10;
            if(this.posX<564)this.posX=564;
            
        }
        this.rysuj();
    }
    rysuj()
    {
        this.ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
    }
    
}
