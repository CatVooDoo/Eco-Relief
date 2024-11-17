// Получаем элементы модального окна, кнопки и элемента закрытия
const modal1 = document.getElementById("myModal1");
const btn1 = document.getElementById("openModal1");
const span1 = document.getElementById("closeModal1");

// При нажатии на кнопку открываем модальное окно
btn1.onclick = function() {
    modal1.style.display = "block";
}

// При нажатии на элемент <span> (x) закрываем модальное окно
span1.onclick = function() {
    modal1.style.display = "none";
}

// При нажатии в любое место вне модального окна закрываем его
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}


// Получаем элементы модального окна, кнопки и элемента закрытия
const modal2 = document.getElementById("myModal2");
const btn2 = document.getElementById("openModal2");
const span2 = document.getElementById("closeModal2");

// При нажатии на кнопку открываем модальное окно
btn2.onclick = function() {
    modal1.style.display = "block";
}

// При нажатии на элемент <span> (x) закрываем модальное окно
span2.onclick = function() {
    modal1.style.display = "none";
}

// При нажатии в любое место вне модального окна закрываем его
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}


// Получаем элементы модального окна, кнопки и элемента закрытия
const modal3 = document.getElementById("myModal3");
const btn3 = document.getElementById("openModal3");
const span3 = document.getElementById("closeModal3");

// При нажатии на кнопку открываем модальное окно
btn3.onclick = function() {
    modal3.style.display = "block";
}

// При нажатии на элемент <span> (x) закрываем модальное окно
span3.onclick = function() {
    modal3.style.display = "none";
}

// При нажатии в любое место вне модального окна закрываем его
window.onclick = function(event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}

const modal4 = document.getElementById("myModal4");
const btn4 = document.getElementById("openModal4");
const span4 = document.getElementById("closeModal4");

// При нажатии на кнопку открываем модальное окно
btn4.onclick = function() {
    modal4.style.display = "block";
}

// При нажатии на элемент <span> (x) закрываем модальное окно
span4.onclick = function() {
    modal4.style.display = "none";
}

// При нажатии в любое место вне модального окна закрываем его
window.onclick = function(event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}

const modal5 = document.getElementById("myModal5");
const btn5 = document.getElementById("openModal5");
const span5 = document.getElementById("closeModal5");

// При нажатии на кнопку открываем модальное окно
btn5.onclick = function() {
    modal5.style.display = "block";
}

// При нажатии на элемент <span> (x) закрываем модальное окно
span5.onclick = function() {
    modal5.style.display = "none";
}

// При нажатии в любое место вне модального окна закрываем его
window.onclick = function(event) {
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
}