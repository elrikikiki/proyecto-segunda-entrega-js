//Constantes troncales
const celularesContenedor = document.getElementById("productos");
const tablitaCarrito = document.getElementById ("tablaCarrito");
const carrito = [];

//Sweet alert
/* const alert = document.querySelector('#btnComprar');
alert.addEventListener ("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada con éxito',
        showConfirmButton: false,
        timer: 2500
      })
}); */

//MODELOS
const celulares = [
    {id: 1,
    nombre: "Iphone 10",
    camara: "90 Mgpx",
    color: "Rojo",
    precio: 15,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_724631-MLA46114990506_052021-O.webp"
    },
    {
    id: 2,
    nombre: "Iphone 11",
    camara: "110 Mgpx",
    color: "Verde",
    precio: 19,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_887203-MLA46114990482_052021-O.webp"
    },
    {
    id: 3,
    nombre: "Iphone 12",
    camara: "120 Mgpx",
    color: "Negro",
    precio: 19,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_784571-MLA45729987876_042021-O.webp"
    },
    {
    id: 4,
    nombre: "Iphone 13",
    camara: "140 Mgpx",
    color: "Rosa",
    precio: 19,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_865499-MLA47781634015_102021-O.webp"
    },
    {
    id: 5,
    nombre: "Redmi 1",
    camara: "60 Mgpx",
    color: "Negro",
    precio: 60,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_981867-MLA48770610134_012022-O.webp"  
    },
    {
    id:6,
    nombre: "Redmi 2 Plus",
    camara: "90 Mgpx",
    color: "Verde",
    precio: 90,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_907253-MLA42638904308_072020-O.webp"    
    },
    {
    id: 7,
    nombre: "Redmi 3",
    camara: "100 Mgpx",
    color: "Verde",
    precio: 80,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_840601-MLA46260165451_062021-O.webp"    
    },
    {
    id: 8,
    nombre: "Redmi 4",
    camara: "180 Mgpx",
    color: "Negro",
    precio: 80,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_706088-MLA49635911561_042022-O.webp"    
    }
];

//CARD
const getCard = (item) => {
    return(`
 <div class="card mt-3 mb-4 container" style="width: 18rem;">
  <img src="${item.imagen}" class="card-img-top" style="height:400px " alt="${item.nombre}">
    <div class="card-body bg-dark border ">
    <h5 class="card-title text-white  ">${item.nombre}</h5>
    <h6 class="card-text text-white ">Cámara: ${item.camara}</h6>
    <h6 class="card-text text-white ">Color: ${item.color}</h6>
    <h6 class="card-text text-white mb-4 ">Precio: $${item.precio} ARS</h6>
    <button onclick= agregarCarrito(${item.id}) class=" bg-success btn ${item.stock ? 'btn-primary' : 'btn-secondary'}" ${!item.stock ? 'disabled' : '' }">Agregar</button></div>
    </div>
    
    `)
    }

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

//Acumulador
const cargarProductos = (datos, loQueseMuestra, isCargaCarrito) => {
    let acumulando = "";
    let objetos = [];
    datos.forEach ((el) =>{
        if(isCargaCarrito == false){
            acumulando += getCard(el);
        }else{
            acumulando += getRow(el);
            objetos.push(el);
        }
    })
    loQueseMuestra.innerHTML = acumulando;
    isCargaCarrito ? localStorage.setItem("carrito",JSON.stringify(objetos)) :'';// se llena el localStorage con los celulares que estan el carrito
};

//CARRITO
const agregarCarrito = (id) => {
    const seleccion = celulares.find (item => item.id === id);
    const buscar = carrito.findIndex(el => el.id === id); // indice del array de carrito 
    if (buscar === -1) { // sino encontro el celular en el carrito hace esto, que es agregarlo en el carrito
    carrito.push ({
        id: seleccion.id,
        nombre: seleccion.nombre,
        color: seleccion.color,
        camara: seleccion.camara,
        precio: seleccion.precio,
        cantidad: 1,
        imagen: seleccion.imagen,
    }) 
    } else { //si lo encontro
    carrito[buscar].cantidad += 1;
    }
    cargarProductos (carrito, tablitaCarrito, true)
} 
cargarProductos (celulares,celularesContenedor, false);

//FETCH
const pagar = async () => {
  const productosToMap = carrito.map(Element => {
      let nuevoElemento = 
      {
          title: Element.nombre,
          description: Element.camara,
          picture_url: Element.imagen,
          category_id: Element.id,
          quantity: Element.cantidad,
          currency_id: "ARS",
          unit_price: Element.precio
      }
      return nuevoElemento
  })
  let response = await fetch("https://api.mercadopago.com/checkout/preferences", {

      method: "POST",
      headers: {
          Authorization: "Bearer TEST-7350660985706799-061611-416dc4b5381169e46f4ec0f147c67aae-140652307"
      },
      body: JSON.stringify({
          items: productosToMap
      })
  })
  let data = await response.json()
  console.log(data)
  window.open(data.init_point, "_blank")
}

/* const pagar = async () => {
    const productosToMap = celulares.map (Element => {
        let nuevoElemento = 
        {

         title: Element.nombre,
         description: Element.camara,
         picture_url: Element.imagen,
         category_id: Element.id,
         quantity: Element.cantidad,
         currency_id: "ARS",
         unit_price: Element.precio 
        }
        return nuevoElemento
    })
    let response = await fetch ("https://api.mercadopago.com/checkout/preferences", {

        method: "POST",
        headers: { 
            Authorization: "Bearer TEST-7028696186065587-061610-688da99d6b2bc6b901f4307bb1c347e5-140652307"
        },
        body: JSON.stringify({items: productosToMap})
    })
    let data = await response.json()
    console.log(data);
    window.open(data.init_point, "_blank")
} */

/* curl -X POST \
    'https://api.mercadopago.com/checkout/preferences' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Content-Type: application/json' \
    -d '{
  "items": [
    {
      "title": "Dummy Title",
      "description": "Dummy description",
      "picture_url": "http://www.myapp.com/myimage.jpg",
      "category_id": "car_electronics",
      "quantity": 1,
      "currency_id": "U$",
      "unit_price": 10
    }
  ],
  "payer": {
    "phone": {},
    "identification": {},
    "address": {}
  },
  "payment_methods": {
    "excluded_payment_methods": [
      {}
    ],
    "excluded_payment_types": [
      {}
    ]
  },
  "shipments": {
    "free_methods": [
      {}
    ],
    "receiver_address": {}
  },
  "back_urls": {},
  "differential_pricing": {},
  "tracks": [
    {
      "type": "google_ad"
    }
  ],
  "metadata": {}
}' */
















/* const mercadoLibre = async () => { */
    /*  let buscador = document.getElementById("buscador") */
    /* let response = await fetch (`https://api.mercadolibre.com/sites/MLA/search/?q=${buscador.value}`) */
    /* let response = await fetch (`https://api.mercadolibre.com/sites/MLA/search/?q=celulares`);
    let data = await response.json();
    let productos = data.results;
    for (const producto of productos) {
        let caja = document.createElement("div");
        caja.innerHTML = 
        `
    <div class="card" style="width: 18rem;">
    <img src="${producto.thumbnail}" class="card-img-top" style="height:200px" alt="${producto.title}">
    <div class="card-body">
    <h5 class="card-title">${producto.title}</h5>
    <p class="card-text">Precio: $${producto.price} ARS</p>
    <p class="card-text">Stock: ${producto.available_quantity}</p>
    <button onclick= agregarLibre () ">Agregar al carrito</button></div>
    </div> 
        `
    document.getElementById("mercadoLibre").append(caja)
    }
}
function agregarLibre() {
    alert("agregado"); 
} */
/* <button onclick= agregarCarrito(${producto.id}) class="btn ${producto.available_quantity ? 'btn-primary' : 'btn-secondary'}" ${!producto.available_quantity ? 'disabled' : '' }">Agregar al carrito</button></div> */