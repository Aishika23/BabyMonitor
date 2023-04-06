img = "";
Status = "";
objects = [];
percent = 0;
r = 0;
g=0;
b=0;
alarm ="";

function preload(){
    alarm = loadSound("sound.mp3");
  }
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocoSSD', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}
function modelLoaded() {
    console.log("Model Loaded");
    Status = true;
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else
    {
        console.log(results);
         objects = results;
    }
}
function draw()
{
    image(video, 0, 0, 640, 420);
    if (Status != "") 
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) 
        {
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,  objects[i].height, objects[i].width);
            if (objects[i].label == "person") {
            alarm.stop();
            document.getElementById("status").innerHTML = "Status: Baby Detected"
            }
            else{

                alarm.play();
                document.getElementById("status").innerHTML = "Status: Baby Not Detected"
            }
        }
    }
    
}