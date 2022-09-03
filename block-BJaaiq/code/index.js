let container = document.querySelector(".quotes");
let index = 0;
let max = 8;

function addData() {
  for (let i = 0; i < max; i++) {
    let div = document.createElement("div");
    div.classList.add("quote");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    h3.innerText = quotes[index].quoteText;
    p.innerText = quotes[index].quoteAuthor;
    div.append(h3, p);
    container.append(div);
    index++;
  }
}

addData();

document.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight;
  let clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    addData();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  alert("The content of DOM is loaded");
});
