// script.js

// Função para abrir a página com base no ID da seção
function openPage(pageId) {
  // Esconde todas as seções
  var sections = document.getElementsByTagName("section")
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none"
  }

  // Mostra apenas a seção com o ID correspondente
  document.getElementById(pageId).style.display = "block"
}

// Função para alternar o menu
function toggleMenu() {
  var nav = document.querySelector(".nav")
  nav.classList.toggle("active")

  // Adiciona um event listener para fechar o menu quando clicar fora
  if (nav.classList.contains("active")) {
    document.addEventListener("click", closeMenuOutside)
  } else {
    document.removeEventListener("click", closeMenuOutside)
  }
}

//

let slideIndex = 0
const slides = document.getElementsByClassName("slide")

showSlides()

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  slideIndex++
  if (slideIndex > slides.length) {
    slideIndex = 1
  }

  slides[slideIndex - 1].style.display = "block"
  setTimeout(showSlides, 5000) // Muda a cada 5 segundos
}

function plusSlides(n) {
  slideIndex += n
  if (slideIndex > slides.length) {
    slideIndex = 1
  } else if (slideIndex < 1) {
    slideIndex = slides.length
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  slides[slideIndex - 1].style.display = "block"
}



// Função para recuperar o valor atual do contador do armazenamento local
function getCounter() {
  return localStorage.getItem("visits") || 0
}

// Função para incrementar o contador de visitas e atualizar a exibição
function incrementCounter() {
  let counter = parseInt(getCounter())
  counter++
  localStorage.setItem("visits", counter)
  document.getElementById("counter").textContent = counter
}

// Ao carregar a página, incrementar o contador de visitas
window.onload = function () {
  incrementCounter()
}

src = "https://contador.s12.com.br/ad.js?id=dyZ6w3bZa4aCxC4y"
