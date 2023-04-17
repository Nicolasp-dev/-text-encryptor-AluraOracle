"use strict";

const textarea = document.querySelector("textarea");
const encryptBtn = document.querySelector("#encrypt-btn");
const decryptBtn = document.querySelector("#decrypt-btn");
const aside = document.querySelector("aside");
const asideImg = document.querySelector("#aside__img");
const asideText = document.querySelector(".aside__text");

const paragraphs = [];
let uniqueId = 0;

const removeHtmlTag = (...args) => {
  args.forEach((element) => (element.style.display = "none"));
};

const displayParagraph = () => {
  const paragraph = paragraphs.slice(-1);

  const paragraphElement = document.createElement("p");
  paragraphElement.setAttribute("id", `item-${uniqueId}`);
  paragraphElement.classList.add("aside__paragraph--new");
  paragraphElement.textContent = paragraph;

  paragraphElement.addEventListener("click", () => {
    console.log(`Item ${paragraphElement.innerText} was clicked`);
  });

  console.log(paragraphElement);
  aside.appendChild(paragraphElement);
};

const encryptHandler = (text) => {
  const splittedText = text.split("").map((char) => {
    let encryptedText = "";

    if (char.includes("a")) {
      encryptedText = char.replace("a", "ai");
    } else if (char.includes("e")) {
      encryptedText = char.replace("e", "enter");
    } else if (char.includes("i")) {
      encryptedText = char.replace("i", "imes");
    } else if (char.includes("o")) {
      encryptedText = char.replace("o", "ober");
    } else if (char.includes("u")) {
      encryptedText = char.replace("u", "ufat");
    } else {
      encryptedText = char;
    }

    return encryptedText;
  });

  return splittedText.join("");
};

const decryptHandler = (text) => {
  const splittedText = text.split("").map((char) => {
    let decryptedText = "";

    if (char.includes("ai")) {
      decryptedText = char.replace("ai", "a");
    } else if (char.includes("e")) {
      decryptedText = char.replace("e", "enter");
    } else if (char.includes("i")) {
      decryptedText = char.replace("i", "imes");
    } else if (char.includes("o")) {
      decryptedText = char.replace("o", "ober");
    } else if (char.includes("u")) {
      decryptedText = char.replace("u", "ufat");
    } else {
      decryptedText = char;
    }

    return decryptedText;
  });

  return splittedText.join("");
};

encryptBtn.addEventListener("click", () => {
  const userInput = textarea.value;
  if (userInput === "") return alert("Please enter a valid text");
  removeHtmlTag(asideImg, asideText);

  aside.style.justifyContent = "flex-start";
  aside.style.alignItems = "flex-start";

  const encryptedText = encryptHandler(userInput);

  paragraphs.push(encryptedText);
  uniqueId++;
  displayParagraph();

  textarea.value = "";
});

decryptBtn.addEventListener("click", (e) => {
  console.log(e);
});

textarea.addEventListener("focus", () => {
  textarea.removeAttribute("placeholder");
});

textarea.addEventListener("blur", () => {
  textarea.value === "" &&
    textarea.setAttribute("placeholder", "Ingrese el texto aquí");
});
