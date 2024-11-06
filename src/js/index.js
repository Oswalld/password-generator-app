const generateBtn = document.querySelector(".generate");
const password = document.querySelector("#password");
// get inputs elements
const passwordLength = document.querySelector("#length");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const charactersLength = document.querySelector("#character-length");

// Fonction pour melanger les caractères du mot de passe généré
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// fonction pour générer un mot de passe aléatoire
const generateRandomPassword = () => {
  if (passwordLength.value === "") {
    alert("Please enter a password length");
    return;
  }

  const length = parseInt(passwordLength.value);

  // Add this check at the beginning
  if (length === 0) {
    password.value = "";
    copyText.classList.add("hidden");
    gaugePasswordStrength("");
    return;
  }

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";

  if (uppercase.checked) chars += uppercaseChars;
  if (lowercase.checked) chars += lowercaseChars;
  if (numbers.checked) chars += numberChars;
  if (symbols.checked) chars += symbolChars;

  if (chars === "") {
    alert("Please select at least one character type");
    return;
  }
  const charsArray = chars.split("");
  let finalPassword = [];

  // Générer le mot de passe avec la longueur exacte demandée
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsArray.length);
    finalPassword.push(charsArray[randomIndex]);
  }

  // S'assurer qu'au moins un caractère de chaque type sélectionné est présent
  // mais seulement si la longueur le permet
  let position = 0;
  if (uppercase.checked && position < length) {
    finalPassword[position++] =
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  }
  if (lowercase.checked && position < length) {
    finalPassword[position++] =
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  }
  if (numbers.checked && position < length) {
    finalPassword[position++] =
      numberChars[Math.floor(Math.random() * numberChars.length)];
  }
  if (symbols.checked && position < length) {
    finalPassword[position++] =
      symbolChars[Math.floor(Math.random() * symbolChars.length)];
  }

  finalPassword = shuffleArray(finalPassword);
  password.value = finalPassword.join("");
  copyText.classList.add("hidden");
  gaugePasswordStrength(password.value);
};

const STRENGTH_CLASSES = {
  default: "w-2.5 h-7 border-2",
  empty: "border-almost-white bg-transparent",
  tooWeak: "bg-red border-transparent",
  weak: "bg-orange border-transparent",
  medium: "bg-yellow border-transparent",
  strong: "bg-green border-transparent",
};

const gaugePasswordStrength = (password) => {
  let strength = 0;
  const strengthBars = document.querySelector("#strength-container").children;
  const strengthText = document.querySelector("#strength-text");

  // Réinitialiser toutes les barres
  Array.from(strengthBars).forEach((bar) => {
    bar.className = `${STRENGTH_CLASSES.default} ${STRENGTH_CLASSES.empty}`;
  });

  // Calcul de la force
  if (password.length > 11) strength += 1;
  if (password.length > 15) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  if (password.length <= 9) strength = 3;
  if (password.length <= 6) strength = 0;

  // Mise à jour de l'interface selon la force
  let strengthClass, text;
  switch (true) {
    case strength <= 1:
      strengthClass = STRENGTH_CLASSES.tooWeak;
      text = "TOO WEAK!";
      updateStrengthBars(strengthBars, 1, strengthClass);
      break;
    case strength === 2:
      strengthClass = STRENGTH_CLASSES.weak;
      text = "WEAK";
      updateStrengthBars(strengthBars, 2, strengthClass);
      break;
    case strength === 3:
      strengthClass = STRENGTH_CLASSES.medium;
      text = "MEDIUM";
      updateStrengthBars(strengthBars, 3, strengthClass);
      break;
    case strength >= 4:
      strengthClass = STRENGTH_CLASSES.strong;
      text = "STRONG";
      updateStrengthBars(strengthBars, 4, strengthClass);
      break;
  }

  if (strengthText) {
    strengthText.textContent = text;
  }

  return strength;
};

// Fonction utilitaire pour mettre à jour les barres de force
const updateStrengthBars = (bars, count, strengthClass) => {
  Array.from(bars).forEach((bar, index) => {
    if (index < count) {
      bar.className = `${STRENGTH_CLASSES.default} ${strengthClass}`;
    } else {
      bar.className = `${STRENGTH_CLASSES.default} ${STRENGTH_CLASSES.empty}`;
    }
  });
};

// Pour montrer en direct la longueur du mot de passe à générer
const showCharactersLength = () => {
  charactersLength.textContent = `${passwordLength.value}`;
};

// Copier le mot de passe dans le presse pappier et afficher un message de confirmation
passwordLength.addEventListener("input", showCharactersLength);
generateBtn.addEventListener("click", generateRandomPassword);

const copyBtn = document.querySelector("#copy");
const copyText = document.querySelector("#copy-text");
copyBtn.addEventListener("click", () => {
  document.execCommand("copy");
  copyText.classList.remove("hidden");
});
