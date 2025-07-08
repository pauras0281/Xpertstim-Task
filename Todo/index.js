let items = JSON.parse(localStorage.getItem('items')) || []

const todoList = document.querySelector("#todo-list");
const button = document.querySelector("button");
var input = document.querySelector("input");
input.focus()

const createTask = () => {
  let text = input.value;
  let id = items.length + 1;

  if(!text){
    return alert("Please enter what you want to add")
  }

  items.push({ id, text });
  localStorage.setItem("items", JSON.stringify(items))
  input.value = "";
  renderList();
};
button.addEventListener("click", createTask);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTask();
  }
});



todoList.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    
    
    const li = event.target.parentElement;
    const idToDelete = parseInt(li.getAttribute("data-id"));
    console.log(idToDelete);
    
    
    items = items.filter(item => item.id !== idToDelete);
    localStorage.setItem("items", JSON.stringify(items));
    renderList();
  }
});




const renderList = () => {
  let list = ""
  
  if(items){
    items.forEach((item) => {
    list += `<li data-id=${item.id}>${item.text}<span>X</span></li>`;
  });
  }
  
  todoList.innerHTML = list;
};

renderList();
