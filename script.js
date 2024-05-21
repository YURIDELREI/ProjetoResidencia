const playlist = [
    {
      titulo: "For Whom The Bell Tolls",
      artista: "Metallica",
      arquivo: "imgmusica/For Whom The Bell Tolls (Remastered) - Metallica.mp3",
      imagem: "imgmusica/metalica 1.png"
    },
    {
        titulo: "Sonne",
        artista: "Rammstein",
        arquivo: "imgmusica/Sonne - Rammstein.mp3",
        imagem: "imgmusica/rammustem .png"
    },
    {
      titulo: "Duality",
      artista: "Slipknot",
      arquivo: "imgmusica/Slipknot - Duality [OFFICIAL VIDEO] [HD] - Slipknot.mp3",
      imagem: "imgmusica/slipknot 1.png"
    }
  ];

const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const buttonAvancar = document.getElementById('avancar');
const buttonVoltar = document.getElementById('voltar');

const musicTitle = document.querySelector('.desc-musica p');
const musicArtist = document.querySelector('.desc-musica span');
const musicImage = document.querySelector('.conteudo-musica img');
const cardPlayer = document.querySelector('.card-player');


const music = new Audio();
let interval;
let currentIndex = 0;


function carregarMusica(currentIndex) {
  const musica = playlist[currentIndex];
  musicTitle.textContent = musica.titulo;
  musicArtist.textContent = musica.artista;
  musicImage.src = musica.imagem;
  music.src = musica.arquivo;
  
  music.addEventListener('loadedmetadata', function() {
    tempoTotal.textContent = formatarTempo(music.duration);
  });
  
  tempoAtual.textContent = "00:00";
  progressBar.value = 0;

  cardPlayer.classList.remove('TheBell', 'Sonne', 'Duallity');

  if (currentIndex === 0) {
    cardPlayer.classList.add('TheBell');
  } else if (currentIndex === 1) {
    cardPlayer.classList.add('Sonne');
  } else if (currentIndex === 2) {
    cardPlayer.classList.add('Duallity');
  }  
}

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

function avancar() {
  currentIndex = (currentIndex + 1) % playlist.length; 
  carregarMusica(currentIndex);
  play();
}
  
function play() {
  buttonPlay.classList.toggle('hide');
  buttonPause.classList.toggle('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}

function pause() {
  buttonPlay.classList.toggle('hide');
  buttonPause.classList.toggle('hide');
  music.pause();
  clearInterval(interval);
}

function voltar() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  carregarMusica(currentIndex);
  play();
}

function setProgress(){
  const progressBarra = progressBar.value;
  const tempo = (progressBarra/100)* music.duration;
  music.currentTime = tempo;
}

carregarMusica(currentIndex); 
buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
buttonAvancar.addEventListener('click', avancar);
buttonVoltar.addEventListener('click', voltar);
progressBar.addEventListener('input', setProgress);