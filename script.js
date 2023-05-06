
const h1Title = document.getElementById("h1_title")
const buttonBuscar = document.getElementById("button")
const cepInput = document.getElementById("cep_input")
const enderecoInput = document.getElementById("endereco")
const bairroInput = document.getElementById("bairro")
const cidadeInput = document.getElementById("cidade")
const ufInput = document.getElementById("uf")
const divForm = document.getElementById("form")
const dddInput = document.getElementById("ddd")


//=========== Validar CEP input ==============//
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode)

    if(!onlyNumbers.test(key)){
        e.preventDefault()
        return
    }
})
//============ Botão de busca ============//
buttonBuscar.addEventListener("click", (e) => {
    
    e.preventDefault()
    const cepInputValue = cepInput.value
    if(cepInput.value === ""){
        cepInput.style.border = "solid 2px red"
    }else{
        cepInput.style.border = "none"
    }
    if(cepInput.value === "" && divForm.style.display === "flex"){
        cepInput.style.border = "none"
    }
    
    if(cepInputValue.length === 8){
        getAddres(cepInputValue)
    }
})

const getAddres = async (cep) => {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
    
    const response = await fetch(apiUrl)
    
    const data = await response.json()
    
    console.log(data)
    
    if(data.error === "true"){
        addressForm.reset()
        return
    }
    
    enderecoInput.innerText = data.logradouro
    bairroInput.innerText = data.bairro
    cidadeInput.innerText = data.localidade
    ufInput.innerText = data.uf
    dddInput.innerText = data.ddd
    divForm.style.display = "flex"
    cepInput.value = ""
}

cepInput.addEventListener("click", () => {
    divForm.style.display = "none"
})