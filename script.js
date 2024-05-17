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
/*
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

src = "https://contador.s12.com.br/ad.js?id=dyZ6w3bZa4aCxC4y"  */

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

// VIDEOS

/*
document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar vídeos do YouTube no container
  function loadYouTubeVideo(container, videoId) {
    // Cria o iframe do YouTube
    const iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/${videoId}`
    iframe.width = "340"
    iframe.height = "315"
    iframe.frameBorder = "0"
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true
    container.innerHTML = "" // Limpa o container antes de adicionar o novo vídeo
    container.appendChild(iframe)
  }

  // IDs dos vídeos do YouTube
  const videoIds = ["TDFydKZ1pXI", "q_FMxi42-co", "qWCrObxTJAE", "GBy5t29r-kg"]

  // Função para verificar e carregar vídeos
  function checkVideos() {
    const videoContainers = document.querySelectorAll(".video-container")
    videoContainers.forEach((container, index) => {
      if (container.children.length === 0) {
        // Se o container está vazio, carrega o vídeo
        loadYouTubeVideo(container, videoIds[index % videoIds.length])
      }
    })
  }

  // Observa mudanças no DOM
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        checkVideos()
      }
    })
  })

  // Configuração do observador
  const config = { childList: true, subtree: true }
  const videoGallery = document.querySelector(".video-gallery")
  observer.observe(videoGallery, config)

  // Verificação inicial
  checkVideos()
}) */

/*

// Variável para armazenar a referência ao player do vídeo ativo
    let currentVideoPlayer = null;

    // Função para pausar o vídeo atual
    function pauseCurrentVideo() {
        if (currentVideoPlayer) {
            currentVideoPlayer.pauseVideo();
        }
    }

    // Função chamada quando um vídeo é clicado
    function onVideoClicked(player) {
        // Pausa o vídeo atual (se houver)
        pauseCurrentVideo();

        // Define o novo vídeo como o vídeo ativo
        currentVideoPlayer = player;

        // Reproduz o novo vídeo
        player.playVideo();
    }

    // Função chamada quando a API do YouTube está pronta
    function onYouTubeIframeAPIReady() {
        // Cria os players para cada vídeo
        const players = [];
        document.querySelectorAll('.youtube-video').forEach(function (iframe) {
            players.push(new YT.Player(iframe, {
                events: {
                    'onStateChange': function (event) {
                        // Verifica se o estado do vídeo mudou para reproduzindo
                        if (event.data === YT.PlayerState.PLAYING) {
                            // Pausa o vídeo atual se outro vídeo começar a reproduzir
                            const currentPlayer = event.target;
                            if (currentPlayer !== currentVideoPlayer) {
                                pauseCurrentVideo();
                                currentVideoPlayer = currentPlayer;
                            }
                        }
                    }
                }
            }));
        });

        // Adiciona o evento de clique para cada vídeo
        players.forEach(function (player) {
            player.getIframe().addEventListener('click', function () {
                onVideoClicked(player);
            });
        });
    }



   // Carregar a API do YouTube
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}



let players = [];

// Função chamada quando a API do YouTube estiver pronta
function onYouTubeIframeAPIReady() {
    // Criar um player para cada vídeo
    videoIds.forEach((videoId, index) => {
        const player = new YT.Player(`video${index + 1}`, {
            //height: '315',
            //width: '360',
            videoId: videoId,
            playerVars: {
                'autoplay': 0, // Não reproduzir automaticamente ao carregar
                'controls': 1 // Mostrar controles do player
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        players.push(player);
    });
}

// Função chamada quando o estado do player muda
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // Pausar os outros players quando um começa a tocar
        const currentPlayer = event.target;
        players.forEach(player => {
            if (player !== currentPlayer && player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            }
        });
    }
}

// Carregar a API do YouTube quando a página carregar
window.onload = loadYouTubeAPI;


*/
