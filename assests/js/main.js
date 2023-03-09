const abrirModal = () => document.getElementById('modal')
    .classList.add('active');

const fecharModal = () => {
    limparCampos();
    document.getElementById('modal').classList.remove('active');
}

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

const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-field')
    campos.forEach(campo => campo.value = "");
}

const salvarCliente = () =>{
    if (camposValidos()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value,
        }

        criarCliente(cliente)
        fecharModal();
        
    }
}

//Eventos    
document.getElementById('cadastrarCliente')
    .addEventListener('click', abrirModal)

document.getElementById('modalFechar')
    .addEventListener('click', fecharModal)

document.getElementById('salvar')
    .addEventListener('click', salvarCliente)