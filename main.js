song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
songstatus1= "";
songstatus2= "";
scoreRightWrist=0;
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
        scoreLeftWrist= results[0].pose.keypoint[9].score;
        scoreRightWrist= results[0].pose.keypoint[10].score;
      }
}

function draw(){
    image(video,0,0,600,530);
    fill("#ff0000");
    stroke("#ff0000");
    songstatus1= song1.isPlaying();
    songstatus2= song2.isPlaying();
    if(scoreLeftWrist>0.2){
        if(songstatus2==true){
            song2.stop();
            song1.play();
            songstatus1= song1.isPlaying();
        }
        if(songstatus1==false){
            song1.play();
            songstatus1= song1.isPlaying();
            document.getElementById("songnamehd").innerHTML= song1;
        }
    }
    if(scoreRightWrist>0.2){
        if(songstatus1==true){
            song1.stop();
            song2.play();
            songstatus2= song2.isPlaying();
        }
        if(songstatus2==false){
            song2.play();
            songstatus2= song2.isPlaying();
            document.getElementById("songnamehd").innerHTML= song2;
        }
    }
}