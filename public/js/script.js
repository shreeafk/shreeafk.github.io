// Adapted interactivity from the example
const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    french: ["Non","Tu es sûr ?","Tu es vraiment sûr ??","Tu es vraiment vraiment sûr ???","Réfléchis encore?"],
    thai: ["ไม่อ่ะ","แน่ใจจริงๆหรอคะ?","แน่ใจจริงๆ จริงๆนะคะ?"]
};

const answers_yes = { english: "Yes", french: "Oui", thai: "เย่ คืนดีกันแล้วน้า" };

let language = "english";
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let clicks = 0;

no_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "https://raw.githubusercontent.com/Aayush-683/will-you-be-my-valentine/main/public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    const sizes = [40, 50, 30, 35, 45];
    const random = Math.floor(Math.random() * sizes.length);
    let size = yes_button.offsetHeight + sizes[random];
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    const total = answers_no[language].length;
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
    }
});

yes_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    banner.src = "https://raw.githubusercontent.com/Aayush-683/will-you-be-my-valentine/main/public/images/yes.gif";
    refreshBanner();
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
});

function refreshBanner() {
    let banner = document.getElementById('banner');
    const src = banner.src;
    banner.src = '';
    setTimeout(() => { banner.src = src; }, 50);
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }
    yes_button.innerHTML = answers_yes[language] || answers_yes.english;
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0] || answers_no.english[0];
    } else {
        no_button.innerHTML = answers_no[language][clicks % answers_no[language].length] || answers_no.english[0];
    }
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, à bientôt :3";
    } else if (language === "thai") {
        successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}
