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


function manageError(messageErrId, wrongElementId, booleen) {
  const messageErr = document.getElementById(messageErrId);
  const wrongElement = document.getElementById(wrongElementId);

  if (booleen) {
    messageErr.classList.add("reveal");
    wrongElement.classList.add("wrong");
  } else {
    messageErr.classList.remove("reveal");
    wrongElement.classList.remove("wrong");
  }
}
const inputLastName = document.getElementById("last");
const inputFirstName = document.getElementById("first");
function checkString(valeur, scope){
  return valeur.length >= 1 && valeur.length < 2
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


// debounce
// strotle


// some every




function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const inputLastMail = document.getElementById("email");
inputLastMail.addEventListener("blur", function(event) {
  const inputValue = event.target.value;
  if (isValidEmail(inputValue)) {
    manageError("messageErremail", "email", false);
  } else {
    manageError("messageErremail", "email", true);
  }
});

const getToday = () => {
  const aujourdHui = new Date();
  const annee = aujourdHui.getFullYear();
  const mois = String(aujourdHui.getMonth() + 1).padStart(2, '0'); 
  const jour = String(aujourdHui.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
};
  
const inputBirthDate = document.getElementById("birthDate");
inputBirthDate.addEventListener("blur", function(event) {
  const inputValue = event.target.value;
  const today = getToday(); 

  const age = today.split('-')[0] - inputValue.split('-')[0];
  
  if (age >= 18 && age <= 110) {
    manageError("messageErrbirthDate", "birthDate", false );
  } else {
    manageError("messageErrbirthDate", "birthDate", true);
  }
});
  

const inputQuantity = document.getElementById("quantity");
inputQuantity.addEventListener("blur", function(event) {
  const inputValue = event.target.value;
  if (inputValue !== "" && inputValue >= 0 && inputValue <= 100) {
    manageError("messageErrquantity", "quantity", false);
  } else {
    manageError("messageErrquantity", "quantity", true);
  }
});

// /**
//  * @returns verifi si une radio est coché
//  */
function isAnyRadioChecked() {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return true;
        }
    }
    return false;
}
/**
 * @returns renvois l'erreur radio
 */
function verifRadio(){
  const allRadios = document.getElementsByName('location');
  
  for (var i = 0; i < radios.length; i++) {
      allRadios[i].addEventListener('change', function() {
          var isRadioChecked = isAnyRadioChecked();
          if (isRadioChecked) {
            console.log("rouge");
            removeError("messageErrBirth", "birthDate");;
          } else {
            showError("messageErrBirth", "birthDate");;
          }
      });
  }

}