object=[];
status="";
video="";
function preload(){
  video=createVideo("video.mp4");
  video.hide();

}
function setup(){
canvas=createCanvas(480,330);
canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status :Detecting objects";
    
}
function gotResult(error,results){
  if(error){
    console.log(error);
  }
  else{
    console.log(results);
    object=results;
  }
}
function modelLoaded(){
    console.log("ModelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0.2);
}
function draw() {
image(video,0,0,480,330); 
if(status!=""){
  objectDetector.detect(video,gotResult);
  for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML="Status :Objects Detected";
    document.getElementById("no_of_objects").innerHTML="Number of objects detected are : "+object.length;

    fill('red');
    percent=floor(object[i].confidence*100);
    text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
    noFill();
    stroke('orange');
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
  }



}
}