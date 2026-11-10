document.addEventListener("DOMContentLoaded", () => {




const settingCloseBtn = document.querySelector(".setting-close-btn");
const acccountPFP = document.querySelector(".account-pfp");

acccountPFP.addEventListener("click", function() {
  document.querySelector(".blur-container").style.display = "flex";
})
settingCloseBtn.addEventListener("click", function() {
  document.querySelector(".blur-container").style.display = "none";
})
document.querySelector(".blur-container").addEventListener("click", function(e) {

  if (e.target === document.querySelector(".blur-container")) {
    document.querySelector(".blur-container").style.display = "none";
  } else {
    return
  }
})



const input = document.querySelector('.text-name');
const topBtn = document.querySelector('#top-bar-btn-bro');
let timeout;

function updateBtnWidth(delay = 0) {
  clearTimeout(timeout);
  topBtn.style.opacity = "1";
  topBtn.style.transform = "translateY(0)";
  topBtn.style.scale = "1";
  topBtn.style.transition = "transition: all .121s cubic-bezier(0.19, 1, 0.22, 1)";
  topBtn.style.boxShadow = " inset 0 0 40px 20px rgb(38, 42, 53),inset 2.25px 2.15px 1.75px 0 rgba(255, 255, 255, 0.25),inset -1.75px -1.75px 1.75px 1.75px rgba(255, 255, 255, 0.15),0 0 0 1.75px rgba(255, 255, 255, 0.1)";
const valueLength = input.value.length;
  modifier = 8;

   if (input.value.length > 61) {
    modifier = 8;
   } else if (input.value.length > 68 ) {
    modifier = 12;
   } else if (input.value.length > 71 ) {
    modifier = 15;
   } else if (input.value.length > 81 ) {
    modifier = 20;
   } else if (input.value.length > 96 ) {
    modifier = 25;
   }
  timeout = setTimeout(() => {

    topBtn.style.setProperty('width', valueLength > 15 ? ((valueLength * modifier) + 286.72)+'px' : "290.74px", 'important');
    
  }, delay);

  timeout2 = setTimeout(() => {
    if (input.value.length == 0 || input.value.trim() === "") {
        topBtn.style.opacity = "0.35";
        topBtn.style.scale = "0.96";
        input.placeholder = "No Name";
        topBtn.style.boxShadow = " inset 0 0 40px 20px rgb(38, 42, 53),inset 2.25px 2.15px 1.75px 0 rgba(255, 255, 255, 0.5),inset -1.75px -1.75px 1.75px 1.75px rgba(255, 255, 255, 0.35),0 0 0 1.75px rgba(255, 255, 255, 0.25)";
    }
}, 1210);




if (input.value.length > 96) {
    input.value = input.value.slice(0, 96);
  }

}

input.addEventListener("click", function() {
  topBtn.style.opacity = "1";
  topBtn.style.scale = "1";
  topBtn.style.transform = "TranslateY(0)";
  topBtn.style.boxShadow = "inset 0 0 40px 20px rgb(38, 42, 53),inset 2.25px 2.15px 1.75px 0 rgba(255, 255, 255, 0.25),inset -1.75px -1.75px 1.75px 1.75px rgba(255, 255, 255, 0.15),0 0 0 1.75px rgba(255, 255, 255, 0.15)"
})

window.setInputValue = (value) => {
    input.value = value; 
    const lengthy = value.length;

    updateBtnWidth(10);
    console.log(lengthy);

    timeout3 = setTimeout(() => {
        const newWidth = lengthy > 15 
            ? (lengthy * 6.8 + 286.72) + 'px' 
            : "290.74px";
        topBtn.style.setProperty('width', newWidth, 'important');
        topBtn.style.opacity = "0.96";
        topBtn.style.scale = "0.92";
        topBtn.style.transform = "translateY(-.605vh)";
        topBtn.style.boxShadow = " inset 0 0 40px 20px rgb(38, 42, 53),inset 2.25px 2.15px 1.75px 0 rgba(255, 255, 255, 0.3),inset -1.75px -1.75px 1.75px 1.75px rgba(255, 255, 255, 0.25),0 0 0 1.75px rgba(255, 255, 255, 0.2)";
        console.log(topBtn.style.width);
    }, 1210);


    timeout4 = setTimeout(() => {
        topBtn.style.opacity = "0.96";
        topBtn.style.scale = "0.92";
        topBtn.style.transform = "translateY(0)";
    }, 2420);
};









// main welcome container animations.

const welcomeScreen = document.querySelector(".welcome-chat-container");


  const actionsBtn = document.querySelectorAll(".actions-btn");

  const first = document.querySelector(".first")
  const second = document.querySelector(".second")
  const third = document.querySelector(".third")

actionsBtn.forEach(btn => {
  btn.style.scale = "1";
  btn.style.transform = "translate(0,0)";
  btn.style.opacity = "1";
  btn.style.filter = "brightness(1)";
});

const welcomeText1 = document.querySelector(".mid-welcome-cont h1")
welcomeText1.style.scale = "1";
welcomeText1.style.opacity = "1";
welcomeText1.style.filter = "brightness(1)";

const welcomeText2 = document.querySelector(".mid-welcome-cont h3")
welcomeText2.style.scale = "1.1";
welcomeText2.style.opacity = ".65";
welcomeText2.style.filter = "brightness(1)";
welcomeText2.style.transform = "translateY(0)";

const mainLogo = document.querySelector(".main-logo")
mainLogo.style.scale = "1";
mainLogo.style.opacity = "0.925";
mainLogo.style.filter = "brightness(1)";
mainLogo.style.transform = "translateY(0)";


const chatAreaThing = document.querySelector(".chat-input-area")
chatAreaThing.style.scale = "1";
chatAreaThing.style.opacity = "1";
chatAreaThing.style.filter = "brightness(1)";
chatAreaThing.style.transform = "translateY(0)";













const sideBar = document.querySelector(".sidebar")

sideBar.style.scale = "1";
sideBar.style.opacity = "1";
sideBar.style.filter = "brightness(1)";
sideBar.style.transform = "translateX(0)";


const topBar = document.querySelector(".top-bar")
topBar.style.scale = "1";
topBar.style.opacity = "1";
topBar.style.transform = "translateY(0)";
topBar.style.filter = "brightness(1)";

const chatInput = document.getElementById("chat-input-system")




document.querySelector(".chat-send-btn").addEventListener("click", function() {
  deliverMessage()
  clickWelcome()
  leaveTimeout = setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.style.background = 'transparent';
        btn.style.animation = '';
        plane.style.display = 'inline-block';
        plane.style.transform = 'translate(0,0) scale(1)';
        plane.style.opacity = '1';
        check.style.transform = 'translate(-1.87vh,1.87vh) scale(0.77)';
        check.style.opacity = '0';
        setTimeout(() => check.style.display = 'none', 100);
    }, 6710);
})

function deliverMessage() {
  if (document.querySelector(".chat-send-btn").innerHTML.includes("fa-check")) {
    if (welcomeScreen.style.opacity == "0") {
      sendPrompt()
    } else {
      welcomeScreen.style.transform = "translateY(-100vh)";
      welcomeScreen.style.scale = "0.69";
    welcomeScreen.style.filter = "brightness(0)"
    welcomeScreen.style.opacity = "0";

    sendPrompt()
    }
  }
  else {
    return
  }
}


let canClick = true;

function clickWelcome() {
  if (!canClick) return;
  canClick = false;
  const mid = document.querySelector(".mid-welcome-cont"),
        top = document.querySelector(".top-welcome-cont"),
        bot = document.querySelector(".bot-welcome-cont");
  mid.style.transform = "translateY(-1.51vh)";
  top.style.transform = "translateY(-1.01vh)";
  bot.style.transform = "translateY(-2.01vh)";
  first.style.transform = `translateY(${(Math.random() * (-2.51+2.01)-2.01).toFixed(2)}vh)`;
  second.style.transform = `translateY(${(Math.random() * (-1.59+1.41)-1.51).toFixed(2)}vh)`;
  third.style.transform = `translateY(${(Math.random() * (-0.96+0.49)-0.69).toFixed(2)}vh)`;
  setTimeout(()=>{mid.style.transform=top.style.transform=bot.style.transform="translateY(0)";},210);
  setTimeout(()=>{first.style.transform=second.style.transform=third.style.transform="translateY(0)";},420);
  setTimeout(()=>canClick=true,1210);
}

chatInput.addEventListener("click", clickWelcome);









    
        const  currentCount = document.getElementById("current-count"),
          wpmCount = document.getElementById("wpm-count");

          
    let typingTimer, startTime = null;
    wpmCount.style.opacity = 0;
    wpmCount.style.transition = "opacity 1.21s ease";
    chatInput.addEventListener("input", () => {
        currentCount.innerHTML = chatInput.value.length >= 15000 ? "<span style='color:red; opacity: 0.5'>PERFORMANCE! </span>"+chatInput.value.length : chatInput.value.length;
        if (!startTime) startTime = Date.now();
        let words = chatInput.value.trim().split(/\s+/).length,
            minutes = (Date.now()-startTime)/60000,
            wpm = minutes > 0 ? Math.round(words/minutes) : 0;
        if (!isFinite(wpm) || wpm < 0) wpmCount.style.opacity = 0;
        else {
          if (wpm > 185) {
            clickWelcome()
            wpmCount.innerHTML = `WPM: ${wpm}`;
            wpmCount.style.opacity = 1;
          } else {
            wpmCount.innerHTML = `WPM: ${wpm}`;
            wpmCount.style.opacity = 1;
          }
            
        }
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            wpmCount.style.transition = "opacity 12.1s ease";
            wpmCount.style.opacity = 0;
            startTime = null;
            wpmCount.style.transition = "opacity 1.21s ease";
        }, 2000);
    });


    
const btn = document.querySelector('.chat-send-btn');
const plane = btn.querySelector('.fa-paper-plane');
const check = btn.querySelector('.fa-check');
let leaveTimeout;

btn.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimeout);
    btn.style.transform = 'scale(1.15)';
    btn.style.background = 'linear-gradient(270deg, #4f8cff, #4780eaff, #4780eaff';
    btn.style.backgroundSize = '400% 400%';
    btn.style.animation = 'moveGradient 2s linear infinite';
    plane.style.transform = 'translate(1.87vh, -1.87vh) scale(0.77)';
    plane.style.opacity = '0';
    check.style.display = 'block';
    check.style.transform = 'translate(-1.87vh, 1.87vh) scale(0.77)';
    check.style.opacity = '0';
    setTimeout(() => {
        check.style.transform = 'translate(0,0) scale(1)';
        check.style.opacity = '1';
        setTimeout(() => {
            plane.style.display = 'none';
        }, 100);
    }, 50);
});

btn.addEventListener('mouseleave', () => {
    leaveTimeout = setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.style.background = 'transparent';
        btn.style.animation = '';
        plane.style.display = 'inline-block';
        plane.style.transform = 'translate(0,0) scale(1)';
        plane.style.opacity = '1';
        check.style.transform = 'translate(-1.87vh,1.87vh) scale(0.77)';
        check.style.opacity = '0';
        setTimeout(() => check.style.display = 'none', 100);
    }, 6710);
});

    
});



document.addEventListener("DOMContentLoaded", () => {

   const dropdown = document.querySelector(".dropdown-content");
  let fadeInterval;

  document.getElementById("chat-input-system").addEventListener("click", function() {
    if (dropdown.style.display === "flex") {
      dropdown.style.display = "none";
    } 
  })

  document.getElementById("chat-input-system").addEventListener("input", function() {
    if (dropdown.style.display === "flex") {
      dropdown.style.display = "none";
    }
  })

  window.toggleDropdown = () => {
    clearInterval(fadeInterval);

    if (dropdown.style.display === "flex") {
      
      document.querySelector("#dropdown-caret i").style.transform = "rotate(180deg) translateY(2.12px)";

      setTimeout(() => {
        document.querySelector("#dropdown-caret").innerHTML = "<i class='fas fa-caret-down'></i>";
      }, 363);

      let opacity = parseFloat(getComputedStyle(dropdown).opacity) || 1;
      fadeInterval = setInterval(() => {
        opacity -= 0.01;
        if (opacity <= 0) {
          opacity = 0;
          dropdown.style.display = "none";
          clearInterval(fadeInterval);
        }
        dropdown.style.opacity = opacity;
      }, 1);
    } else {
      dropdown.style.display = "flex";
      let opacity = 0;
      dropdown.style.opacity = opacity;
      fadeInterval = setInterval(() => {
        opacity += 0.01;
        if (opacity >= 1) {
          opacity = 1;
          clearInterval(fadeInterval);
        }
        document.querySelector("#dropdown-caret i").style.transform = "rotate(-180deg) translateY(2.12px)";

      setTimeout(() => {
        document.querySelector("#dropdown-caret").innerHTML = "<i class='fas fa-caret-up'></i>";
      }, 363);
        dropdown.style.opacity = opacity;
      }, 1);
    }
  };
});







