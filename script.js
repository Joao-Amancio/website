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

/////////////

class FormSubmit {
  constructor(settings) {
    this.settings = settings
    this.form = document.querySelector(settings.form)
    this.formButton = document.querySelector(settings.button)
    if (this.form) {
      this.url = this.form.getAttribute("action")
    }
    this.sendForm = this.sendForm.bind(this)
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success
  }

  displayError() {
    this.form.innerHTML = this.settings.error
  }

  getFormObject() {
    const formObject = {}
    const fields = this.form.querySelectorAll("[name]")
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value
    })
    return formObject
  }

  onSubmission(event) {
    event.preventDefault()
    event.target.disabled = true
    event.target.innerText = "Enviando..."
  }

  async sendForm(event) {
    try {
      this.onSubmission(event)
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      })
      this.displaySuccess()
    } catch (error) {
      this.displayError()
      throw new Error(error)
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm)
    return this
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
})
formSubmit.init()
