const abrirModal = () => document.getElementById('modal')
    .classList.add('active');

const fecharModal = () => {
    limparCampos();
    document.getElementById('modal').classList.remove('active');
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
    document.getElementById('nome').dataset.indice = 'novo'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

const salvarCliente = () =>{
    if (camposValidos()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value,
        }
        const indice = document.getElementById('nome').dataset.indice
        if (indice == 'novo'){
            criarCliente(cliente)
            atualizarTabela();
            fecharModal();
        } else {
            updateCliente(indice, cliente)
            atualizarTabela()
            fecharModal()
        }
    }
}


const criarLinha = (cliente, indice) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.telefone}</td>
    <td>${cliente.cidade}</td>
    <td>
        <button type="button" class="button green" id="editar-${indice}">Editar</button>
        <button type="button" class="button red" id="deletar-${indice}">Excluir</button>
    </td>
    `
    document.querySelector('#tbCliente>tbody').appendChild(novaLinha);
}

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tbCliente>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha));
}

const atualizarTabela = () => {
    const dbCliente = lerCliente();
    limparTabela();
    dbCliente.forEach(criarLinha);
}

const preencherCampos = (cliente) => {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('nome').dataset.indice = cliente.indice;
}

const editarCliente = (indice) => {
    const cliente = lerCliente()[indice]
    cliente.indice = indice;
    preencherCampos(cliente);
    document.querySelector(".modal-header>h2").textContent  = `Editando ${cliente.nome}`
    abrirModal();
}

const editarDeletar = (event) => {
    if (event.target.type == 'button'){

        const [action, indice] = event.target.id.split('-');

        if (action == 'editar') {
            editarCliente(indice)
        } else {
            const cliente = lerCliente()[indice]
            const respostaCliente = confirm(`Deseja realmente excluir o cliente ${cliente.nome}`)
            if (respostaCliente){
                removerCliente(indice)
                atualizarTabela();
            }
            
        }
    }
    
}


//Eventos    
document.getElementById('cadastrarCliente')
    .addEventListener('click', abrirModal)

document.getElementById('modalFechar')
    .addEventListener('click', fecharModal)

document.getElementById('salvar')
    .addEventListener('click', salvarCliente)

document.querySelector('#tbCliente>tbody')
    .addEventListener('click', editarDeletar)

    document.getElementById('cancelar')
    .addEventListener('click', fecharModal)