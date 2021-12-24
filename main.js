prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
    });

    camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(
    function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'" />';
    }
    );
    }
    
    console.log('ml5 version', ml5.version);

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nQuvFaSgS/model.json',modelLoaded);

    function modelLoaded(){
        console.log('modelLoaded');    
        }
        function speak(){
            var synth=window.speechSynthesis;
            speak_data_1="The Prediction Is"+prediction;
           
            var utterThis=new SpeechSynthesisUtterance(speak_data_1);
            synth.speak(utterThis);
        }
        function check(){
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResult);
        }

             
        

        function gotResult(error, results){
            if(error){
            console.error(error);
            }
            else{
                console.log(results);
                document.getElementById("result_object_name").innerHTML = results[0].label;
                prediction = results[0].label;
               speak();
            
            if(results[0].label=="ok"){
                    toSpeak="ok";
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
            }

            if(prediction=="thumbs up"){
                toSpeak="thumbs up";
                document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
                }

            if(prediction=="peace"){
                    toSpeak="peace"
                    document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
                  
                }
                                  
                        }
            }