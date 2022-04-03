song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
   song1= loadSound("music.mp3");
   song2= loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,530);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    posenet= ml5.poseNet(video,ModelLoaded);
    posenet.on('pose',gotPoses);
}
function ModelLoaded(){
    console.log("Model has been loaded");
}
function gotPoses(results){
    if(results.length>0){
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("LeftWristX:- "+leftWristX);
        console.log("RightWristX:- "+ rightWristX);
        console.log("LeftWristY:- "+leftWristY);
        console.log("RightWristY:- "+rightWristY);
      }
}

function draw(){
    image(video,0,0,600,530);
}