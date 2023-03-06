// PRODUCTOS:

const productosArray = [
    {
        id: "producto 01",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-violetas-37.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },

    {
        id: "producto 02",
        titulo: "Sandalias Eclipse",
        imagen: "./img/productos/cruzadas-fucsia_37.jpg",
        categoria: {
            nombre: "Sandalias Eclipse",
            id: "eclipse"
        },
        precio: 16999
    },

    {
        id: "producto 03",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-turquesa-38-y-39.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },

    {
        id: "producto 04",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-amarillas-40.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },

    {
        id: "producto 05",
        titulo: "Sandalias Eclipse",
        imagen: "./img/productos/cruzadas-rojas-37.jpg",
        categoria: {
            nombre: "Sandalias Eclipse",
            id: "eclipse"
        },
        precio: 16999
    },

    {
        id: "producto 06",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-azules-37.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },

    {
        id: "producto 07",
        titulo: "Sandalias Eclipse",
        imagen: "./img/productos/cruzadas-fucsia-38.jpg",
        categoria: {
            nombre: "Sandalias Eclipse",
            id: "eclipse"
        },
        precio: 16999
    },

    {
        id: "producto 08",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-azules-38.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },

    {
        id: "producto 09",
        titulo: "Sandalias Eclipse",
        imagen: "./img/productos/cruzadas-azules-40.jpg",
        categoria: {
            nombre: "Sandalias Eclipse",
            id: "eclipse"
        },
        precio: 16999
    },

    {
        id: "producto 10",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-sandia-38.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },
    
    {
        id: "producto 11",
        titulo: "Sandalias Eclipse",
        imagen: "./img/productos/cruzadas-azules-36.jpg",
        categoria: {
            nombre: "Sandalias Eclipse",
            id: "eclipse"
        },
        precio: 16999
    },
        
    {
        id: "producto 12",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-fucsia-39.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },
            
    {
        id: "producto 13",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-rojas-talle-38.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },
            
    {
        id: "producto 14",
        titulo: "Sandalias Aurora",
        imagen: "./img/productos/dedo-fucsia-37.jpg",
        categoria: {
            nombre: "Sandalias Aurora",
            id: "aurora"
        },
        precio: 16999
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto =>{
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML= `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h2 class="producto-titulo">${producto.titulo}</h2>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();

}

cargarProductos(productosArray);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productosArray.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productosArray.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productosArray);
        }


    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);

if(productosEnCarrito.some(producto => producto.id === idBoton)){
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;

} else{
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
}
actualizarNumerito();
console.log(productosEnCarrito);

localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}