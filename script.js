const formulario = document.querySelector("#formulario")
const nome = document.querySelector("#nome")
const telefone = document.querySelector("#telefone")
const email = document.querySelector("#email")
const listaContatos = document.querySelector("#listaContatos")

let botaoEditar

function montarContatoCard(contato, id) {
    const novoContato = document.createElement("div")
    novoContato.classList.add("contato")
    novoContato.setAttribute("data-id", id)

    const nomeContato = document.createElement("h2")
    nomeContato.textContent = `Nome: ${contato.nome}`

    const telefoneContato = document.createElement("p")
    telefoneContato.textContent = `Telefone: ${contato.telefone}`

    const emailContato = document.createElement("p")
    emailContato.textContent = `E-mail: ${contato.email}`

    const botaoEditar = document.createElement("button")
    botaoEditar.textContent = "Editar"
    botaoEditar.addEventListener("click", () => editarContato(id)) // Corrigindo o escopo do botaoEditar
    
    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir"
    botaoExcluir.addEventListener("click", () => excluirContato(id))

    novoContato.appendChild(nomeContato)
    novoContato.appendChild(telefoneContato)
    novoContato.appendChild(emailContato)
    novoContato.appendChild(botaoEditar)
    novoContato.appendChild(botaoExcluir)

    listaContatos.appendChild(novoContato)
}
function adicionarContato(e) {
    e.preventDefault()

    const novoContato = {
        id: obterProximoId(), 
        nome: nome.value,
        telefone: telefone.value,
        email: email.value
    }

    const contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || []
    contatosSalvos.push(novoContato)

    localStorage.setItem('contatos', JSON.stringify(contatosSalvos))

    montarContatoCard(novoContato, novoContato.id - 1)

    nome.value = ""
    telefone.value = ""
    email.value = ""
    nome.focus()
}
function obterProximoId() {
    const contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || []
    if (contatosSalvos.length === 0) {
        return 1
    } else {
        return contatosSalvos[contatosSalvos.length - 1].id + 1
    }
}
function excluirContato(id) {
    const contatos = document.querySelectorAll(".contato")
    contatos.forEach(contato => contato.getAttribute("data-id") == id && contato.remove())
    const contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || []
    const novoContatos = contatosSalvos.filter((_, index) => index != id) 
    localStorage.setItem('contatos', JSON.stringify(novoContatos))
}
function carregarContatos() {
    const contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || []
    contatosSalvos.forEach((contato, index) => {
        montarContatoCard(contato, index)
    })
}
function editarContato(id) {
    const contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || []
    const contato = contatosSalvos.find(contato => contato.id === id)
    
    sessionStorage.setItem('contatoEditado', JSON.stringify(contato))
    
    window.location.href = "editar_contato.html"
}

botaoEditar.addEventListener("click", () => editarContato(id))

document.addEventListener('DOMContentLoaded', () => carregarContatos())

formulario.addEventListener('submit', adicionarContato)