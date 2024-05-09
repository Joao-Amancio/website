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

let slideIndex = 1
showSlides(slideIndex)

function plusSlides(n) {
  showSlides((slideIndex += n))
}

function showSlides(n) {
  let i
  let slides = document.getElementsByClassName("slide")

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
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
