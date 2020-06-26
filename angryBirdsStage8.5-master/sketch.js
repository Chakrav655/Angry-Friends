const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var posc = 250;

var engine, world;
var box1, pig1,pig2,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg ;


var gameState = "onSling";
var score = 0;

function preload() {
     bg = loadImage("sprites/bg1.png");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    engine = Engine.create();
    world = engine.world;



    ground = new Ground(windowWidth/2,height,windowWidth,20);
    platform = new Ground(150, 659,300, 600);

    box1 = new Box(700+posc,320+posc,70,70);
    box2 = new Box(920+posc,320+posc,70,70);
    pig1 = new Pig(810+posc, 350+posc);
    pig2 = new Pig(88-+posc, 490+posc);
    log1 = new Log(810+posc,260+posc,300, PI/2);

    box3 = new Box(700+posc,240+posc,70,70);
    box4 = new Box(920+posc,240+posc,70,70);
    pig3 = new Pig(810+posc, 220+posc);

    log3 =  new Log(810+posc,180+posc,300, PI/2);

    box5 = new Box(810+posc,160+posc,70,70);
    log4 = new Log(760+posc,120+posc,150, PI/7);
    log5 = new Log(870+posc,120+posc,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:160});
}

function draw(){
   // if(backgroundImg)
        background(bg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<1){
       gameState="onSling";  
       bird.trajectory=[];
       Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
       slingshot.attach(bird.body);
    }
}

