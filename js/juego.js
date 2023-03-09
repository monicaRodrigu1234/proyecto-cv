

// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Acá vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas está en la posición ganadora
function chequearSiGano(){

   var ganador = false;
  var valoresOriginales = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  for(var i =0; i <valoresOriginales.length; i++){
    for(var j = 0; j < valoresOriginales.length; j++)
    {
      var valor1 = grilla[i][j];
      var valor2 = valoresOriginales[i][j];
      if(valor1 == valor2){
        ganador = true;
      }else{
        return false;
      }
    }
  }
  return ganador;
 
}




// esta función muestra el cartel "ganaste"
function mostrarCartelGanador(){
 document.getElementById('ganaste').src="imagenesjuego/ganaste.jpg";
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){

  //  trae el valor de la pieza vacia que va a ser el 9 
  var a = grilla[fila1][columna1];
  // trae el valor de la pieza asi la reemplazamos donde ANTES estaba el 9
  var b = grilla[fila2][columna2];

  grilla[fila1][columna1] = b;
  // Le seteamos el 9 (la posicion vacia) donde antes estaba la posicion
  grilla[fila2][columna2] = a;

  var valor1 = grilla[fila1][columna1];
  var valor2 = grilla[fila2][columna2];

 var img = document.getElementById(a);
 var imgClone = img.cloneNode();
 var padre = img.parentNode;

 var imagen = document.getElementById(b);
 var imagenClone = imagen.cloneNode();
 var padreImagen = imagen.parentNode;
 
 padre.replaceChild(imagenClone, img);
 padreImagen.replaceChild(imgClone, imagen);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
 posicionVacia.columna = nuevaColumna;
 posicionVacia.fila = nuevaFila;

}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
var tamanio = grilla.length;

if((fila >= 0 && columna >= 0) && (fila < tamanio && columna < tamanio)){
  return true;
}else{
  return false;
}

}

// Movimiento de fichas, en este caso la que se mueve es la verde intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;

  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    // Completar
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia 
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }

}



// mezcla las piezas al azar

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

//captura la tecla que se presiona
function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();  
        },500);
      } 
      evento.preventDefault();
    }
  })
}

function iniciar(){
document.getElementById('ganaste').src="";
  mezclarPiezas(60);
  capturarTeclas();
}
