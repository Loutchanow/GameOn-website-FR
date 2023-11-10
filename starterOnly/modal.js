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
const confirmation = document.getElementById("confirmation")

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalform.forEach((modalbg) => {
    modalbg.style.display = "block";
  });
}

// close modal *******************************
closeElements.forEach((element) => element.addEventListener("click", closeModal)); 
closeBtn.addEventListener("click", closeModal); 

function closeModal() {
  modalBgElements.forEach((modalbg) => {
    modalbg.style.display = "none";
  });
}
// ***********************************verif function ************


function verif(event) {
  if (errors.length === 0) {
    closeModal();
    event.preventDefault();
    confirmation.style.display = "block";
  } else {
    event.preventDefault();
    errors.forEach((errorId) => {
      const errorElement = document.getElementById(errorId);
      const errmessage = document.getElementById("messageErr"+ errorId);
      if (errorElement) {
        errorElement.classList.add("wrong");
        errmessage.classList.add("reveal");
    }});
  }
}

btnVerif.addEventListener("click", verif);


// ***********************getsion d'erreur ************************
let errors = ["first", "last", "email", "birthDate", "quantity", "options", "conditions" ];
function manageError(messageErrId, wrongElementId, booleen) {
  const messageErr = document.getElementById(messageErrId);
  const wrongElement = document.getElementById(wrongElementId);

  if (booleen) {
    messageErr.classList.add("reveal");
    wrongElement.classList.add("wrong");
    errors.push(wrongElementId);
  } else {
    messageErr.classList.remove("reveal");
    wrongElement.classList.remove("wrong");
    errors = errors.filter(id => id !== wrongElementId);
  }
}

// ****************************verif nom et prenom ****************
const inputLastName = document.getElementById("last");
const inputFirstName = document.getElementById("first");
function checkString(valeur, scope){
  return valeur.length >= 0 && valeur.length < 2
  ? manageError("messageErr"+scope, scope, true) : manageError("messageErr"+scope,scope, false);
}

inputFirstName.addEventListener("blur", function(event) {
  const inputValue = event.target.value;
  checkString(inputValue, "first")
});
inputLastName.addEventListener("blur", function(event) {
  const inputValue = event.target.value;
  checkString(inputValue, "last")
}); 


// ******************verifmail**********************
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const inputLastMail = document.getElementById("email");
inputLastMail.addEventListener("input", function(event) {
  const inputValue = event.target.value;
  if (isValidEmail(inputValue)) {
    manageError("messageErremail", "email", false);
  } else {
    manageError("messageErremail", "email", true);
  }
});
// *******************************verif date***************

const inputBirthDate = document.getElementById("birthDate");
inputBirthDate.addEventListener("blur", function(event) {
  const inputValue = new Date(event.target.value);
  const today = new Date();
  const age = new Date(today - inputValue).getFullYear()-1970;

  if (age >= 18 && age <= 110) {
    manageError("messageErrbirthDate", "birthDate", false);
  } else {
    manageError("messageErrbirthDate", "birthDate", true);
  }
});

// ********************************quantité*******************
const inputQuantity = document.getElementById("quantity");
inputQuantity.addEventListener("blur", function(event) {
  const inputValue = event.target.value;
  if (inputValue !== "" && inputValue >= 0 && inputValue <= 100) {
    manageError("messageErrquantity", "quantity", false);
  } else {
    manageError("messageErrquantity", "quantity", true);
  }
});

// ************************radios et conditions  *******************

const optionsLocation = document.querySelectorAll('.options');
const conditions = document.getElementById("conditions");
console.log(optionsLocation);
console.log(conditions);
function checkIfChecked(inputs, scope){
  let isChecked = false
  inputs.forEach(input => {
    if (input.checked) {
      isChecked = true;
    }
  });
  return manageError("messageErr" + scope, scope, !isChecked)
}

optionsLocation.forEach(input => {
  input.addEventListener("change", function() {
    checkIfChecked(optionsLocation, "options");
  });
});

conditions.addEventListener("change", function() {
    checkIfChecked([conditions], "conditions");
  });

// **********************************envoyer tous *************
