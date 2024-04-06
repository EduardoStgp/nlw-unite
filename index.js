
let participantes = [
    {
        nome: "Eduardo Sousa",
        email: "eduardo@gmail.com",
        datadeInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckin: null
    },
   {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        datadeInscricao: new Date(2024, 1, 18, 19, 23),
        dataCheckin: new Date(2024, 2, 20, 20, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        datadeInscricao: new Date(2024, 1, 1, 23, 0),
        dataCheckin: new Date(2024, 2, 1, 20, 20)
    },
    {
        nome: "Maria Silva",
        email: "maria@gmail.com",
        datadeInscricao: new Date(2024, 1, 10, 10, 30),
        dataCheckin: new Date(2024, 2, 11, 8, 45)
    },
    {
        nome: "João Oliveira",
        email: "joao@gmail.com",
        datadeInscricao: new Date(2024, 1, 5, 15, 0),
        dataCheckin: new Date(2024, 2, 6, 9, 30)
    },
    {
        nome: "Ana Souza",
        email: "ana@gmail.com",
        datadeInscricao: new Date(2024, 1, 20, 14, 0),
        dataCheckin: new Date(2024, 2, 22, 10, 0)
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        datadeInscricao: new Date(2024, 1, 3, 8, 30),
        dataCheckin: new Date(2024, 2, 4, 11, 15)
    },
    {
        nome: "Carla Lima",
        email: "carla@gmail.com",
        datadeInscricao: new Date(2024, 2, 12, 16, 45),
        dataCheckin: new Date(2024, 2, 13, 9, 0)
    },
    {
        nome: "Rafaela Costa",
        email: "rafaela@gmail.com",
        datadeInscricao: new Date(2024, 1, 8, 12, 0),
        dataCheckin: new Date(2024, 2, 12, 10, 30)
    },
    {
        nome: "Fernando Almeida",
        email: "fernando@gmail.com",
        datadeInscricao: new Date(2024, 1, 25, 17, 0),
        dataCheckin: new Date(2024, 2, 26, 9, 45)
    },
    {
        nome: "Luciana Santos",
        email: "luciana@gmail.com",
        datadeInscricao: new Date(2024, 1, 1, 20, 0),
        dataCheckin: new Date(2024, 3, 2, 12, 30)
    }
]

const criarNovoParticipante = (participante) => {
  const datadeInscricao = dayjs(Date.now()).to(participante.datadeInscricao) 
   
   let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin)
   if(participante.dataCheckin == null){
    dataCheckin = `
    <button
     data-email="${participante.email}"
     onclick="fazerCheckin(event)"
    >
     Confirma check-in
    </button>
    `
   }

   return `
    <tr>
      <td>
        <strong>
            ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email}
          </small>
          </td>
      <td>${datadeInscricao}</td>
      <td>${dataCheckin}</td>
    </tr>
   `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
   output = output + criarNovoParticipante(participante)
  }
   document
   .querySelector('tbody')
   .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) =>{
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    datadeInscricao: new Date(),
    dataCheckin: null

  }

  const participanteExiste = participantes.find(
    (p)=> {
    return p.email == participante.email
    }
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }
  participantes = [participante, ...participantes]

  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckin = (event) => {
    const mensagemConfirmacao ='Tem Certeza que deseja fazer o Check-In?'

    if(confirm(mensagemConfirmacao) == false){
        return
    }

    const participante = participantes.find((p) =>{
        return p.email == event.target.dataset.email
    })

    participante.dataCheckin = new Date()

    atualizarLista(participantes)
}