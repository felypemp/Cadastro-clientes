const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

const tempCliente ={
    nome: "Luciana",
    email: "Lua@gmail.com",
    celular: "(71) 9 9999-9999",
    cidade: "São Paulo"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbCliente')) ?? [];
const setLocalStorage = (dbCliente) => localStorage.setItem("dbCliente", JSON.stringify(dbCliente));

//CRUD - CREATE
const criarCliente = (cliente) => {
    const dbCliente = getLocalStorage();
    dbCliente.push (cliente)
    setLocalStorage(dbCliente);
} 

//Eventos    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalFechar')
    .addEventListener('click', closeModal)