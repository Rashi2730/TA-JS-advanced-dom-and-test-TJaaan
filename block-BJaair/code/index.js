let container = document.querySelector("ul");
let form = document.querySelector("form");
let inputTitle = document.querySelector(".title");
let inputCategory = document.querySelector(".category");
// let title = document.querySelector("h3");

let area = "";

function addNotice() {
  let list = document.createElement("li");
  let h3 = document.createElement("h3");
  h3.innerText = inputCategory.value;
  let p = document.createElement("p");
  p.innerText = inputTitle.value;

  list.append(h3, p);
  container.append(list);

  //   h3.addEventListener("ondblclick", () => {
  //     area = document.createElement("textarea");
  //     area.value = this.innerHTML;
  //   });
  list.ondblclick = function () {
    editStart();
  };
  function editStart() {
    area = document.createElement("textarea");
    area.className = "edit";
    area.value = list.innerHTML;

    area.onkeydown = function (event) {
      if (event.key == "Enter") {
        this.blur();
      }
    };

    area.onblur = function () {
      editEnd();
    };

    list.replaceWith(area);
    area.focus();
  }
  function editEnd() {
    list.innerHTML = area.value;
    area.replaceWith(list);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNotice();
});
