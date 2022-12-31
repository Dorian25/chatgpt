var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synthesis = window.speechSynthesis;

recognition.continuous = false; //
recognition.lang = 'fr-FR';
recognition.interimResults = false; //
recognition.maxAlternatives = 1;

recognition.addEventListener("result", (event) => {
    var text = event.results[0][0].transcript;
    input.value = text;
    console.log('Confidence: ' + event.results[0][0].confidence);
});


const input = document.querySelector('#input-user');
const talkBtn = document.querySelector("#talk-btn");

$('#talk-btn').on("click", (event) => {
    recognition.start();
    console.log("recording")
});

/*
Documentation for tonyb's API : https//:justbrowse.io


GET: /api/chatgpt/connect?sessionToken=<token>
 RETURNS: {id: string, status: 'pending'}

GET: /api/chatgpt/status?id=<id>
 RETURNS: {id: string, status: 'pending' | 'failed' | 'ready', reason: string}

POST: /api/chatgpt/chat/:id
 BODY: {message: string, conversationId: string | null, parentId: string | null}
      NOTE: conversationId is optional, if you omit it will start a new conversation
 RETURNS: {id: string, reply: Array<string>, conversationId: string, parentId: string, status: 'pending' | 'failed' | 'ready'}
*/

function connectAPI () {
    $.ajax({
        type: 'GET',
        url: 'https://justbrowse.io/api/chatgpt/connect',
        data: {
            sessionToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..490HrC_vdYe3-QoP.Sc08xBV6DYSvf-Hae6UA1BhgM3hLTUErgckw_uRw4TDWR2xl90dDUiPmwZAkeSXjHw9MWfAcsI1D0KWhpPqs_IiLKDznMCSuE-ZpK-oVeshWOC5Lyrmy8oWlQ6L54q85wIv6MM8HO98eA9gGIjK7J8M0fOHIpRmMzIB9vpRYAFnwBtC1aH37-w_k_qF_rjMmiiLRyLJtYVbTFBU29Zoon6G5GD0lxVeIQLxmTKHPBRSFFQP--UAIGIpZ0Dq8c1j0DxoxjXtPizmfvC_QFEW1y0EVg8LnDOtTme33aqVEW0GMfTVW4waORU0Dqa_fdtZcB5VyHC2JlFij8xSKNi5Lo78RggQKpJGrhfIYlDNaJaiXAGK_G54pnzvpjmplD8JoJd1Hoz9HZ3_8pyhIAMYv5zsC8P2hqQdOhMSlYxmleFV7TRGVOAd3ie8_VI0_Q2Y1ARk336uT45UsatJ_fnu59d7kHtYibhneeTLp5AZG6s8qGokmyG3yynOelco8c4YYIhWiMfctXup4zy0JtFdeyRLTrFbhveivFUZnVwY6rrgsuMWLv2sOav6uqVRLCvYuSPIlJKVZRuiTlH048kXjBfs6SCf-hcD9CkOxPj9Z5JSmTW8yPYvULOaPMWMbOFgUaYHax1uGfy8ZYeaTU65BaRnSk98L--jk1RskZKAPdk13Fco4cdmwNab9jr3eGBWKc5auq51HZEo53MP2uw3ORriA8hoAQF-bly7IhKJp9Ac357OWCDiJRZyeaHWGSJUjn43ezAOFLrnOo1zF_TDrORRX5tiWGIHRLvjtlSbRmm0c1IB4C2jV-hnUaTin8hiFjaSoLUQzRgpnYG3ddZgkqX0KE_qzyTfv_rzSIU0mDi1TijXFvRXXhRXDJRMfuDtzvUaqJ7-AU34lhc1AZZwQ7bEycteCMd9blokGjcmRwTknenz1EWSDPPMqQYP4Q_Wl6gvGO2u0w65J-2jqs9x1fL1x8HTcA97xC1zn9lL_8iQ5Zw1lSeridbXXt-abpTewGN17lxjQGP8Vf4_1xZfG0vIm_0QnmKgAzg5pejV8o3PK1ODVZVGi6AAIgcUHU2jtZt68gxb2oCwVoQuq8lOo0ZsqBmwlj3Ck6r4vuSYZD99Mgpc33FaFxvt9ul84vvo3GrmcLFlva2FfeUNLDq--fTRS6sE71buoqeZWgXmeontr1fTw7kYOsi6iwS-9U9jAeiXhU0kDTelccX35vcL3ZbLU6SkNoS-VxtkaCLxV6GrbLeAGiup_q6JLYHxMxTEFMFfOs5DIxDExj2hcTEUlxXl4Lt8rIx9jPOA1N5tcQGrmd696kLULXjJ_LxbgYNLG-zxmGW6uLC0M-w83pExf6iRwq7dfZWkUzo9aI1BGvgIApkDpxuu8K8rCH5BpBcwiYSJSdZUUFLddpwMqx7hH1OgEzAdTAKhVdlMeCvUD7Tj0N0lKktMQVUeWBFj0k5ZfVYVxmk3amkL8yZFEewZiLkujDb8B8p1tWoMqV0ai1nzA84w9eJyZjgEE9X78vdf5R9IdPuZBoGvk29ZUT8Oh9AsVCWOz8q8qI8FjWFQel1zDqSuB9655Ds1hgdpm940FPE0EV8niIBoBhWHxJrmYWwd9XSDmv0r1C4G1GTkR6K38cn3VND6c0cLApkU8jQFcxMg6HASwGc4UK9oDGJmTn5Z67gmTsmAercKhgo3PauJPfXO4aUwGeal_tVrNqGWL-_2IozhY3iuhIYsEgoDd7eYZBLyRw0TUuEY6WQamhXVsgZftmQOJfWda_wGQVUAx6CixEg-pceGztLjzAho7rW2w3N17uLS2FXdp84lxQiR0Cy5Y9Gi3UXc05HOSua3Zj3sOovXFTWb-FXoOGDDMe05pSUEXTfKNpPX68DaoMaifZn4gmZB54m-D3mNdPuKmmdi-wlnXleF4dKenzON1cf0rW_T9lptcpBduPIpLKS4dAUeCUiqmKpEN3LXxZ2bmJvZ07guHiHCiLd6cKs5GvAGpjtjTnoMHQbFhzNICflwKk5CUg7wnzAX_JAVE5bOqbha8L0JAdUwrZbkrcVoK67-YImWHzK0WXQqTnoGajMiIAdXRdLJgoYNOFDDTm6ZQHvkh_Cv5spEefrY4qXGCk4z-Ph11ETPbIf0geNKIt2AjwSJaofV628JOcY43aDTglCrkMFHWfpr96lJi5T3QmN692BuYOKwGYqy6_Q8cULU4123eQtsg_xq6fB9BYELmfapz-xRtnDDGxjKNC3sdJxGkcSWXJr7cHQnXJ4RR9ocoHU0TIiYWjxDl_AK9AR8iCchCdUZ8Ylqm3dbKYZ0XMMRLqwUyB6stXmpaZ_EgR4SthzGz4ODIa9n8_zARXPaO89RWLck-n3t2VrdkAg.-7NDvZa7d1-MR20ZIVv_pQ'
        },
        headers: {
            'content-type': 'application/json',
            'authorization': "Bearer 0671e8587d1374413a8f94d6adcda7ef5acc6544c5245d22ed3b53ab1160b6609043c7c4ba23835d45ae30e7488b926a"
        },
        success: function(data) {
            console.log(data)
        },
        error: function(xhr, status, error) {
            console.log(xhr);
        }
    });
}


function checkStatusChatGPT() {
    $.ajax({
        type: 'GET',
        url: 'https://justbrowse.io/api/chatgpt/status',
        data: {
            sessionId: 'JrP-Rz8LZES00imT-i9Xe'
        },
        success: function(data) {
            console.log(data["status"])
            if (data['status'] === 'failed') {
                $('#icon-status-circle').css("background-color", "red");
                $('#title-status-txt').css("color", "red");
                $('#title-status-txt').text('Offline');
            } else if (data['status'] === 'ready') {
                $('#icon-status-circle').css("background-color", "green");
                $('#title-status-txt').css("color", "green");
                $('#title-status-txt').text('Online');
            } else {
                $('#icon-status-circle').css("background-color", "orange");
                $('#title-status-txt').css("color", "orange");
                $('#title-status-txt').text('Pending');
            }
            
        },
        error: function(xhr, status, error) {
            $('#icon-status-circle').css("background-color", "red");
            $('#title-status-txt').css("color", "red");
            $('#title-status-txt').text('Offline');
            console.log("checkStatus", xhr);
        }
    });
}
checkStatusChatGPT();

function addWritingMessageBot() {
    return `<div class="msg msg-chatgpt">
                <div class="dot-flashing"></div>
            </div>`;
}

function playMessageNotif(type) {
    if (type == "sent") {
        var audio = new Audio('audio/message_sent.mp3')
    } else {
        var audio = new Audio('audio/message_received.mp3')
    }

    audio.play();
}

function addMessageBot(msg) {
    var html = "<div class='msg msg-chatgpt'>"+
               "<p>"+msg+"</p>"+
               "<p class='msg-time'>"+getCurrentTime()+"</p>"+
               "</div>";
    $('#chat-container').append(html);
}

function addMessageUser(msg) {
    var html = "<div class='msg msg-user'>"+
               "<p>"+msg+"</p>"+
               "<p class='msg-time'>"+getCurrentTime()+"</p>"+
               "</div>";
    $('#chat-container').append(html);
}

function addMessageBotError(msg) {
    var html = "<div class='msg-user-error'>"+
                "<ion-icon name='close-circle-outline' size='small'></ion-icon>"+
                "<p>"+ msg +"</p>"+
                "</div>";
    $('#chat-container').append(html);
}

function preg_replace(pattern, replacement, string) {
    // eslint-disable-line camelcase
    //   original by: rony2k6 (https://github.com/rony2k6)
    //   example 1: preg_replace('/xmas/i', 'Christmas', 'It was the night before Xmas.')
    //   returns 1: "It was the night before Christmas."
    //   example 2: preg_replace('/xmas/ig', 'Christmas', 'xMas: It was the night before Xmas.')
    //   returns 2: "Christmas: It was the night before Christmas."
    //   example 3: preg_replace('\/(\\w+) (\\d+), (\\d+)\/i', '$11,$3', 'April 15, 2003')
    //   returns 3: "April1,2003"
    //   example 4: preg_replace('/[^a-zA-Z0-9]+/', '', 'The Development of code . http://www.')
    //   returns 4: "TheDevelopmentofcodehttpwww"
    //   example 5: preg_replace('/[^A-Za-z0-9_\\s]/', '', 'D"usseldorfer H"auptstrasse')
    //   returns 5: "Dusseldorfer Hauptstrasse"
    let _flag = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1)
    _flag = (_flag !== '') ? _flag : 'g'
    const _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1)
    const regex = new RegExp(_pattern, _flag)
    const result = string.replace(regex, replacement)
    return result
}


function formatMsg(msg) {
    // format code
    new_msg = preg_replace("/\\`\\`\\`([^\\`]+)\\`\\`\\`/", '<code>$1</code>', msg) // 3 apostrophe
    new_msg = preg_replace("/\\`([^\\`]+)\\`/", '<code>$1</code>', msg) // 1 apostrophe

    return msg
}

function getCurrentTime () {
    var now = new Date();
    return now.getHours() + ":" + now.getMinutes();
}

var conversationID = ""

$(document).ready(function() {
    $('#form').on('submit', function(event) {

        //checkStatusChatGPT();

        var inputText = $('#input-user').val();

        addMessageUser(inputText);
        playMessageNotif("sent");

        $('#chat-container').last()[0].scrollIntoView();

        if(conversationID === "") {
            $.ajax({
                type: 'POST',
                url: 'https://justbrowse.io/api/chatgpt/chat/JrP-Rz8LZES00imT-i9Xe',
                data: {message: inputText},
                beforeSend: function(request) {
                    $('#chat-container').append(addWritingMessageBot());
                },
                success: function(data) {
                    console.log(data);
                    var msg = data["reply"][0]
                    conversationID = data["conversationId"]
                    parentID = data["parentId"]
                    msg_formated = formatMsg(msg)
                    console.log(msg_formated)
                    // supprimer le message "Writing"
                    $('#chat-container').children().last().remove();
                    // on ajoute le message reçu
                    addMessageBot(msg_formated)
                    playMessageNotif("received");
                    //const utter = new SpeechSynthesisUtterance(data["reply"][0])
                    //synthesis.speak(utter);
                    $('#chat-container').last()[0].scrollIntoView();
                },
                error: function(xhr, status, error) {
                    // supprimer le message "Writing"
                    $('#chat-container').children().last().remove();
                    addMessageBotError(xhr);
                    console.log(xhr);
                }
            });
        } else {
            $.ajax({
                type: 'POST',
                url: 'https://justbrowse.io/api/chatgpt/chat/JrP-Rz8LZES00imT-i9Xe',
                data: {
                    message: inputText,
                    conversationId: conversationID,    
                    parentId: parentID},
                beforeSend: function(request) {
                    $('#chat-container').append(addWritingMessageBot());
                },
                success: function(data) {
                    console.log(data);
                    var msg = data["reply"][0]
                    msg_formated = formatMsg(msg)
                    console.log(msg_formated)
                    // supprimer le message "Writing"
                    $('#chat-container').children().last().remove();
                    // on ajoute le message reçu
                    addMessageBot(msg_formated)
                    playMessageNotif("received");
                    //const utter = new SpeechSynthesisUtterance(data["reply"][0])
                    //synthesis.speak(utter);
                    $('#chat-container').last()[0].scrollIntoView();
                },
                error: function(xhr, status, error) {
                    // supprimer le message "Writing"
                    $('#chat-container').children().last().remove();
                    addMessageBotError(xhr);
                    console.log(xhr);
                }
            });



        }


        event.preventDefault();
    });
});