let data = getData();
data.map(item => createItem(item.text, item.done));

function clearData() {
    localStorage.setItem("data", JSON.stringify(
        getData().filter(item => !item.done)
    ));
}

function getData() {
    return JSON.parse(localStorage.getItem("data")) || [];
}

function saveData(text) {
    let data = getData();
    data.push({ text, done: false });
    localStorage.setItem("data", JSON.stringify(data));
}

function deleteData(text) {
    let data = getData();
    let result = data.filter(item => item.text != text);
    localStorage.setItem("data", JSON.stringify(result));
}

function checkData(text) {
    let data = getData();
    let result = data.map(item => {
        if (item.text == text) item.done = true;
        return item;
    });

    localStorage.setItem("data", JSON.stringify(result));
}

function updateCount() {
    document.querySelector(".badge").textContent =
        document.querySelectorAll("#todo li").length;
}

// document.getElementById('clear').addEventListener('click', function() {
//     let doneList = document.getElementById('done');
//     while (doneList.firstChild) {
//     doneList.removeChild(doneList.firstChild);
// }
// });

// document.querySelector("#clear").onclick = () => {
//     document.querySelector("#done").innerHTML = "";
// }

document.querySelector("#clear").onclick = () => {
    document.querySelector("#done").textContent = "";
    clearData();
};


document.querySelector("#add").onclick = () => {
    let text = document.querySelector("input").value;
    if (text == "") return false;

    createItem(text);
    updateCount();
    saveData(text);

    document.querySelector("input").value = "";
    document.querySelector("input").focus();
}
document.querySelector("input").onkeydown = e => {
    if (e.key == "Enter") {
        document.querySelector("#add").onclick();
    }
}
function createItem(text, done = false) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = text;

    let check = document.createElement("a");
    check.classList.add("fa-solid", "fa-check", "float-start", "text-info", "pe-4");
    check.setAttribute("href", "#");
    check.onclick = () => {
        document.querySelector("#done").appendChild(li);
        check.remove();
        updateCount();
        checkData(text);
    }
    if (!done) li.appendChild(check);


    let del = document.createElement("a");
    del.classList.add("fa-solid", "fa-trash", "float-end", "text-danger");
    del.setAttribute("href", "#");
    // del.textContent = "Delete";
    del.onclick = () => {
        li.remove();
        updateCount();
        deleteData(text);
    }

    li.appendChild(del);

    if (done) {
        document.querySelector("#done").appendChild(li);
    } else {
        document.querySelector("#todo").appendChild(li);
    }

    // document.querySelector("#todo").appendChild(li);
}