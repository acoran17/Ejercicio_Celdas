const numColores = 2;
const celdasIniciales = 20;
const maxCeldas = 40;
const spawnTime = 2; 

const box = document.getElementById('box'); 
const time = document.getElementById('time'); 
let interval = setInterval(añadir, 2000);

time.textContent = spawnTime;

const colores = [];
for (let i = 0; i < numColores; i++) {
  let color = random(0xFFFFFF).toString(16).padStart(6, '0');
  console.log(color);
  colores.push(`#${color}`);
}

for (let i = 0; i < celdasIniciales; i++) {añadir()}

function random(max) { return Math.floor(Math.random()*max) }

function añadir(){
  const celda = document.createElement('div');
  celda.classList.add('celda');
  celda.style.backgroundColor = colores[random(colores.length)];
  celda.addEventListener('mouseup', (event) => {
    if (event.ctrlKey) {
      cambiar(event);
    } else {
      eliminar(event);
    }
  });
  box.append(celda);
}


function actualizar() {
  if (time.textContent <= 3) time.classList.add("red"); // time < 2
  if (time.textContent == '0') {
    añadir();
    time.textContent = spawnTime;
    time.classList.remove("red");
  } else {
    time.textContent--;
  }
  resultado();
}

function eliminar(event) {
  const target = event.target;
  const elementos = [target];

  let element = target.previousElementSibling;
  while (element && element.style.backgroundColor == target.style.backgroundColor) {
    elementos.push(element)
    element = element.previousElementSibling;
  }

  element = target.nextElementSibling;
  while (element && element.style.backgroundColor == target.style.backgroundColor) {
    elementos.push(element)
    element = element.nextElementSibling;
  }

  if (elementos.length >= 3) {
    elementos.forEach(element => {
      element.remove();
    });
  }
}

function cambiar(event) {
  const target = event.target;
  const previous = target.nextElementSibling;
  if (previous) previous.after(target);
}

function resultado() {
  const celdas = document.getElementsByClassName('celda');
  if (celdas.length == 0 || celdas.length >= maxCeldas) {
    time.textContent = '0';
    clearInterval(interval);
    interval = null;
    if (celdas.length == 0) { 
      alert('WIN');
    }else { 
      if(celdas.length == 40){alert('GAME OVER');}
    }
  }
}