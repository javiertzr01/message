var i;
console.log(txt);
var speed = 50;

var typingImg = "https://media.tenor.com/inv_IC0z2rgAAAAj/cinnamoroll.gif";
var doneTypingImg = "https://media.tenor.com/nUwoIB3iPdsAAAAj/cinnamoroll-eating.gif"

function typeWriter() {
    if (i < txt.length)
    {
        document.getElementById("txt").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        if (i == txt.length)
        {
            document.getElementById("cinnamoroll").src = doneTypingImg;
        }
    }
    console.log('typeWriter function executed');
}

function runTypeWriter() {
    i = 0;
    txt = getTextAreaInfo();
    clearTextArea();
    typeWriter();
}

function clearTextArea()
{
    document.getElementById("txt").innerHTML = "";
}

function getTextAreaInfo()
{
    return document.getElementById("txt").innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    runTypeWriter();
});

function changeText(idx) {
    // Create a new XMLHttpRequest object
    var xhttp = new XMLHttpRequest();

    // Define the function to be executed on successful data submission
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Parse the response as JSON (assuming the response is a JSON object)
            var response = JSON.parse(this.responseText);

            if (response.answers)
            {
                var answer = response.answers[idx];
                document.getElementById("txt").innerHTML = answer;
                runTypeWriter();
            }
            else
            {
                console.error('Invalid server response format. Missing "answers" property.');
            }
        }
    };

    xhttp.open("GET", "qna.json", true);
    // Send the request
    xhttp.send();
}