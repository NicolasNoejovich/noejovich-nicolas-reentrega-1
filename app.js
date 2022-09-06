const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

fetch("./stock.json")
.then(response => response.json())
.then(productos => {
    productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} alt= "">
        <h3>${producto.nombre}</h3>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div)

})



document.addEventListener('contenido', () => {
     localStorage.getItem('carrito')
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
)

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    setTimeout(()=>{
        Swal.fire({
            icon: 'success',
        title: '¡El carrito fue vaciado con exito!',
        text: 'Esperamos que lo llene nuevamente',
           
          })
    },300);     

})



    
    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
       
        agregarAlCarrito(producto.id)
        setTimeout(()=>{
            Swal.fire({
                icon: 'success',
                title: 'El producto fue añadido correctamente'
               
              })
        },300);     
    })
})


const agregarAlCarrito = (prodId) => {

    const carrillo = carrito.some (prod => prod.id === prodId) 
    if (carrillo){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 
    setTimeout(()=>{
        Swal.fire({
            icon: 'success',
            title: 'El producto fue eliminado correctamente'
           
          } );
    
    },300);
    
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
   
    contadorCarrito.innerText = carrito.length 

    console.log(carrito)
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    

}

const cargarNaruto = async () => {

    try{
        const respuesta = await fetch (`https://naruto-api.herokuapp.com/api/v1/characters`)
        if(respuesta.status === 200){
            const datos = await respuesta.json()
            console.log(datos)

           datos.forEach(datos => {
           const naruto =  document.getElementById(`narutos`)
           const li = document.createElement("li")
           li.innerHTML=`
           <h6 class="nombres container list-group-item list-group-item-warning pb-3 nombresHover" >${datos.name}</h6>
           `
           naruto.appendChild(li)
            })

        
        } else if (respuesta.status === 401){
            console.log("Sin conexión")
    } else if (respuesta.status === 404){
        console.log("No existe ese personaje")
    } else {
        console.log("fatal error")
    }


    } catch (error){

        console.log(error)
    }


}
cargarNaruto()


