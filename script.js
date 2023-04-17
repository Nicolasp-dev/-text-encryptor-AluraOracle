"use strict";

const textarea = document.querySelector("textarea");
const encryptBtn = document.querySelector("#encrypt-btn");
const decryptBtn = document.querySelector("#decrypt-btn");
const aside = document.querySelector("aside");
const asideImg = document.querySelector("#aside__img");
const asideText = document.querySelector(".aside__text");

const paragraphs = [];
let uniqueId = 0;
let selectedText = "";

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
    console.log(`${paragraphElement.innerText}`);
    selectedText = paragraphElement.innerText;
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
  text = text.split("ai").join("a");
  text = text.split("enter").join("e");
  text = text.split("imes").join("i");
  text = text.split("ober").join("o");
  text = text.split("ufat").join("u");
  console.log(text);
  return text;
};

const setAsideStyles = (style) => {
  aside.style.justifyContent = style;
  aside.style.alignItems = style;
};

encryptBtn.addEventListener("click", () => {
  const userInput = textarea.value;
  if (!userInput) return alert("Please enter a valid text");

  removeHtmlTag(asideImg, asideText);

  setAsideStyles("flex-start");

  const encryptedText = encryptHandler(userInput);
  paragraphs.push(encryptedText);
  uniqueId++;
  displayParagraph();

  textarea.value = "";
  textarea.focus();
});

decryptBtn.addEventListener("click", (e) => {
  const decryptedText = decryptHandler(selectedText);
  textarea.value = decryptedText;
});

textarea.addEventListener("focus", () => {
  textarea.removeAttribute("placeholder");
});

textarea.addEventListener("blur", () => {
  !textarea.value &&
    textarea.setAttribute("placeholder", "Ingrese el texto aquí");
});
