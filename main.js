Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

  camera = document.getElementById("camera");

  Webcam.attach("#camera")



console.log("ml5.version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eWoLqnsBW/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded OK!");
}


function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "first prediction" + Prediction_1;
    speak_data2 = "second prediction" + Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}


function gotResult(error, results)
{
    if (error) {
     console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;


        if (results[0].label == "Happy"){
            document.getElementById("emoji1").innerHTML = "&#128522";
        }
        if (results[0].label == "Sad"){
            document.getElementById("emoji1").innerHTML = "&#128532";
        }
        if (results[0].label == "Angry"){
            document.getElementById("emoji1").innerHTML = "&#128512";
        }

        if (results[1].label == "Happy"){
            document.getElementById("emoji2").innerHTML = "&#128522";
        }
        if (results[1].label == "Sad"){
            document.getElementById("emoji2").innerHTML = "&#128532";
        }
        if (results[1].label == "Angry"){
            document.getElementById("emoji2").innerHTML = "&#128512";
        }
    }
}


