function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
const modalBgElements = document.querySelectorAll(".target");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.getElementById("closeBtn");
const closeElements = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const modalform = document.querySelectorAll(".bground");
const btnVerif = document.getElementById("btn-verif");
const test = document.getElementById("dd");

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
/**
 * @returns ouvre les modales
 */
function launchModal() {
  modalform.forEach((modalbg) => {
    modalbg.style.display = "block";
  });
}

// close modal form
closeElements.forEach((element) => element.addEventListener("click", closeModal)); 
closeBtn.addEventListener("click", closeModal); 
/**
 * @returns ferme les modales
 */
function closeModal() {
  modalBgElements.forEach((modalbg) => {
    modalbg.style.display = "none";
  });
}
/**
 * @returns empeche de clciker et lance la verif
 */
function verif(event) {
  event.preventDefault();  
  changeColor("green");
}
/**
 * @returns verifi et autorise a cliker
 */
function changeColor(color) {
  test.style.color = color; 
}
btnVerif.addEventListener("click", verif);
/**
 * @returns ajoute les erreur
 */
function showError(messageErrId, wrongElementId) {
  const messageErr = document.getElementById(messageErrId);
  const wrongElement = document.getElementById(wrongElementId);
  messageErr.classList.add("reveal"); 
  wrongElement.classList.add("wrong");
}
/**
 * @returns enleve les erreur
 */
function removeError(messageErrId, wrongElementId) {
  const messageErr = document.getElementById(messageErrId);
  const wrongElement = document.getElementById(wrongElementId);
  messageErr.classList.remove("reveal"); 
  wrongElement.classList.remove("wrong");
}
/**
 * @returns verifie le champ prénom et gère l'erreur 
 */
function verifFirstName() {
  const inputFirstName = document.getElementById("first");
  inputFirstName.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    inputValue.length >= 1 && inputValue.length < 2
    ? showError("messageErrFirst", "first") : removeError("messageErrFirst","first");
  });
}
verifFirstName();
/**
 * @returns verifie le champ nom et gère l'erreur 
 */
function verifLastName() {
  const inputLastName = document.getElementById("last");
  inputLastName.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    inputValue.length >= 1 && inputValue.length < 2
    ? showError("messageErrLast", "last") : removeError("messageErrLast","last");
  });
}
verifLastName();
/**
 * @returns verifie l'input mail
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
/**
 * @returns gère l'erreur  mail
 */
function verifLastMail() {
  const inputLastMail = document.getElementById("email");
  inputLastMail.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    if (isValidEmail(inputValue)) {
      removeError("messageErrMail", "email");
    } else {
      showError("messageErrMail", "email");
    }
  });
}
verifLastMail();

/**
 * 
 * @returns la date du jour au bon format
 */
const getToday = () => {
  const aujourdHui = new Date();
  const annee = aujourdHui.getFullYear();
  const mois = String(aujourdHui.getMonth() + 1).padStart(2, '0'); 
  const jour = String(aujourdHui.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
};

/**
 * @returns gere l'erreur date 
 */
function verifBirthDate() {
  const inputBirthDate = document.getElementById("birthDate");
  inputBirthDate.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    const today = getToday(); 
    
    const age = today.split('-')[0] - inputValue.split('-')[0];
    
    if (age >= 18 && age <= 110) {
      removeError("messageErrBirth", "birthDate");
    } else {
      showError("messageErrBirth", "birthDate");
    }
  });
}
verifBirthDate();

/**
 */
function verifQuantity() {
  const inputQuantity = document.getElementById("quantity");
  inputQuantity.addEventListener("input", function(event) {
    const inputValue = event.target.value;
    if (inputValue !== "" && inputValue >= 0 && inputValue <= 100) {
      removeError("messageErrQuantity", "quantity");
    } else {
      showError("messageErrQuantity", "quantity");
    }
  });
}

verifQuantity();