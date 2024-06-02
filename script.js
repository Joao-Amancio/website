// Evento de clique no ícone do menu
document.getElementById("menu-icon").addEventListener("click", function () {
  this.classList.toggle("open")
  var menu = document.getElementById("menu")
  menu.classList.toggle("open")
  if (menu.classList.contains("open")) {
    menu.style.maxHeight = menu.scrollHeight + "px"
  } else {
    menu.style.maxHeight = 0
  }
})

// Evento de clique em cada item do menu
document.querySelectorAll(".menu ul li a").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    var sectionId = this.getAttribute("href").substring(1)
    var targetSection = document.getElementById(sectionId)

    // Esconde todas as seções
    document.querySelectorAll(".w50").forEach((section) => {
      section.style.display = "none"
    })

    // Mostra a seção alvo
    targetSection.style.display = "block"

    // Adiciona a classe 'active' à caixa principal
    document.getElementById("main-boxes").classList.add("active")

    // Fecha o menu quando um item é clicado
    var menu = document.getElementById("menu")
    var menuIcon = document.getElementById("menu-icon")
    if (menu.classList.contains("open")) {
      menu.classList.remove("open")
      menuIcon.classList.remove("open")
      menu.style.maxHeight = 0
    }
  })
})

// Evento de carregamento da página
window.addEventListener("load", function () {
  document.querySelectorAll(".nav").forEach((section) => {
    section.style.display = "block"
  })
  document.getElementById("main-boxes").classList.remove("active")
})

// Evento de redimensionamento da janela
window.addEventListener("resize", function () {
  var menu = document.getElementById("menu")
  var menuIcon = document.getElementById("menu-icon")
  if (window.innerWidth > 768) {
    menu.style.maxHeight = null
    menu.classList.remove("open")
    menuIcon.classList.remove("open")
  } else {
    menu.style.maxHeight = 0
  }
})

// Fecha o menu quando o usuário clica fora dele
window.addEventListener("click", function (event) {
  var menu = document.getElementById("menu")
  var menuIcon = document.getElementById("menu-icon")
  var isMenuOpen = menu.classList.contains("open")
  // Verifica se o clique ocorreu fora do menu e do ícone do menu, e se o menu está aberto
  if (
    isMenuOpen &&
    !menu.contains(event.target) &&
    !menuIcon.contains(event.target)
  ) {
    menu.classList.remove("open") // Remove a classe 'open' do menu
    menuIcon.classList.remove("open") // Remove a classe 'open' do ícone do menu
    menu.style.maxHeight = 0 // Fecha o menu definindo a altura máxima como 0
  }
})

// silde 1
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

// Touch-screen and mouse support
let touchStartX = 0
let touchEndX = 0

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX
}

function handleTouchMove(event) {
  touchEndX = event.changedTouches[0].screenX
}

function handleTouchEnd() {
  if (touchEndX < touchStartX) {
    // Swipe left
    plusSlides(1)
  } else if (touchEndX > touchStartX) {
    // Swipe right
    plusSlides(-1)
  }
}

function handleMouseDown(event) {
  touchStartX = event.screenX
}

function handleMouseUp(event) {
  touchEndX = event.screenX
  if (touchEndX < touchStartX) {
    // Swipe left
    plusSlides(1)
  } else if (touchEndX > touchStartX) {
    // Swipe right
    plusSlides(-1)
  }
}

document.addEventListener("touchstart", handleTouchStart, false)
document.addEventListener("touchmove", handleTouchMove, false)
document.addEventListener("touchend", handleTouchEnd, false)

document.addEventListener("mousedown", handleMouseDown, false)
document.addEventListener("mouseup", handleMouseUp, false)

// slides 2
document.addEventListener("DOMContentLoaded", function () {
  console.log("Initializing Swiper...")
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    spaceBetween: 1,
    grabCursor: true,
  })
  console.log("Swiper initialized:", swiper)
})

// Evento de clique para a seta "Voltar ao topo"
document.addEventListener("DOMContentLoaded", function () {
  var backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block"
    } else {
      backToTopButton.style.display = "none"
    }
  })

  backToTopButton.addEventListener("click", function (event) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
})

//////////////

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

/////////

//animaçoes de div

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".fade-in")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })
})
