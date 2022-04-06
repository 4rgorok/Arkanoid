var paletka=-1;
var pilka=-1;
var planszaGra=Array.from(Array(14), () => new Array(20));
function graj(canvas,stan,img)
{
    gra=true;
    canvas.height=1100;
    canvas.width=2000
    canvas.style.left = "15px"
    canvas.style.top = "15px"
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img,2048,2048,1024,920,500,100,1024,920); //rysowanie tla
    ctx.drawImage(img,1024,104,64,920,500,100,64,920); //rysowanie obramowki lewej
    ctx.drawImage(img,1984,104,64,920,1460,100,64,920); //prawej
    ctx.drawImage(img,1024,104,1024,64,500,100,1024,64); //góra
    ctx.globalAlpha = 0.5;
    ctx.color="black";
    ctx.fillRect(564, 164, 32, 904); //cienie lewej
    ctx.fillRect(596, 164, 864, 32); //cienie góry
    ctx.globalAlpha = 1;
    
    var foreground = document.createElement('canvas'); //tworzenie canvasa
    foreground.className  = "front";
    foreground.width  = 2000;
    foreground.height = 1100;
    document.body.appendChild(foreground);
    const ctxF=foreground.getContext('2d');
    var x=564;
    var y=164;
    for(var i=0;i<14;i++)
    {
        y=164
        for(var i2=0;i2<20;i2++)
        {
            if(stan[i][i2].x!=-1)
            {
                planszaGra[i][i2]=new Tile(img,stan[i][i2].x,stan[i][i2].y,x,y,64,32,2,1,ctxF,-1) //rysowanie zaladownej mapy
                //ctxF.drawImage(img,stan[i][i2].x,stan[i][i2].y,64,32,x,y,64,32);
            }
            else
            {
                planszaGra[i][i2]=-1
            }
            y+=32;
        }
        x+=64;
    }
    //console.log(planszaGra)
    paletka=new Paletka(img,ctxF);
    pilka=new Pilka(img,ctxF);
}
