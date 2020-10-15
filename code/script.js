// All the DOM selectors stored as short variables
const chat = document.getElementById("chat")
const nameForm = document.getElementById("name-form")
const nameInput = document.getElementById("name-input")
const inputWrapper = document.getElementById("input-wrapper")

//Lägger till dagens datum
const d = new Date();
document.getElementById("date").innerHTML = d.toDateString();
// Global variables, if you need any, declared here
let userName = ""

// Menyer/rullgardin
// Selected och disabled som attribut till det första valet
// för att det första alternativet inte ska vara valbar

const musicMenu = `
  <select id="select">
    <option value="" selected disabled>Välj en musikstil</option>
    <option value="Pop">Pop</option>
    <option value="Hårdrock">Hårdrock</option>
    <option value="Jazz">Jazz</option>
  </select>
  `
const trainingMenu = `
  <select id="select">
    <option value="" selected disabled>Välj en träningsform</option>
    <option value="Jogga">Jogga</option>
    <option value="Gymma">Gymma</option>
    <option value="Cirkelträning">Cirkelträning</option>
  </select>
  `
const restMenu = `
  <select id="select">
    <option value="" selected disabled>Välj en avkoppling</option>
    <option value="Se på Netflix">Se på Netflix</option>
    <option value="Pussla">Lägga pussel</option>
    <option value="Fika">Fika</option>
  </select>
  `
// Functions declared here

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />
      </section>
    `
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

//Sammanfattning
const askForConfirmation = (companyChoice, eventChoice) => {

  //Tömmer inputfältet
  inputWrapper.innerHTML = ""

  showMessage(`Så du vill ${eventChoice} ${companyChoice}! Är du säker på att du vill göra det?`, "bot")

  inputWrapper.innerHTML = `
    <button id="restart">Nej</button>
    <button id="confirm">Ja</button>
  `
  //Nej-knappen ges en inbyggd funktion location.reload som laddar om sidan
  document.getElementById("restart").addEventListener("click", () => location.reload())

  document.getElementById("confirm").addEventListener("click", () => {
    inputWrapper.innerHTML = ""
    showMessage("Ja!", "user")
    setTimeout(() => showMessage(`Ha så skoj ${userName} när du ska ${eventChoice} ${companyChoice}! 😀`, "bot"), 1000)
  })
}

//Fråga 4
const askForCompany = eventChoice => {
showMessage(`Vad roligt! Ska du göra det med kompis eller själv?`, "bot")

inputWrapper.innerHTML = `
    <button id="friendButton">Med kompis</button>
    <button id="aloneButton">Själv</button
  `
  document.getElementById("friendButton").addEventListener("click", () => company("med kompis"))
  document.getElementById("aloneButton").addEventListener("click", () => company("själv"))

const company = companyChoice => {
  showMessage(`Jag ska göra det ${companyChoice}`, "user")
  setTimeout(() => askForConfirmation(companyChoice, eventChoice), 1000)
  }
}

//Fråga 3
//Definierar eventChoice som en parameter för att ta emot aktivitetsvalet som ett argument
const askForType = eventChoice => {
  showMessage(`Jag vill ${eventChoice}`, "user")
  setTimeout(() => showMessage(`Så du känner för att ${eventChoice} ${userName}? Vad tänkte du göra då?`, "bot"), 1000)

//Valen definieras som variabler högst upp i dokumentet
  if (eventChoice === "lyssna på musik") {
    inputWrapper.innerHTML = musicMenu
  }  else if (eventChoice === "träna") {
    inputWrapper.innerHTML = trainingMenu
//Om inget annat valts så gäller denna
  }  else {
    inputWrapper.innerHTML = restMenu
  }

const selectedType = document.getElementById("select")
selectedType.addEventListener("change", () => {
  showMessage(selectedType.value, "user")
  setTimeout(() => askForCompany(eventChoice), 1000)
  })
}


//Fråga 2
const askForHappening = (userName) => {
  showMessage(`Trevligt att prata med dig ${userName}! Vad har du tänkt göra ikväll?`, "bot")

  // Byter ut innehållet i inputWrapper från text-input till knappar
  inputWrapper.innerHTML=`
  <button id="musicButton">Lyssna på musik 🎼</button>
  <button id="trainingButton">Träna 🏃‍♀️</button>
  <button id="restButton">Softa 🎥</button>
  `
  // Lyssnar på klick-händelsen och kallar då på funktionen som styr nästa fråga (askForType)
  //Om man vill kan man ha radbryt innan varje punkt för att göra det mer läsbart.
  document.getElementById("musicButton").addEventListener("click", () => askForType("lyssna på musik"))
  document.getElementById("trainingButton").addEventListener("click", () => askForType("träna"))
  document.getElementById("restButton").addEventListener("click", () => askForType("softa"))
}

//Fråga 1
const handleNameInput = (event) => {
  //event.preventDefault() funktion förhindrar att sidan laddas om när formuläret skickas
  event.preventDefault()
  userName = nameInput.value
  nameInput.value = ""
  showMessage(userName, "user")
  //setTimeout gör så att nedanstående svar fördröjs 1 sekund vilket styrs av 1000 efter raden eller vilken tid man nu anger
  setTimeout(() => askForHappening(userName), 1000)
}

// Starts here
const greeting = () => {
  showMessage("Hej och välkommen!😀 Vad heter du?", "bot")
  // Just to check it out, change 'bot' to 'user' here 👆
}
// När det klickas på submitknappen så aktiveras funktion handleNameInput
nameForm.addEventListener("submit", handleNameInput)


// When website loaded, chatbot asks first question.
// normally we would invoke a function like this:
// greeting()
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greeting, 1000)
