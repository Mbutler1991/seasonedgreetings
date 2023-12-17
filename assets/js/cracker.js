// Cracker from https://codepen.io/john_r_muir/pen/RwRObMK

const cracker = document.getElementById("crackerWrapper");
const leftCracker = document.getElementById("leftCracker");
const rightCracker = document.getElementById("rightCracker");
const message = document.getElementById("message");
const jokeWrap = document.getElementById("jokeWrap");
const joke = document.getElementById("joke");
const punchline = document.getElementById("punchline");

let counter = 0;

let jokes =[
    {Q: "Why can't you take your turkey to church at Christmas?" ,A: "Because it has fowl language!"},
    {Q: "When is a turkey dinner bad for your health?" ,A: "When you're the turkey!"},
    {Q: "What do ducks do before Christmas dinner?" ,A: "Pull their Christmas Quackers!"},
    {Q: "What happens if you eat Christmas decorations?" ,A: "You get tinsel-itus!"},
    {Q: "Why is the turkey never hungry at Christmas?" ,A: "It's stuffed!"},
    {Q: "Fruit comes from a fruit tree, so a turkey comes from?" ,A: "A poul-tree!"},
    {Q: "Whats the best thing to put into a Christmas cake?" ,A: "Your teeth!"},
    {Q: "What do you call it when a family passes down a turkey recipe?" ,A: "Copy and Basting!"},
    {Q: "What do you get if you cross a turkey and a centipede?" ,A: "Drumsticks for everyone!"},
    {Q: "Why's it so cold at Christmas?" ,A: "Because it's Decembrrrrrr!"}
];

let num = Math.floor(Math.random() * jokes.length);

cracker.addEventListener('click', () => {
    if(counter < 1){
        counter++;
    } else{
        joke.textContent = jokes[num].Q;
        punchline.textContent = jokes[num].A;
        leftCracker.style.animation = "left 1s forwards";
        rightCracker.style.animation = "right 1s forwards";
        message.style.animation = "title 1s forwards";
        jokeWrap.style.animation = "joke 2s forwards";
        cracker.style.transform = "scaleX(1)";
    }
});

function Loop(){      
    window.requestAnimationFrame(Loop);
    if(counter > 0 && counter < 1){
        cracker.style.transform = `scaleX(${1 + (counter / 100)})`;
        counter -= 0.05;
    }
}
Loop();

// Logic to refresh the page using a button so the user can pull the cracker again
const refreshButton = document.querySelector('.refresh-button');

const refreshPage = () => {
    location.reload();
};

refreshButton.addEventListener('click', refreshPage);