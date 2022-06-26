const contenedor = document.querySelector('.contenedor')
//Definicion de medidas
const altoTablero = 300
const anchoTablero = 570
const altoBloque = 20
const anchoBloque = 265
let endGame = false

//Definicion de la clase bloque
class Bloque{
    constructor(ejeX, ejeY){
        this.bottomLeft = [ejeX, ejeY]
        this.bottomRigth = [ejeX + anchoBloque, ejeY]
        this.topLeft = [ejeX, ejeY + altoBloque]
        this.topRigth = [ejeX + anchoBloque, ejeY + altoBloque]

    }
}
//Definir todos los bloques que
const bloques  = [
    new Bloque(10, 50),
    new Bloque(295, 50),
    new Bloque(235, 150)
]
//Funcion añadir bloques que
function addBloques(){
    for(let i = 0; i < bloques.length; i++){
        const bloque = document.createElement('div')
            try { 
                if (i == 2) bloque.style.width = '100px'
            } catch (error) {
                console.error(error);
            }
            bloque.classList.add('bloque')
            bloque.style.left = bloques[i].bottomLeft[0] + 'px'
            bloque.style.bottom = bloques[i].bottomLeft[1] + 'px'
            contenedor.appendChild(bloque)   
    }
}
// a;adir bloques
addBloques()

//definir posicion usuario
var lastItem = bloques[2]
const posicionInicialUsuario = [275, 190]
let posicionActualUsuario = posicionInicialUsuario

let xDireccion = 0
let yDireccion = -1
let diametro = 20
let timerID

//definir usuario
function dibujarUsuario(){
    usuario.style.left = posicionActualUsuario[0] + 'px'
    usuario.style.bottom = posicionActualUsuario[1] + 'px'
}
//a;adir usuario
const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarUsuario()

function restartGame() {
    posicionActualUsuario = posicionInicialUsuario
    endGame = false
}

function moverUsuario2(){
    posicionActualUsuario[0] += xDireccion
    posicionActualUsuario[1] += yDireccion
    revisarColisiones()
    dibujarUsuario()
}

timerId = setInterval(moverUsuario2, 20)
var isFirstTime = false

function moverUsuario(e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualUsuario[0] > 0){
                posicionActualUsuario[0] -= 10
                dibujarUsuario()
            }
            break
        case 'ArrowRight':
            if(posicionActualUsuario[0] < (anchoTablero - 20)){
                posicionActualUsuario[0] += 10
                dibujarUsuario()
            }
            break
    }
}

//Añadir evento escuchador para el documento de
document.addEventListener('keydown', moverUsuario)

function revisarColisiones(){
 
    for (let i = 0; i < bloques.length; i++) { 
        if ((posicionActualUsuario[0] > bloques[i].topLeft[0] - diametro &&
            posicionActualUsuario[0] < (bloques[i].topRigth[0].width - 165 )) &&
           ((posicionActualUsuario[1]  + diametro) > bloques[i].bottomLeft[1] &&
           posicionActualUsuario[1] < bloques[i].topLeft[1])
    ) {
        console.log("THIS IS THE INDEX", i)
        yDireccion = 0
    } else { 
        if (i == 2) { return }
        yDireccion = -1
        siConEstoNoFuncionaEstaMalHechoEsteLenguajeParaJuegos()
        }
    }

    //Colisiones con las paredes
    if(
        posicionActualUsuario[0] >= (anchoTablero - diametro) ||
        posicionActualUsuario[1] >= (altoTablero - diametro) ||
        posicionActualUsuario[0] <= 0 ||
        posicionActualUsuario[1] <= 0
    ){
        xDireccion = 0
        yDireccion = 0
    }
}

function siConEstoNoFuncionaEstaMalHechoEsteLenguajeParaJuegos() {
    let padding = 0
    //Colision con bloques
    for (let i = 0; i < bloques.length; i++){
        if (i==2) padding = 165
        else padding = 0
        if      ((posicionActualUsuario[0] > bloques[i].bottomLeft[0] &&
                posicionActualUsuario[0] < bloques[i].bottomRigth[0] - padding) &&
                ((posicionActualUsuario[1]  + diametro) > bloques[i].bottomLeft[1] &&
                posicionActualUsuario[1] < bloques[i].topLeft[1])
    ) { 
            xDireccion = 0
            yDireccion = 0
            console.log("THIS IS THE ON THE STUPID FUNCTION", i)
            gameOver(i)
        } 
    }
}

function gameOver(currentIndex) { 
    if (currentIndex == 1) {
        clearInterval(timerId)
        window.alert("ERES MATEMATICO")
        document.removeEventListener('keydown', moverUsuario)
    } else if (currentIndex == 0) {
        currentIndex = -10
        window.alert("ERA 2+2...")
        }
}