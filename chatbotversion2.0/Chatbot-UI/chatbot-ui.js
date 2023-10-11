/*
Makes backend API call to rasa chatbot and display output to chatbot frontend
*/

function init() {
  //---------------------------- Including Jquery ------------------------------

  var script = document.createElement("script");
  script.src =
    "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);

  //--------------------------- Important Variables----------------------------
  botLogoPath = "./imgs/chatbot_logo.png";

  //--------------------------- Chatbot Frontend -------------------------------
  const chatContainer = document.getElementById("chat-container");
  var words = ["Hi, I am CU Sevak!", "How may I help you ?"],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
  var wordflick = function () {
    setInterval(function () {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      $(".word").text(part);
    }, speed);
  };

  template = ` 
                 
                     <button class="chat-btn-message word">How may I help you ?<br /> 
                     <span class="professor">CU-SEVAK</span></button>
                     <button class="triangle"></button>
                     <button class='chat-btn floating'>
                     <img src = "./imgs/chat_bot_float.png" class = "icon" >
                     </button>
                            
  
          
  
      <div class='chat-popup'>
      
          <div class='chat-header'>
             
              <h3 class='bot-title'>CU Sevak </h3>
              
              <!--<div class="circle"></div>-->
              <i class="fa fa-times-circle close" aria-hidden="true" ></i>
          </div>
  
          <div class='chat-area'>
          <div class='bot-msg-2'>
          
                  <iframe class="introvideo" width="85%" height="170" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" src="https://www.youtube.com/embed/xfzuZDPLwaA" allowfullscreen></iframe>
                  <iframe class="introvideo" width="85%" height="170" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" src="https://www.youtube.com/embed/uDfGm-MYjO0" allowfullscreen></iframe>
               </div>
              <div class='bot-msg'>
                <div class="bot-msg-1">
                  <img class='bot-img' src ='${botLogoPath}' />
                  <span class='msg'>Hello, How may i help you?</span>
                </div>
              </div>
              
               <!-- <div class='bot-msg'>
                  <img class='bot-img' src ='${botLogoPath}' />
                  <div class='response-btns'>
                      <button class='btn-primary' onclick= 'userResponseBtn(this)' value='/sign_in'>sample btn</button>            
                  </div>
              </div> -->
  
              <!-- <div class='bot-msg'>
                  <img class='msg-image' src = "https://i.imgur.com/nGF1K8f.jpg" />
              </div> -->
  
              <!-- <div class='user-msg'>
                  <span class='msg'>Hello, How may i help you?</span>
              </div> -->
              
  
          </div>
  
  
          <div class='chat-input-area'>
        
              <input type='text' autofocus class='chat-input' onkeypress='return givenUserInput(event)' placeholder='Type a message...' autocomplete='off'>
              <button class='chat-submit'>Send</button>
          </div>
  
    
      </div>`;

  chatContainer.innerHTML = template;
  wordflick();
  //--------------------------- Important Variables----------------------------
  var inactiveMessage =
    "Server is down, Please contact the developer to activate it";

  chatPopup = document.querySelector(".chat-popup");
  chatBtnMessage = document.querySelector(".chat-btn-message");
  triangle = document.querySelector(".triangle");
  chatBtn = document.querySelector(".chat-btn");
  closeBtn = document.querySelector(".close");
  chatSubmit = document.querySelector(".chat-submit");
  chatHeader = document.querySelector(".chat-header");
  chatArea = document.querySelector(".chat-area");
  chatInput = document.querySelector(".chat-input");
  expandWindow = document.querySelector(".expand-chat-window");
  root = document.documentElement;
  chatPopup.style.display = "none";
  chatBtnMessage.style.display = "block";
  triangle.style.display = "block";
  var host = "";

  //------------------------ ChatBot Toggler -------------------------

  chatBtn.addEventListener("click", () => {
    mobileDevice = !detectMob();
    if (
      chatPopup.style.display == "none" &&
      chatBtnMessage.style.display == "block" &&
      triangle.style.display == "block" &&
      mobileDevice
    ) {
      chatPopup.style.display = "flex";
      chatBtnMessage.style.display = "none";
      triangle.style.display = "none";
      chatInput.focus();
      chatBtn.innerHTML = `<img src = "./imgs/chat_bot_float.png" class = "icon" >`;
    } else if (mobileDevice) {
      chatPopup.style.display = "none";
      chatBtnMessage.style.display = "block";
      triangle.style.display = "block";
      chatBtn.innerHTML = `<img src = "./imgs/chat_bot_float.png" class = "icon" >`;
    } else {
      mobileView();
    }
  });
  closeBtn.addEventListener("click", () => {
    mobileDevice = !detectMob();
    if (
      chatPopup.style.display == "none" &&
      chatBtnMessage.style.display == "block" &&
      triangle.style.display == "block" &&
      mobileDevice
    ) {
      chatPopup.style.display = "flex";
      chatBtnMessage.style.display = "none";
      triangle.style.display = "none";
      chatInput.focus();
      chatBtn.innerHTML = `<img src = "./imgs/chat_bot_float.png" class = "icon" >`;
    } else if (mobileDevice) {
      chatPopup.style.display = "none";
      chatBtnMessage.style.display = "block";
      triangle.style.display = "block";
      chatBtn.innerHTML = `<img src = "./imgs/chat_bot_float.png" class = "icon" >`;
    } else {
      mobileView();
    }
  });
  chatSubmit.addEventListener("click", () => {
    let userResponse = chatInput.value.trim();
    if (userResponse !== "") {
      setUserResponse();
      send(userResponse);
    }
  });

  expandWindow.addEventListener("click", (e) => {
    // console.log(expandWindow.innerHTML)
    if (
      expandWindow.innerHTML ==
      '<img src="./icons/open_fullscreen.png" class="icon">'
    ) {
      expandWindow.innerHTML = `<img src = "./icons/close_fullscreen.png" class = 'icon'>`;
      root.style.setProperty("--chat-window-height", 80 + "%");
      root.style.setProperty("--chat-window-total-width", 85 + "%");
    } else if (
      expandWindow.innerHTML == '<img src="./icons/close.png" class="icon">'
    ) {
      chatPopup.style.display = "none";
      chatBtn.style.display = "block";
    } else {
      expandWindow.innerHTML = `<img src = "./icons/open_fullscreen.png" class = "icon" >`;
      root.style.setProperty("--chat-window-height", 500 + "px");
      root.style.setProperty("--chat-window-total-width", 380 + "px");
    }
  });
}

// end of init function

var passwordInput = false;

function userResponseBtn(e) {
  send(e.value);
}

// to submit user input when he presses enter
function givenUserInput(e) {
  if (e.keyCode == 13) {
    let userResponse = chatInput.value.trim();
    if (userResponse !== "") {
      setUserResponse();
      send(userResponse);
    }
  }
}

// to display user message on UI
function setUserResponse() {
  let userInput = chatInput.value;
  if (passwordInput) {
    userInput = "******";
  }
  if (userInput) {
    let temp = `<div class="user-msg"><span class = "msg">${userInput}</span></div>`;
    chatArea.innerHTML += temp;
    chatInput.value = "";
  } else {
    chatInput.disabled = false;
  }
  scrollToBottomOfResults();
}

function scrollToBottomOfResults() {
  chatArea.scrollTop = chatArea.scrollHeight;
}

/***************************************************************
  Frontend Part Completed
  ****************************************************************/

// host = 'http://localhost:5005/webhooks/rest/webhook'
function send(message) {
  chatInput.type = "text";
  passwordInput = false;
  chatInput.focus();
  console.log("User Message:", message);
  $.ajax({
    url: host,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      message: message,
      sender: "User",
    }),
    success: function (data, textStatus) {
      if (data != null) {
        setBotResponse(data);
      }
      console.log("Rasa Response: ", data, "\n Status:", textStatus);
    },
    error: function (errorMessage) {
      setBotResponse("");
      console.log("Error" + errorMessage);
    },
  });
  chatInput.focus();
}

function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '" target="_blank">' + url + "</a>";
  });
}
//------------------------------------ Set bot response -------------------------------------

function setBotResponse(val) {
  setTimeout(function () {
    if (val.length < 1) {
      //if there is no response from Rasa
      // msg = 'I couldn\'t get that. Let\' try something else!';
      msg = inactiveMessage;

      var BotResponse = `<div class='bot-msg'><img class='bot-img' src ='${botLogoPath}' /><span class='msg'> ${msg} </span></div>`;
      let index = 0;
      type(BotResponse, index);

      $(BotResponse).appendTo(".chat-area").hide().fadeIn(1000);
      scrollToBottomOfResults();
      chatInput.focus();
    } else {
      //if we get response from Rasa
      for (i = 0; i < val.length; i++) {
        //check if there is text message
        if (val[i].hasOwnProperty("text")) {
          const botMsg = val[i].text;
          if (botMsg.includes("password")) {
            chatInput.type = "password";
            passwordInput = true;
          }
          var BotResponse = `<div class='bot-msg'>
              <img class='bot-img' src ='${botLogoPath}' />
              <span class='msg'>${urlify(val[i].text)}</span>
          </div>`;
          $(BotResponse).appendTo(".chat-area").hide().fadeIn(1000);
        }

        //check if there is image
        if (val[i].hasOwnProperty("image")) {
          var BotResponse =
            "<div class='bot-msg'>" +
            "<img class='bot-img' src ='${botLogoPath}' />";
          '<img class="msg-image" src="' + val[i].image + '">' + "</div>";
          $(BotResponse).appendTo(".chat-area").hide().fadeIn(1000);
        }

        //check if there are buttons
        if (val[i].hasOwnProperty("buttons")) {
          var BotResponse = `<div class='bot-msg'><img class='bot-img' src ='${botLogoPath}' /><div class='response-btns'>`;

          buttonsArray = val[i].buttons;
          buttonsArray.forEach((btn) => {
            BotResponse += `<button class='btn-primary' onclick= 'userResponseBtn(this)' value='${btn.payload}'>${btn.title}</button>`;
          });

          BotResponse += "</div></div>";

          $(BotResponse).appendTo(".chat-area").hide().fadeIn(1000);
          chatInput.disabled = true;
        }
      }
      scrollToBottomOfResults();
      chatInput.disabled = false;
      chatInput.focus();
    }
  }, 500);
}

function mobileView() {
  $(".chat-popup").width($(window).width());

  if (chatPopup.style.display == "none") {
    chatPopup.style.display = "flex";
    // chatInput.focus();
    chatBtn.style.display = "none";
    chatPopup.style.bottom = "0";
    chatPopup.style.right = "0";
    // chatPopup.style.transition = "none"
    expandWindow.innerHTML = `<img src = "./icons/close.png" class = "icon" >`;
  }
}

function detectMob() {
  return window.innerHeight <= 800 && window.innerWidth <= 600;
}

function chatbotTheme(theme) {
  const gradientHeader = document.querySelector(".chat-header");
  const orange = {
    color: "#FBAB7E",
    background: "linear-gradient(19deg, #FBAB7E 0%, #F7CE68 100%)",
  };

  const purple = {
    color: "#B721FF",
    background: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
  };

  if (theme === "orange") {
    root.style.setProperty("--chat-window-color-theme", orange.color);
    gradientHeader.style.backgroundImage = orange.background;
    chatSubmit.style.backgroundColor = orange.color;
  } else if (theme === "purple") {
    root.style.setProperty("--chat-window-color-theme", purple.color);
    gradientHeader.style.backgroundImage = purple.background;
    chatSubmit.style.backgroundColor = purple.color;
  }
}

function createChatBot(
  hostURL,
  botLogo,
  title,
  welcomeMessage,
  welcomeVideo,
  inactiveMsg,
  theme = "blue"
) {
  host = hostURL;
  botLogoPath = botLogo;
  inactiveMessage = inactiveMsg;
  init();
  const msg = document.querySelector(".msg");
  msg.innerText = welcomeMessage;

  // const videoMsg = document.querySelector(".chat-area");a
  // videoMsg.innerHTML = welcomeVideo

  const botTitle = document.querySelector(".bot-title");
  botTitle.innerText = title;
  console.log({ title });

  chatbotTheme(theme);
}
