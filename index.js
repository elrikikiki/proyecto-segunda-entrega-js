//Constantes troncales
const celularesContenedor = document.getElementById("productos");
const tablitaCarrito = document.getElementById ("tablaCarrito");
const carrito = [];

//LOCAL STORAGE
function cargarLocalStorage() {
    let carritoVacio = [];

    localStorage.setItem("carrito",JSON.stringify(carritoVacio));
}
/* cargarLocalStorage() una vez que le doy en comprar, ahi lo activo a esto asi se refresca todo*/
function agregar(celularProducto) {
    let vacio = JSON.parse(localStorage.getItem("carrito"));
    let celu = {id: vacio.length + 1, nombre: celularProducto};
    vacio.push(celu);
    localStorage.setItem("carrito",JSON.stringify(vacio));
}
/* let celularProducto = 
agregar(celularProducto); */

//Sweet alert
const alert = document.querySelector('#btnComprar');
alert.addEventListener ("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada con éxito',
        showConfirmButton: false,
        timer: 2500
      })
});
//FETCH
const fechito = document.getElementById("fetch");
fetch ('/data.json')
.then((res) => res.json())
.then((data) => {
    data.forEach((producto) => {
        const parrafo = document.createElement('p')
        parrafo.innerHTML =
        `
        <div class="card mb-3">
        <img src="${producto.imagen}" style="width: 100px" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.producto}</h5>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-text"><small class="text-muted">${producto.color}</small></p>
            <button class="btn 'btn-primary' 'btn-secondary'">Agregar al carrito</button>
        </div>
        </div>
        `
    fechito.append(parrafo)
    })
})

//MODELOS
const Celulares = [
    {id: 1,
    nombre: "Iphone 10",
    camara: "90 Mgpx",
    color: "Rojo",
    precio: 150000,
    stock: 10,
    imagen: "https://i.blogs.es/28ee16/artboard/1024_2000.jpg"
    },
    {
    id: 2,
    nombre: "Iphone 11",
    camara: "110 Mgpx",
    color: "Verde",
    precio: 190000,
    stock: 5,
    imagen: "https://m.media-amazon.com/images/I/51HFI5SiQOL._AC_SL1000_.jpg"
    },
    {
    id: 3,
    nombre: "Redmi 1",
    camara: "60 Mgpx",
    color: "Negro",
    precio: 60000,
    stock: 7,
    imagen: "https://cdn-files.kimovil.com/phone_front/0001/01/thumb_915_phone_front_big.jpeg"  
    },
    {
    id: 4,
    nombre: "Redmi 2",
    camara: "80 Mgpx",
    color: "Negro",
    precio: 80000,
    stock: 20,
    imagen: "https://hardzone.es/app/uploads-hardzone.es/2015/07/Xiaomi-Redmi-2-Pro-930x452.jpg"    
    }
];

//CARD
const getCard = (item) => {
    return(`
 <div class="card" style="width: 18rem;">
  <img src="${item.imagen}" class="card-img-top" style="height:200px" alt="${item.nombre}">
    <div class="card-body">
    <h5 class="card-title">${item.nombre}</h5>
    <p class="card-text">Cámara: ${item.camara}</p>
    <p class="card-text">Color: ${item.color}</p>
    <p class="card-text">Precio: $${item.precio} ARS</p>
    <p class="card-text">Stock: ${item.stock}</p>
    <button onclick= agregarCarrito(${item.id}) class="btn ${item.stock ? 'btn-primary' : 'btn-secondary'}" ${!item.stock ? 'disabled' : '' }">Agregar al carrito</button></div>
    </div>
    `)
    }
/* const botoncito = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
} */
// Segunda card
const getRow = (item) => {
    return (
        `
        <tr>
              <th scope="row">${item.id}</th>
              <td>${item.nombre}</td>
              <td>${item.color}</td>
              <td>$${item.precio * item.cantidad}($${item.precio})</td>
              <td>${item.cantidad}</td>
              <td><img style="width: 20px" src= "${item.imagen}" alt= "imagen"></td>
        </tr>
        `
    )
}
//acumulador
const cargarProductos = (datos, loQueseMuestra, tablita) => {
    let acumulando = "";
    datos.forEach ((el) =>{
        acumulando += tablita ? getRow(el) : getCard(el);
    })
    loQueseMuestra.innerHTML = acumulando;
};

//CARRITO
const agregarCarrito = (id) => {
    const seleccion = Celulares.find (item => item.id === id);
    const buscar = carrito.findIndex(el => el.id === id);
    if (buscar === -1) {
    carrito.push ({
        id: seleccion.id,
        nombre: seleccion.nombre,
        color: seleccion.color,
        camara: seleccion.camara,
        precio: seleccion.precio,
        cantidad: 1,
        imagen: seleccion.imagen,
    })
    } else {
    carrito[buscar].cantidad = carrito [buscar].cantidad + 1
}
    cargarProductos (carrito, tablitaCarrito, true)
}

cargarProductos (Celulares,celularesContenedor, false);






