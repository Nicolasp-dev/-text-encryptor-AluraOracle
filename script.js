"use strict";

const textarea = document.querySelector("textarea");
const encryptBtn = document.querySelector("#encrypt-btn");
const decryptBtn = document.querySelector("#decrypt-btn");
const aside = document.querySelector("aside");
const asideContainer = document.querySelector(".aside__container");
const asideImg = document.querySelector("#aside__img");
const asideText = document.querySelector(".aside__text");
const copyBtn = document.querySelector("#copy-btn");

const paragraphs = [];
let uniqueId = 0;
let selectedText,
  listItems = "";

const removeHtmlTag = (...args) => {
  args.forEach((element) => (element.style.display = "none"));
};

const displayParagraph = () => {
  const paragraph = paragraphs.slice(-1);

  const paragraphElement = document.createElement("p");
  paragraphElement.setAttribute("id", `item-${uniqueId}`);
  paragraphElement.classList.add("aside__paragraph--new");
  paragraphElement.textContent = paragraph;

  asideContainer.appendChild(paragraphElement);

  listItems = document.querySelectorAll(".aside__container p");

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      listItems.forEach((otherItem) => {
        otherItem.classList.remove("selected");
      });
      item.classList.add("selected");
    });
  });
  console.log(paragraphElement);
};

const displayCopyBtn = () => {
  if (paragraphs.length > 0) {
    const copyBtn = `<button id="copy-btn" class="copy__btn">Copiar</button>`;
    aside.insertAdjacentHTML("beforeend", copyBtn);
  }
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

  paragraphs.push(encryptHandler(userInput));

  uniqueId++;
  displayParagraph();

  aside.style.justifyContent = "space-between";
  copyBtn.style.display = "block";
  asideContainer.style.marginTop = "0px";

  textarea.value = "";
  textarea.focus();
});

decryptBtn.addEventListener("click", () => {
  if (!paragraphs.length) return alert("Add and Encrypt new paragraphs");
  if (!selectedText) return alert("Select or copy a valid paragraph");
  textarea.value = decryptHandler(selectedText);
});

textarea.addEventListener("focus", () => {
  textarea.removeAttribute("placeholder");
});

textarea.addEventListener("blur", () => {
  !textarea.value &&
    textarea.setAttribute("placeholder", "Ingrese el texto aquí");
});

copyBtn.addEventListener("click", () => {
  const copiedParagraph = selectedText;
  if (copiedParagraph) {
    const clipboard = navigator.clipboard;
    clipboard.writeText(copiedParagraph);
    clipboard.readText().then((text) => {
      textarea.value = text;
      selectedText = text;
    });
  }
});

if (paragraphs.length > 0) {
}
