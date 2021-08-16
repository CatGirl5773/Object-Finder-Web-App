objects = [];
status = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResult);
        for(var i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);
            fill("#FF0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == value) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = "Object mentioned found";
                synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance("Object mentioned found");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_found").innerHTML = "Object mentioned not found";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    value = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
