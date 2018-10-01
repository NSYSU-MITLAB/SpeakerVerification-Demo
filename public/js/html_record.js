function __log(e, data) {
    log.innerHTML += e + " " + (data || '') + "<br>";
}
function __clearLog(e){
    log.innerHTML = "";
}
function __result(e, data){
    result.innerHTML = e + " " + (data || '');
}

var audio_context;
var recorder;
function startUserMedia(stream) {
var input = audio_context.createMediaStreamSource(stream);
__log('Media stream created.');
// Uncomment if you want the audio to feedback directly
//input.connect(audio_context.destination);
//__log('Input connected to audio context destination.');

recorder = new Recorder(input, {numChannels:1});
    __log("Recorder initialised.");
}
function startRecording(button) {
    __clearLog();
    recorder && recorder.record();
    button.disabled = true;
    button.nextElementSibling.disabled = false;
    __log("Recording...");
}
function stopRecording(button) {
    __clearLog();
    recorder && recorder.stop();
    button.disabled = true;
    button.previousElementSibling.disabled = false;
    __log("Stopped recording.");

    // create WAV download link using audio data blob
    createDownloadLink();

    recorder.clear();
}
function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    var li = document.createElement('div');
    var au = document.createElement('audio');
    var hf = document.createElement('a');

    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + '.wav';
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);

    var filename = new Date().toISOString(); //filename to send to server without extension
    //upload link
    var upload = document.createElement('a');
    upload.href="javascript:viod(0)";
    upload.innerHTML = "Verification";
    upload.addEventListener("click", function(event){
        __clearLog();
        __result('');
        __log("Verifying...");
        var xhr=new XMLHttpRequest();
        xhr.onload=function(e) {
            if(this.readyState === 4) {
                console.log("Server returned: ",e.target.responseText);
            }
        };
        var fd=new FormData();
        fd.append("audio_data",blob, filename);
        xhr.open("POST","https://su-yu.rainvisitor.me/upload.php",true);
        xhr.send(fd);
        xhr.onload = function(){
            __clearLog();
            __result(xhr.responseText);
        };
    })
    li.appendChild(document.createTextNode (" "))//add a space in between
    li.appendChild(upload)//add the upload link to li

    recordingslist.appendChild(li);
    });
}
window.onload = function init() {
    try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    __log('Audio context set up.');
    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
    alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    __log('No live audio input: ' + e);
    });
};
