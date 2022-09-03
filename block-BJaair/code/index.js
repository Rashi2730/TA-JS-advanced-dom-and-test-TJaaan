let ul = document.querySelector(".ul");
let form = document.querySelector(".form");

let cardsData = JSON.parse(localStorage.getItem(`cards`)) || [];

form.addEventListener(`submit`, (e) => {
  e.preventDefault();

  let title = event.target.elements.title.value;
  let category = event.target.elements.category.value;
  cardsData.push({ title, category });
  localStorage.setItem(`cards`, JSON.stringify(cardsData));
  createUI(cardsData, ul);
});

function handleEdit(event, info, i, label) {
  let elm = event.target;
  let input = document.createElement("input");
  input.style.width = "140px";
  input.style.backgroundColor = "rgb(233, 207, 207)";

  input.value = info;
  input.addEventListener(`keyup`, (e) => {
    if (e.keyCode === 13) {
      let newVal = e.target.value;
      cardsData[i][label] = newVal;
      createUI();
    }
  });

  let parent = event.target.parentElement;
  parent.replaceChild(input, elm);
}

function createUI(data = cardsData, root = ul) {
  root.innerHTML = ``;
  let fragment = new DocumentFragment();
  data.forEach((cardsInfo, index) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.addEventListener(`dblclick`, (event) =>
      handleEdit(event, cardsInfo.title, index, "title")
    );
    p.innerText = cardsInfo.title;
    let h3 = document.createElement("h3");
    h3.innerText = cardsInfo.category;
    h3.addEventListener(`dblclick`, (event) =>
      handleEdit(event, cardsInfo.category, index, "category")
    );
    li.append(h3, p);

    fragment.appendChild(li);
  });
  root.append(fragment);
}

createUI(cardsData, ul);
