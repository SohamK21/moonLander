var bg, landerIMG, lander;
var g = 0.05;
var vX = 0, vY= 0;
var fuel = 100;
var RCS_left, RCS_right, thrust;
var crash, landing;
var obstacle, obstacleIMG;
var lz, lzIMG;


function preload(){
    bg = loadImage("bg_1.png")
    landerIMG = loadImage("moonLander.png")

    thrust = loadAnimation("b_thrust_1.png", "b_thrust_2.png", "b_thrust_3.png");
    RCS_left = loadAnimation("left_thruster_1.png", "left_thruster_2.png");
    RCS_right = loadAnimation("right_thruster_1.png", "right_thruster_2.png");
    crash= loadAnimation("crash1.png","crash2.png","crash3.png");
    landing= loadAnimation("landing1.png", "landing2.png", "landing_3.png");
    obstacleIMG= loadImage("obstacle.png");
    lzIMG= loadImage("lz.png")

    thrust.playing= true;
    thrust.looping= false;
    RCS_left.looping= false;
    RCS_right.looping= false;

}


function setup(){
    createCanvas(1000,700);

    frameRate(50);

    timer= 1500;
    thrust.frameDelay= 5;
    RCS_left.frameDelay= 5;
    RCS_right.frameDelay= 5;

    lander= createSprite(100,50, 30, 30)
    lander.addImage(landerIMG);
    lander.scale = 0.1;

    obstacle= createSprite(320,530,50,100)
    obstacle.addImage(obstacleIMG)
    obstacle.scale= 0.5;
    obstacle.setCollider("rectangle", 0,100, 300, 300)
    obstacle.debug=false;

    lz= createSprite(880, 610, 50,30);
    lz.addImage(lzIMG);
    lz.scale= 0.3;

    
    lander.addAnimation('thrusting', thrust);
    lander.addAnimation('left', RCS_left);
    lander.addAnimation('right', RCS_right);
    lander.addAnimation('lander', landerIMG);
    lander.addAnimation('crashing', crash);

    ground=createSprite(500,690, 1000,20);

    rectMode(CENTER);
    textSize(15);

}


function draw(){
    //background(bg);
    image(bg, 0,0 )

        push();
        fill (255);
        text("Vertical Velocity "+ round(vY), 800, 75);
        text("Horizontal Velocity "+ round(vX,2), 800, 50);
        text("Fuel " +fuel, 800, 25);
        pop();


        vY += g;
        lander.position.y += vY;
        lander.position.x += vX;

        if(lander.collide(obstacle)==true){
            lander.changeAnimation('crashing');
            stop();
        }

        var d= dist(lander.position.x, lander.position.y, lz.position.x, lz.position.y)
        if(d<=35 && (vY<2 && vY>-2) && (vX<2 && vX>-2)){
            vX=0;
            vY=0;
            g=0;
            lander.changeAnimation('lander')
        }
        if(lander.collide(ground) == true){
            lander.changeAnimation('crashing');
            vX=0;
            vY=0;
            g=0;
        }

    drawSprites();
}

function keyPressed(){

    if(keyCode == UP_ARROW && fuel>0)
    {
        upward_thrust();
        lander.changeAnimation('thrusting');
        thrust.nextFrame();
    
    }
    if(keyCode == LEFT_ARROW && fuel>0)
    {
        left_thrust();
        lander.changeAnimation('left');
    }
    if(keyCode == RIGHT_ARROW && fuel>0)
    {
        right_thrust();
        lander.changeAnimation('right');
    }




}

function upward_thrust()
{
    vY=-1;
    fuel -= 1;
}
function left_thrust()
{
    vX -= 0.2;
    fuel -= 1;
}
function right_thrust()
{
    vX += 0.2;
    fuel -= 1;
}
function stop(){

    vX=0;
    vY=0;
    fuel=0;
    g=0;

}


