//Procurar botao
document.querySelector("#add-time")
//Quando clicar no botao
.addEventListener('click', cloneField)

//Executar uma ação
function cloneField(){
   //Duplicar os campos. Que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //Limpar os campos
    const fields = newFieldContainer.querySelectorAll('input')

//Para cada campo limpar
fields.forEach(function(field) {
   //pegar o field do momento
   field.value=""
    console.log(field)
})

   //Colocar na página: onde?
   document.querySelector('#schedule-items').appendChild(newFieldContainer)
}