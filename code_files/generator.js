const colorBloczka='#727a8f';
const colorBloczkaZaznaczonego='#913a0f';
const dlugosc=64;
const wysokosc=32;
var mousePosition = {x: 0, y: 0};
var clicked=false;
var clickedPosition = {x: 0, y: 0};
var pozycjaPrzytrzymania={x: 0, y: 0};
var pozycjaPrzytrzymaniaCanvas ={x:0, y:0};
var ctrl=false;
var clickedForce=false;
var przytrzymanie=false;
var bloczki=[];
var plansza=Array.from(Array(14), () => new Array(20));
var stanPlanszy=[]
var iteratorPlanszy=-1;
var zaznaczenie=-1;
var menuWidoczne=false;
var zamknacMenu=true;
var canvas;
var gra=false;
var image;

var top_shift;
var left_shift;

var canvas_length = 1500;
var canvas_height = 800;

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("menu").onmouseover=function()
    {
        zamknacMenu=false;
    }
    document.getElementById("menu").onmouseleave=function()
    {
        zamknacMenu=true;
    }
    
    

    canvas = document.createElement('canvas'); //tworzenie canvasa
    canvas.className    = "main";
    canvas.width  = canvas_length;
    canvas.height = canvas_height;
    canvas.style.position = "absolute"

    top_shift = (window.innerHeight - canvas_height) / 2
    left_shift = (window.innerWidth - canvas_length) / 2

    canvas.style.top = top_shift + "px";
    canvas.style.left = left_shift + "px";
    document.body.style.backgroundColor = "black"
    document.body.appendChild(canvas);

    canvas.addEventListener('mousemove', event => { //pozycja myszki
        if(!gra)
        {
            if(!menuWidoczne)
            {
                mousePosition=getMousePos(canvas, event);
            } 
        }
        
    }, false);

    canvas.addEventListener('click', event => { //rejestrowanie klikniecia
        //console.log(clickedForce)
        if(!gra)
        {
            if(menuWidoczne&&zamknacMenu)
            {
                var menu=document.getElementById("menu")
                menuWidoczne=false;
                menu.hidden=true;
            }
            else 
            {
                if(!clickedForce)clicked=true;
                else clickedForce=false;
                clickedPosition=getMousePos(canvas, event);
            }
        }
    }, false);
    
    
    

    var ctx = canvas.getContext("2d");
    
    image = new Image(); 
    image.onload = draw; // Draw when image has loaded

    image.src = 'grafiki/sprite4.png';
     
    function draw() {
        var x=40;
        var y=1728;
        var posX=20;
        var posY=50;
        
        ctx.font = "30px Roman MS";
        ctx.fillStyle = "white";
        ctx.fillText('Bloczki', 140, 30);
        ctx.fillText('Plansza', 950, 30);
        for(var i=0;i<5;i++)
        {
            y=1728;
            posY=50;
            
            for(var i2=0;i2<3;i2++)
            {
                var bloczek=new Tile(this,x,y,posX,posY,dlugosc,wysokosc,1,0.4,ctx,-1);
                bloczki.push(bloczek);
                y+=40;
                posY+=40;
            }
            x+=80;
            posX+=80;
        }
        x=500;
        y=50;
        ctx.fillStyle = "#5a635c";
        ctx.globalAlpha=1;
        ctx.fillRect(x, y, 948, 716);
        //ctx.fillStyle = '#34363b';
        var ptemp=Array.from(Array(14), () => new Array(20));
        for(var i=0;i<14;i++)
        {
            y=50;
            for(var i2=0;i2<20;i2++)
            {
                ptemp[i][i2]={x:-1,y:-1};
                
                ctx.fillStyle = "black";
                ctx.globalAlpha=1;
                ctx.fillRect(x, y, dlugosc, wysokosc);

                var bloczek=new Tile(this,-1,-1,x,y,dlugosc,wysokosc,0,1,ctx,colorBloczka);
                plansza[i][i2]=bloczek;
                y+=36;
            }
            x+=68;
        }
        iteratorPlanszy++;
        stanPlanszy.push(ptemp)
        
    }

    function animate()
    {
        if(!gra)
        {
            var pozycja=mousePosition;
            if(pozycja.x>=0&&pozycja.x<450&&pozycja.y>=0&&pozycja.y<200 &&zaznaczenie==-1)
            {
                bloczki.forEach(element => {
                    if(pozycja.x>=element.posX && pozycja.x<element.posX+element.dlX && pozycja.y>=element.posY && pozycja.y<element.posY+element.dlY)
                    {
                        //console.log(pozycja.y,element.y)
                        if(element.op!=1)element.changeOP(1);
                    }
                    else
                    {
                        if(element.op!=0.4)element.changeOP(0.4); 
                    }
                    if(clicked)
                    {
                        if(clickedPosition.x>=element.posX && clickedPosition.x<element.posX+element.dlX && clickedPosition.y>=element.posY && clickedPosition.y<element.posY+element.dlY)
                        {
                            clicked=false;
                            wypelnij(plansza,element.x,element.y);
                        }
                    }
                    
                });
            }
            if(pozycja.x>=200&&pozycja.x<1500&&pozycja.y>=0&&pozycja.y<820)
            {
                plansza.forEach(element1 => {
                    element1.forEach(element => {
                        if(pozycja.x>=element.posX && pozycja.x<element.posX+element.dlX && pozycja.y>=element.posY && pozycja.y<element.posY+element.dlY)
                        {
                            //console.log(pozycja.y,element.y)
                            if(zaznaczenie==-1&&element.op!=0.4)element.changeOP(0.4);
                        }
                        else
                        {
                            if(element.op!=1 && !(element.zaznaczony&&(element.rodzaj==1||element.rodzaj==2)))element.changeOP(1); 
                        }
                        if(clicked)
                        {
                            
                            if(clickedPosition.x>=element.posX && clickedPosition.x<element.posX+element.dlX && clickedPosition.y>=element.posY && clickedPosition.y<element.posY+element.dlY)
                            {
                                if(!ctrl)
                                {
                                    czyscPlansze(plansza);
                                }
                                clicked=false;
                                //console.log(pozycja.y,element.y)
                                if(element.zaznaczony)
                                {
                                    element.zaznaczony=false;
                                    element.changerColor(colorBloczka);
                                    //element.wypelnij();
                                }
                                else
                                {
                                    element.zaznaczony=true;
                                    element.changerColor(colorBloczkaZaznaczonego);
                                    //if(element.rodzaj==1)element.changerColor(colorBloczka);
                                }
                            
                            }
                            
                        }
                    }); 
                });
            }
            
        }
        else
        {
            //console.log(paletka)
            if(paletka!=-1)
            {
                paletka.ruszaj();
                if(!pilka.ruch)pilka.ruszaj();
                else if(!pilka.koniec)
                {
                    if(!pilka.test)pilka.odbijaj();
                }
                //console.log("lol");
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
});
function getMousePos(canvas, evt) { //wspolzedne wzgledem canvasa
    var rect = canvas.getBoundingClientRect();
    return {
        x: parseInt((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: parseInt((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}
function czyscPlansze(plansza)
{
    plansza.forEach(element1 => {
        element1.forEach(element => {
            if(element.color!=colorBloczka)
            {
                element.changerColor(colorBloczka);
                element.zaznaczony=false;
            }

        });
    });
}
function wypelnij(plansza,x,y)
{
    //console.log("lol")
    var zmiana=false;
    plansza.forEach(element1 => {
        element1.forEach(element => {
            if(element.zaznaczony)
            {
                zmiana=true;
                element.zaznaczony=false;
                element.zaznaczonyMasowo=false;
                element.rodzaj=1;
                element.x=x;
                element.y=y;
                element.wypelnij();
            }

        });
    });
    if(zmiana)
    {
        var ptemp=Array.from(Array(14), () => new Array(20));
        for(var i=0;i<14;i++)
        { 
            for(var i2=0;i2<20;i2++)
            {
                ptemp[i][i2]={x:plansza[i][i2].x,y:plansza[i][i2].y};
            }
        }
        stanPlanszy=stanPlanszy.slice(0,iteratorPlanszy+1)
        stanPlanszy.push(ptemp);
        iteratorPlanszy++;
        console.log(stanPlanszy,iteratorPlanszy);
    }
}

function czyscZaznaczone()
{
    plansza.forEach(element1 => {
        element1.forEach(element => {
            if(element.zaznaczonyMasowo)
            {
                //element.zaznaczony=false;
                element.zaznaczonyMasowo=false
                if(!element.zaznaczony)element.changerColor(colorBloczka);
            }

        });
    });

}

function zamalujZaznaczone(x,y,dx,dy)
{
   
    
    x-=500;
    y-=50;
    dx+=x;
    dy+=y;
    x=parseInt(x/68)
    y=parseInt(y/36)
    dx=parseInt(dx/68)
    dy=parseInt(dy/36)
    for(var i=0;i<14;i++)
    {
        for(var i2=0;i2<20;i2++)
        {
            ///console.log(i,i2,x,y);
            if(x<=i&&dx>=i&&y<=i2&&dy>=i2)
            {
                //plansza[i][i2].zaznaczony=true;
                plansza[i][i2].zaznaczonyMasowo=true;
                //console.log(plansza[i][i2].rodzaj)
                //if(plansza[i][i2].rodzaj==1)plansza[i][i2].changeOP(0.4)
                plansza[i][i2].changerColor(colorBloczkaZaznaczonego);
            }
        }
    }
    
}

window.onkeydown=function(e)
{
    //console.log()
    e.preventDefault();
    if(!gra)
    {
        
        //console.log(e.keyCode)
        if (e.keyCode == 17)//DODAC KLAWISZ META
        {
            ctrl=true;
            //console.log("lol") 
        }
        /*if(e.keyCode==NUMER KLAWISZA META) //DODAC KLAWISZ META
        {
            ctrl=true
        } */
        if(e.keyCode == 46)
        {
        delet();
        }
        if(e.keyCode==90&&ctrl &&iteratorPlanszy>0) // do tylu
        {
            ctrlZ();
        }
        if(e.keyCode==89&&ctrl&&iteratorPlanszy<stanPlanszy.length-1) //do przodu
        {
            ctrlY();
        }
        if(e.keyCode==83&&ctrl) //save
        {
            ctrlS();
        }
        if(e.keyCode==76&&ctrl) //load
        {
            ctrlL();
        }
        if(e.keyCode==80&&ctrl)
        {
            graj(canvas,stanPlanszy[iteratorPlanszy],image);
        }
    }
    else
    {
        if(e.keyCode==32&&pilka.test)
        {
            pilka.odbijaj()
        }
    }
    if(e.keyCode==39&&paletka!=-1)
    {
        paletka.prawo=true;
        paletka.lewo=false;
    }
    if(e.keyCode==37&&paletka!=-1)
    {
        paletka.prawo=false;
        paletka.lewo=true;
    }
    if(e.keyCode==32&&pilka!=-1)
    {
        if(pilka.ruch==false)
        {
            pilka.ruch=true;
            /*pilka.prawo=10;
            pilka.gora=-10; */ 
        } 
    }
    

    

}
window.onkeyup=function(e)
{
    if(!gra)
    {
        if(e.keyCode==17) //DODAC KLAWISZ META
        {
            ctrl=false
        }
        /*if(e.keyCode==NUMER KLAWISZA META) //DODAC KLAWISZ META
        {
            ctrl=false
        } */
    }
    if(e.keyCode==39&&paletka!=-1)
    {
        paletka.prawo=false;
       
    }
    if(e.keyCode==37&&paletka!=-1)
    {
        paletka.lewo=false;
    }
}

window.onmousedown=function(e)
{
    
    if(!gra)
    {
        //console.log(e.which)
        e.preventDefault()
        //console.log(mousePosition)
        if(e.which==1)
        {
            if(menuWidoczne&&zamknacMenu)
            {
                var menu=document.getElementById("menu")
                menuWidoczne=false;
                menu.hidden=true;
            }
            else if(mousePosition.x>=500&&mousePosition.x<1450&&mousePosition.y>=50&&mousePosition.y<770)
            {
                if(!ctrl&&!menuWidoczne)czyscPlansze(plansza);
                przytrzymanie=true;
            }
        }
        else if(e.which==3)
        {
            var menu=document.getElementById("menu")
            menuWidoczne=true;
            menu.hidden=false;
        }
    }
}

window.onmouseup=function(e)
{
    if(!gra)
    {
        przytrzymanie=false;
        if(zaznaczenie!=-1)
        {
            zaznaczenie.remove();
            zaznaczenie=-1;
            przytrzymanie=false;
            clickedForce=true;
        }
        plansza.forEach(element1 => {
            element1.forEach(element => {
                if(element.zaznaczonyMasowo)
                {
                    
                    element.zaznaczony=true;
                    element.zaznaczonyMasowo=false
                    if(element.rodzaj==1)element.changeOP(0.4)
                    element.changerColor(colorBloczkaZaznaczonego);
                }

            });
        });
    }
}

window.onmousemove=function(e)
{
    if(!gra)
    {
        if(!menuWidoczne)
        {
            mousePosition=getMousePos(canvas, e);
        } 
        if(zaznaczenie!=-1)
        {
            zaznaczenie.style.left=min(pozycjaPrzytrzymania.x + left_shift, e.clientX )+"px";
            zaznaczenie.style.top=min(pozycjaPrzytrzymania.y + top_shift, e.clientY )+"px";
            console.log(mousePosition)
            zaznaczenie.width=abs(e.clientX-pozycjaPrzytrzymania.x - left_shift);
            zaznaczenie.height=abs(e.clientY-pozycjaPrzytrzymania.y - top_shift);
            //console.log(mousePosition.x+15-pozycjaPrzytrzymania.x,mousePosition.y+15-pozycjaPrzytrzymania.y);
            czyscZaznaczone();
            zamalujZaznaczone(min(pozycjaPrzytrzymania.x,mousePosition.x),min(pozycjaPrzytrzymania.y,mousePosition.y),abs(mousePosition.x-pozycjaPrzytrzymania.x),abs(mousePosition.y-pozycjaPrzytrzymania.y));
        }
        else
        {
            if(przytrzymanie)
            {
                zaznaczenie=document.createElement('canvas');
                zaznaczenie.className="zaznaczenie";
                //console.log(e.clientX,e.clientY);
                zaznaczenie.style.left=(mousePosition.x)+"px";
                zaznaczenie.style.top=(mousePosition.y)+"px";
                zaznaczenie.width=0;
                zaznaczenie.height=0;

                pozycjaPrzytrzymania.x=mousePosition.x//e.clientX ;
                pozycjaPrzytrzymania.y=mousePosition.y//e.clientY ;
                //console.log(zaznaczenie.style.left);
                document.body.appendChild(zaznaczenie);
            }

        }
    }
}

function min(a,b)
{
    if(a>b)return b;
    return a;
}
function abs(a)
{
    if(a<0)a*=-1;
    return a;
}

function delet()
{
    
    var menu=document.getElementById("menu")
    menuWidoczne=false;
    menu.hidden=true;
        
    var zmiana =false;
    plansza.forEach(element1 => {
        element1.forEach(element => {
            if(element.zaznaczony)
            {
                element.zaznaczony=false;
                if(element.rodzaj==1)zmiana = true;
                element.rodzaj=0;
                element.x=-1;
                element.y=-1;
                element.changerColor(colorBloczka);
            }

        });
    });
    if(zmiana)
    {
        var ptemp=Array.from(Array(14), () => new Array(20));
        for(var i=0;i<14;i++)
        { 
            for(var i2=0;i2<20;i2++)
            {
                ptemp[i][i2]={x:plansza[i][i2].x,y:plansza[i][i2].y};
            }
        }
        stanPlanszy=stanPlanszy.slice(0,iteratorPlanszy+1);
        stanPlanszy.push(ptemp);
        iteratorPlanszy++;
        //console.log(stanPlanszy);
    }
}
function ctrlZ()
{
    var menu=document.getElementById("menu")
    menuWidoczne=false;
    menu.hidden=true;
    //console.log("qweqweqweqwe")
    if(iteratorPlanszy>0)
    {
        iteratorPlanszy--;
        //console.log(stanPlanszy[iteratorPlanszy]);
        for(var i=0;i<14;i++)
        { 
            for(var i2=0;i2<20;i2++)
            {
                plansza[i][i2].x=stanPlanszy[iteratorPlanszy][i][i2].x;
                plansza[i][i2].y=stanPlanszy[iteratorPlanszy][i][i2].y;
                
                if(plansza[i][i2].x!=-1)
                {
                    plansza[i][i2].rodzaj=1;
                }
                else plansza[i][i2].rodzaj=0;

                plansza[i][i2].zaznaczony=false;
                plansza[i][i2].zaznaczonyMasowo=false;
                //plansza[i][i2].op=0.4;
                plansza[i][i2].op=0.4;
                plansza[i][i2].changerColor(colorBloczka);
            }
        }
    }
}
function ctrlY()
{
    var menu=document.getElementById("menu")
    menuWidoczne=false;
    menu.hidden=true;
    if(iteratorPlanszy+1<stanPlanszy.length)
    {
        iteratorPlanszy++;
        //console.log(stanPlanszy[iteratorPlanszy]);
        for(var i=0;i<14;i++)
        { 
            for(var i2=0;i2<20;i2++)
            {
                plansza[i][i2].x=stanPlanszy[iteratorPlanszy][i][i2].x;
                plansza[i][i2].y=stanPlanszy[iteratorPlanszy][i][i2].y;
                
                if(plansza[i][i2].x!=-1)
                {
                    plansza[i][i2].rodzaj=1;
                }
                else plansza[i][i2].rodzaj=0;

                plansza[i][i2].zaznaczony=false;
                plansza[i][i2].zaznaczonyMasowo=false;
                //plansza[i][i2].op=0.4;
                plansza[i][i2].op=0.4;
                plansza[i][i2].changerColor(colorBloczka);
            }
        }
    }
}
function ctrlS()
{
    var menu=document.getElementById("menu")
    menuWidoczne=false;
    menu.hidden=true;
    //console.log(stanPlanszy[iteratorPlanszy])
    var data=JSON.stringify(stanPlanszy[iteratorPlanszy])
    var filename="plansza"
    var type="application/json;charset=utf-8"
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function ctrlL()
{
    var menu=document.getElementById("menu")
    menuWidoczne=false;
    menu.hidden=true;
    ctrl=false;
    //console.log("lol")
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
        var file = fileSelector.files[0]
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                var plik=JSON.parse(evt.target.result)
                //console.log(plik)
                iteratorPlanszy++;
                stanPlanszy.push(plik)
                for(var i=0;i<14;i++)
                { 
                    for(var i2=0;i2<20;i2++)
                    {
                        plansza[i][i2].x=stanPlanszy[iteratorPlanszy][i][i2].x;
                        plansza[i][i2].y=stanPlanszy[iteratorPlanszy][i][i2].y;
                        
                        if(plansza[i][i2].x!=-1)
                        {
                            plansza[i][i2].rodzaj=1;
                        }
                        else plansza[i][i2].rodzaj=0;

                        plansza[i][i2].zaznaczony=false;
                        plansza[i][i2].zaznaczonyMasowo=false;
                        //plansza[i][i2].op=0.4;
                        plansza[i][i2].op=0.4;
                        plansza[i][i2].changerColor(colorBloczka);
                    }
                }
            }
        }
    });
    fileSelector.click()
}