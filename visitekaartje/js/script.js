const canvasCharacter = document.getElementById("canvas-character");

const canvasCharacterRive = new rive.Rive({
  src: "./images/persona.riv",
  canvas: canvasCharacter,
  autoplay: true,
  stateMachines: "persona-states",
  artboard: "character-card",
  fit: rive.Fit.Cover,
  onLoad: (_) => {
    canvasCharacterRive.resizeDrawingSurfaceToCanvas();
  },
});


const clickArea = document.querySelectorAll(".sasjaCardDetails");
const cardContent = document.querySelector(".sasjaCardContent");

clickArea.forEach((area) => { 
  area.addEventListener("click", () => {

    cardContent.classList.toggle("clicked");
  });
});


// rotate the card in 3d based on cursor position

// const card = document.querySelector(".sasjaCard > section")

// const root = document.documentElement;

// document.addEventListener("mousemove", (e) => {
//     const x = e.clientX - window.innerWidth / 2;
//     const y = e.clientY - window.innerHeight / 2;


//     root.style.setProperty('--rotateX', `${y * 0.05}deg`);
//     root.style.setProperty('--rotateY', `${x * 0.05}deg`);
// });


// fetch data from this link: https://whois.fdnd.nl/api/v1/member?id=cldczhjad16yh0av08jxscp0a and console.log it

const cardFirstName = document.querySelector(".cardName > span:first-of-type");
const cardLastName = document.querySelector(".cardName > span:last-of-type");

const url = "https://whois.fdnd.nl/api/v1/member?id=cldepio2z3xfw0bw5wqihjf47"

fetch(url).then(response => response.json())
.then(data => createCard(data))
.catch(err => console.error(err));


// write a function that changes html content based on the parameter

function createCard(data) {
  console.log(data)

  cardFirstName.insertAdjacentHTML('beforeend', data.member.name);

  cardLastName.insertAdjacentHTML('beforeend', data.member.surname);

  // cardFirstName.innerHTML = data.member.name;
  // cardLastName.innerHTML = data.member.surname;
};


const hintImage = document.querySelector(".animContainer > img")

canvasCharacter.addEventListener("click", () => {
  hintImage.classList.add("invis")
})
