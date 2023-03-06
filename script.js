const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const accuracyLabel = document.querySelector(".accuracy");
const wordsPerMinuteLabel = document.querySelector(".wpm");

var timer = [0,0,0,0];
var interval;
var wpmInterval;
var timerRunning = false;
var errors = 0;
var timeElapsed = 0;
var randomParagraph = 0;
var wpm;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

    timeElapsed = timer[0]*60 + timer[1];
}

// Finds words per minute
function wordsPerMinute() {
  if (timeElapsed > 0) {
    var grossWpm = Math.floor((testArea.value.length/5) / (timeElapsed/60));
    console.log(grossWpm);
    wpm = Math.floor(((testArea.value.length/5) - errors)/(timeElapsed/60));
    console.log(wpm);
    if (wpm < 0) {
      wordsPerMinuteLabel.innerHTML = 0 + " WPM";
    } else {
      wordsPerMinuteLabel.innerHTML = wpm + " WPM";
    }
    accuracy(grossWpm);
  }
}

// Finds the accuracy
function accuracy(grossWpm) {
  let accuracy = Math.floor(wpm/grossWpm*100);
  if (accuracy < 0) {
    accuracyLabel.innerHTML = 0+"%";
  } else {
    accuracyLabel.innerHTML = accuracy+"%";
  }
  console.log(accuracy);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);


    if (textEntered == originText) {
        clearInterval(interval);
        clearInterval(wpmInterval);
        testWrapper.style.borderColor = "#429890"; //Green
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"; //Blue
        } else {
            errors++;
            if (!(event.keyCode === 8)) {
              testWrapper.style.borderColor = "#E95D0F"; //Orange
            } else {
              errors--;
            }
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
        wpmInterval = setInterval(wordsPerMinute, 1000);
    }
}

//Generates a new paragraph:
function randomParagraphGenerator() {
    let par1 = "Today, historians relate that, as a general rule, buying and selling securities was very much unorganized before the year 1792. Every person who owned a security faced the problem of finding interested buyers who might consider the purchase of a debt-free investment.";
    let par2 = "A paralegal is a person trained in legal matters who performs tasks requiring knowledge of the law and legal procedures. A paralegal is not a lawyer but can be employed by a law office or work freelance at a company or law office.";
    let par3 = "Business casual is an ambiguously defined dress code that has been adopted by many professional and white-collar workplaces in Western countries. It entails neat yet casual attire and is generally more casual than informal attire but more formal than casual or smart casual attire.";
    let par4 = "The first personnel management department started at the National Cash Register Co. in 1900. The owner, John Henry Patterson, organized a personnel department to deal with grievances, discharges and safety, and training for supervisors on new laws and practices after several strikes and employee lockouts.";
    let par5 = "An ever-growing number of complex and rigid rules plus hard-to-cope-with regulations are now being legislated from state to state. Key federal regulations were formulated by the FDA, FTC, and the CPSC. Each of these federal agencies serves a specific mission.";
    let par6 = "Jim and Anne will be in charge of the spring field day to be held in early June. They will ask their friends' aid to get set up. There will be games for the boys and girls. The children will want to hike, ride their bikes, and swim. This yearly event will be held in the new Peach Grove Park. Ruth has work to do on the plans for food for the day.";
    let par7 = "Proofreader applicants are tested primarily on their spelling, speed, and skill in finding errors in the sample text. Toward that end, they may be given a list of ten or twenty classically difficult words and a proofreading test, both tightly timed. The proofreading test will often have a maximum number of errors per quantity of text and a minimum amount of time to find them.";
    let par8 = "When we talk about motivating others, the justification is the end result (either we want to avoid the pain or go towards pleasure) or what we want to get the person to do. How we achieve the end result, are our alternatives.";
    let par9 = "Because of the laboriousness of the translation process, since the 1940s efforts have been made, with varying degrees of success, to automate translation or to mechanically aid the human translator.";
    let par10 = "The fastest typing speed ever, 216 words per minute, was achieved by Stella Pajunas-Garnand from Chicago in 1946 in one minute on an IBM electric. As of 2005, writer Barbara Blackburn was the fastest English language typist in the world, according to The Guinness Book of World Records.";

    switch (Math.floor(Math.random() * 10)) {
      case 0:
        originText = par1;
        document.querySelector("#origin-text p").innerHTML = par1;
        break;
      case 1:
        originText = par2;
        document.querySelector("#origin-text p").innerHTML = par2;
        break;
      case 2:
        originText = par3;
        document.querySelector("#origin-text p").innerHTML = par3;
        break;
      case 3:
        originText = par4;
        document.querySelector("#origin-text p").innerHTML = par4;
        break;
      case 4:
        originText = par5;
        document.querySelector("#origin-text p").innerHTML = par5;
        break;
      case 5:
        originText = par6;
        document.querySelector("#origin-text p").innerHTML = par6;
        break;
      case 6:
        originText = par7;
        document.querySelector("#origin-text p").innerHTML = par7;
        break;
      case 7:
        originText = par8;
        document.querySelector("#origin-text p").innerHTML = par8;
        break;
      case 8:
        originText = par9;
        document.querySelector("#origin-text p").innerHTML = par9;
        break;
      case 9:
        originText = par10;
        document.querySelector("#origin-text p").innerHTML = par10;
        break;
    }

}

// Reset everything:
function reset() {
    clearInterval(interval);
    clearInterval(wpmInterval);
    interval = null;
    wpmInterval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    wpm = 0 + " WPM";
    timeElapsed = 0;
    errors = 0;

    testArea.value = "";
    testArea.disabled = false;
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    accuracyLabel.innerHTML = "100%";
    wordsPerMinuteLabel.innerHTML = wpm;
    randomParagraphGenerator();
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
