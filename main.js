video="";
objects = [];

function preload(){
video = createVideo('video.mp4');
video.hide();
}
function setup(){
canvas = createCanvas(480, 380);
canvas.center();
}
function draw(){
image(video, 0, 0, 480, 380);
if (status != ""){
    objectDetector.detect(video, gotResult);
    for(l=0; l<objects.length;l++){
        document.getElementById("status").innerHTML="Status: Objects Detected";
        document.getElementById("number_of_objects").innerHTML="The Number of Objects Detected are:"+objects.length;
        fill("#FF0000");
        percent = floor(objects[l].confidence * 100);
        text(objects[l].label+" "+percent+ "%", objects[l].x+15, objects[l].y+15); 
        noFill();
        stroke("#FF0000");
        rect(objects[l].x, objects[l].y, objects[l].width ,objects[l].height);
    }
}

}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}