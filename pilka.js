class Pilka
{
    constructor(img,ctx)
    {
        this.img=img; //sprite
        this.x=2536; //pozycja w sprite
        this.y=1800; 
        this.posX=1000; //pozycja na canvasie
        this.posY=888;
        this.dlX=32; //dlugosc 
        this.dlY=32;
        this.ctx=ctx;
        this.test=false //czy testowe srodowisko - ruszanie pilki na spacje
        this.speed=16;
        this.angle=Math.PI/4;
        this.dodAngle=Math.PI/4;
        this.prawo=Math.cos(this.angle) * this.speed;
        this.gora=Math.sin(this.angle) * this.speed;
        this.ruch=false;
        this.koniec=false;
        this.ctx.globalAlpha = 1;
        this.rysuj();
        //console.log(this.dodAngle)
        //console.log(Math.cos(Math.PI/2),this.gora)
        
    }
    ruszaj()
    {
        if(paletka.prawo)
        {
            this.ctx.clearRect(this.posX,this.posY,this.dlX,this.dlY); //ruszanie razem z paletka przed rozpoczeciem
            this.posX+=10;
            if(this.posX+this.dlX>1460)this.posX=1460-this.dlX;
            this.rysuj();
        }
        else if(paletka.lewo)
        {
            this.ctx.clearRect(this.posX,this.posY,this.dlX,this.dlY);
            this.posX-=10;
            if(this.posX<564)this.posX=564;
            this.rysuj();
        }
    }
    rysuj()
    {
        this.ctx.drawImage(this.img,this.x,this.y,this.dlX,this.dlY,this.posX,this.posY,this.dlX,this.dlY);
    }
    odbijaj()
    {
        this.sprawdzKolizje() //kolizje z bloczkami
        this.ctx.clearRect(this.posX-1,this.posY-1,this.dlX+2,this.dlY+2); 
        this.posX+=this.prawo;
        this.posY-=this.gora;
        if(this.posX>1460-this.dlX)
        {
            this.posX=1460-this.dlX;
            if(this.gora>0)this.angle=(Math.PI-this.angle)//kąt odbicia = kąt padania
            else this.angle=(Math.PI-this.angle)
            this.prawo = Math.cos(this.angle) * this.speed
            this.gora = Math.sin(this.angle) * this.speed //vector przemieszczenia sie pileczki
            //this.prawo*=-1;
        }
        if(this.posX<564) //to samo co wyzej tylko inna sciana
        {
            this.posX=564;
            //console.log(this.angle)
            if(this.gora<0)this.angle=(Math.PI-this.angle)
            else this.angle=(Math.PI-this.angle)
            this.prawo = Math.cos(this.angle) * this.speed
            this.gora = Math.sin(this.angle) * this.speed
            
        }
        if(this.posY<164)//to samo co wyzej tylko inna sciana
        {
            this.posY=164;
            
            if(this.prawo<0)this.angle=(Math.PI*2-this.angle)
            else this.angle=(Math.PI*2-this.angle)
           
            this.prawo = Math.cos(this.angle) * this.speed
            this.gora = Math.sin(this.angle) * this.speed
        
        }
        if(this.posY>920-this.dlY&&this.posY<944-this.dlY&&paletka.posX-30<=this.posX&&paletka.posX+paletka.dlX>=this.posX-15)
        {
            this.posY=920-this.dlY;
            var odl=(this.posX+(this.dlX/2))-paletka.posX
            console.log(odl)
            var dlu=paletka.dlX
            //console.log(odl,dlu)
            this.angle = ((135-(90/190*odl))*Math.PI)/180//w zaleznosci w ktore miejsce na paletce sie trafi to dostaje sie kąt od 45 w jedną do 45 w drugą
            this.dodAngle=this.angle;
            this.prawo = Math.cos(this.angle) * this.speed
            this.gora = Math.sin(this.angle) * this.speed

        }
        


        //if(this.posX+this.dlX>1460)this.posX=1460-this.dlX;
        this.przerysujBLoczki();
        this.rysuj();
    }
    sprawdzKolizje()
    {
        var tempx=this.posX-564;
        var tempy=this.posY-164;
        tempx=parseInt(tempx/64);
        tempy=parseInt(tempy/32);
        if(tempx>=0&&tempx<14&&tempy>=0&&tempy<20) //sprawdzanie kolizji z czterema rogami po kolei - lewy gorny pilki
        {
            if(planszaGra[tempx][tempy]!=-1)
            {
                planszaGra[tempx][tempy].czysc();
                if(planszaGra[tempx][tempy].posY+planszaGra[tempx][tempy].dlY-this.posY>planszaGra[tempx][tempy].posX+planszaGra[tempx][tempy].dlX-this.posX)
                {
                    this.angle=(Math.PI-this.angle);
                }
                else
                {
                    this.angle=(Math.PI*2-this.angle);
                }
                planszaGra[tempx][tempy]=-1;
                
                this.prawo = Math.cos(this.angle) * this.speed;
                this.gora = Math.sin(this.angle) * this.speed;
                this.przerysujBLoczki();
                return

            }
        }
        tempx=this.posX-564+this.dlX;
        tempy=this.posY-164;
        tempx=parseInt(tempx/64);
        tempy=parseInt(tempy/32);
        if(tempx>=0&&tempx<14&&tempy>=0&&tempy<20)//sprawdzanie kolizji z czterema rogami po kolei - prawy gorny pilki
        {
            if(planszaGra[tempx][tempy]!=-1)
            {
                planszaGra[tempx][tempy].czysc();
                if(planszaGra[tempx][tempy].posY+planszaGra[tempx][tempy].dlY-this.posY>this.posX+this.dlX-planszaGra[tempx][tempy].posX)
                {
                    this.angle=(Math.PI-this.angle);
                }
                else
                {
                    this.angle=(Math.PI*2-this.angle);
                }

                planszaGra[tempx][tempy]=-1; 
                //this.angle=(Math.PI*2-this.angle);
                this.prawo = Math.cos(this.angle) * this.speed;
                this.gora = Math.sin(this.angle) * this.speed;
                this.przerysujBLoczki();
                return
            }
        }

        tempx=this.posX-564+this.dlX;
        tempy=this.posY-164+this.dlY;
        tempx=parseInt(tempx/64);
        tempy=parseInt(tempy/32);
        if(tempx>=0&&tempx<14&&tempy>=0&&tempy<20)//sprawdzanie kolizji z czterema rogami po kolei - prawy dolny pilki
        {
            if(planszaGra[tempx][tempy]!=-1)
            {
                planszaGra[tempx][tempy].czysc();
                if(this.posY+this.dlY-planszaGra[tempx][tempy].posY>this.posX+this.dlX-planszaGra[tempx][tempy].posX)
                {
                    this.angle=(Math.PI-this.angle);
                }
                else
                {
                    this.angle=(Math.PI*2-this.angle);
                }
                planszaGra[tempx][tempy]=-1; 
                //this.angle=(Math.PI*2-this.angle);
                this.prawo = Math.cos(this.angle) * this.speed;
                this.gora = Math.sin(this.angle) * this.speed;
                this.przerysujBLoczki();
                return
            }
        }
        tempx=this.posX-564;
        tempy=this.posY-164+this.dlY;
        tempx=parseInt(tempx/64);
        tempy=parseInt(tempy/32);
        if(tempx>=0&&tempx<14&&tempy>=0&&tempy<20) //sprawdzanie kolizji z czterema rogami po kolei - lewy dolny pilki
        {
            if(planszaGra[tempx][tempy]!=-1)
            {
                planszaGra[tempx][tempy].czysc();
                if(this.posY+this.dlY-planszaGra[tempx][tempy].posY>planszaGra[tempx][tempy].posX+planszaGra[tempx][tempy].dlX-this.posX)
                {
                    this.angle=(Math.PI-this.angle);
                }
                else
                {
                    this.angle=(Math.PI*2-this.angle);
                }
                planszaGra[tempx][tempy]=-1; 
                //this.angle=(Math.PI*2-this.angle);
                this.prawo = Math.cos(this.angle) * this.speed;
                this.gora = Math.sin(this.angle) * this.speed;
                this.przerysujBLoczki();
                return
            }
        }
        
    }
    przerysujBLoczki() //czasem pilka slad na innym zostawi i trzeba je przerysowac
    {
        this.ctx.clearRect(564,164,64*14,32*22);
        for(var i=0;i<14;i++)
        {
            for(var i2=0;i2<20;i2++)
            {
                if(planszaGra[i][i2]!=-1)
                {
                    planszaGra[i][i2].rysujCien();
                    planszaGra[i][i2].rysuj();
                }
            }
        }
    }
    
}
