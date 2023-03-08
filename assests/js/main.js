const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

const tempCliente ={
    nome: "joão",
    email: "J@gmail.com",
    celular: "(71) 9 9999-9999",
    cidade: "São Paulo"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbCliente')) ?? [];
const setLocalStorage = (dbCliente) => localStorage.setItem("dbCliente", JSON.stringify(dbCliente));

//CRUD - DELETE
const removerCliente = (index) =>{
    const dbCliente = lerCliente();
    dbCliente.splice(index, 1);
    setLocalStorage(dbCliente);
}

//CRUD - UPDATE
const updateCliente = (index, cliente) =>{
    const dbCliente = lerCliente();
    dbCliente[index] = cliente;
    setLocalStorage(dbCliente);
}


//CRUD - READ
const lerCliente = () => getLocalStorage();

//CRUD - CREATE
const criarCliente = (cliente) => {
    const dbCliente = getLocalStorage();
    dbCliente.push (cliente)
    setLocalStorage(dbCliente);
} 

//Validando campos do formulário
const camposValidos = () =>{
    return document.getElementById('formulario').reportValidity();
}

//Interação com o Layout
const salvarCliente = () =>{
    if (camposValidos()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value,
        }

        criarCliente(cliente)
        alert("Cliente cadastrado com sucesso!");
    }
}

//Eventos    
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalFechar')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', salvarCliente)