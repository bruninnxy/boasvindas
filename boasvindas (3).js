const axios = require('axios');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Mapeamento dos cursos e seus IDs de arquivos no Google Drive (Substitua pelos IDs reais)
const apostilas = {
  "3DS MAX 2020": "1Ib2eZKWwDVGrpUgmKf438Sc-AtTy7N5Y", 
  "ADMINISTRATIVO INFORMATIZADO V3": "11PreFa6DP3gTGf0rQ9UdYM0zw8QXDtFh",
  "ADMINISTRATIVO INFORMATIZADO V4 FAST": "1qJ0z18iD1mbD12vZptkWCxMn8fuMswks",
  "ADMINISTRATIVO INFORMATIZADO V4": "1VaLh6_tjPp3jtq5En98LWsEzKJVq1cEx",
  "ADMINISTRATIVO" : "1us1eb_hABS_Rq7L4RBxypkhmqBAdo6e5",
"ADMINISTRATIVO INFORMATIZADO V4 FAST.pdf" : "1qJ0z18iD1mbD12vZptkWCxMn8fuMswks",
"GUIA DE PREVENÇÃO AO COVID 19.pdf" : "1ySO_6VkxuECA9FmDoCOI-4jPM_mHTNPd",
"INGLÊS INTRODUTÓRIO.pdf" : "1chKxheoL-pUS-gbktemamScauCAop79O",
"INGLÊS PARA NEGÓCIOS.pdf" : "1Tq7ldAGl97RC2N6tzwdpUvXjOHW1bUK6",
"INTELIGENCIA ARTIFICIAL.pdf" : "1O9OmZ8S7II-v8b934YfIG7ULODCZSIxS",
"INTELIGENCIA ARTIFICIAL FAST.pdf" : "19W07JhzrzwnCLLQKR12QzNDuXoQ8FbLf",
"INTELIGENCIA ARTIFICIAL LITE.pdf" : "1uw3iCdNCF3eoAVSULB2_46lg5Dfd9nby",
"DIGITAÇÃO.pdf" : "1C8ck5_P9JdtNRdcNeLNOq6qRv7w1fb4A"
"DIGITAÇÃO LITE.pdf" : "1UKb3dUnFWJB-p3ooYdUpkjfcVxd-KDeZ",
"CRIADOR DE CONTEÚDO KIDS.pdf" : "1SryrS_j6iwtVTjr5MSsQGWmrBg2cn_lP",
"CRIADOR DE CONTEÚDO KIDS FAST.pdf" : "1pYDfuGKCaCQLOTkAlLT2_0b6Ilo4c5X7",
"CRIADOR DE CONTEÚDO KIDS LITE.pdf" : "18q-Fjgf1LewD916KxXhz-tAqSKZEHesd",
"ADMINISTRATIVO INFORMATIZADO V4.pdf" 
"EMPREENDENDO COM INTELIGÊNCIA AI NOS NEGÓCIOS.pdf"
"WINDOWS 11.pdf"
"ILLUSTRATOR CC.pdf"
"INGLÊS PARA VIAGENS.pdf"
"AUTOCAD 3D 2015.pdf"
"INGLÊS PARA HOTELARIA E TURISMO.pdf"
"EXCEL FUNDAMENTAL FAST.pdf"
"PROGRAMAÇÃO PYTHON.pdf"
"NR 33.pdf"
"NR 10.pdf"
"NR 20.pdf"
"REVIT.pdf"
"WINDOWS 11 KIDS.pdf"
"ATENDENTE DE POSTO DE GASOLINA.pdf"
"NR 35.pdf"
"CANVA.pdf"
"INTERNET.pdf"
"INGLÊS  AVANÇADO.pdf"
"MELHOR IDADE.pdf"
"ASSISTENTE CONTÁBIL.pdf"
"EXCEL.pdf"
"EXCEL AVANÇADO.pdf"
"AUTOCAD 3D 2022.pdf"
"CUIDADOR DE IDOSOS.pdf"
"WINDOWS.pdf"
"INGLÊS  INTERMEDIÁRIO.pdf"
"INGLÊS  BÁSICO.pdf"
"INGLÊS KIDS.pdf"
"GOOGLE EDUCATION BÁSICO.pdf"
"GOOGLE EDUCATION AVANÇADO.pdf"
"LOGÍSTICA.pdf"
"BIOSSEGURANÇA.pdf"
"ADMINISTRATIVO.pdf"
"WORDPRESS.pdf"
"WORD 2019.pdf"
"WHATSAPP BUSINESS.pdf"
"CRÉDITO COBRANÇA E ATENDIMENTO.pdf"
"LÓGICA DE PROGRAMAÇÃO.pdf"
"POWER BI DESKTOP.pdf"
"PROGRAMAÇÃO PHP.pdf"
"DOCUMENTOS GOOGLE.pdf"
"ELABORAÇÃO DE CURRÍCULO.pdf"
"AFTER EFFECTS.pdf"
"ADMINISTRATIVO INFORMATIZADO V3.pdf"
"AGENTE DE PORTARIA.pdf"
"NR ABNT  TRABALHOS ACADÊMICOS.pdf"
"MANUTENÇÃO DE COMPUTADORES.pdf"
"MARKETING PESSOAL.pdf"
"DOMÍNIOS DE PAGINAS WEB.pdf"
"TELEMARKETING.pdf"
"EMPREENDEDORISMO.pdf"
"DESENVOLVEDOR DE GAMES ONLINE.pdf"
"SÍNDICO DE CONDOMÍNIO.pdf"
"TÉCNICAS DE MEMORIZAÇÃO.pdf"
"ARMAZENAMENTO EM NUVEM.pdf"
"MULTIMÍDIA.pdf"
"MATEMÁTICA FINANCEIRA.pdf"
"APLICATIVOS DE ACESSO REMOTO.pdf"
"MARKETING DIGITAL.pdf"
"APLICATIVOS DE CHAMADAS.pdf"
"WORD 2016 KIDS.pdf"
"WORD KIDS.pdf"
"GESTÃO ADMINISTRATIVA.pdf"
"GUIA DE PREVENÇÃO DO COVID 19.pdf"
"DEPARTAMENTO PESSOAL.pdf"
"JAVA.pdf"
"ROBÓTICA.pdf"
"DESENVOLVEDOR DE APP ANDROID.pdf"
"DESENVOLVEDOR ANDROID.pdf"
"3DS MAX 2020.pdf"
"AUTOCAD 2D.pdf"
"FACEBOOK BUSINESS.pdf"
'SEGURANÇA DIGITAL.pdf"
"EXCEL DASHBOARD.pdf"
"HTML E CSS.pdf"
"COREL DRAW X8.pdf"
"PHOTOSHOP CC.pdf"
"SKETCHUP.pdf"
"ATENDENTE DE FARMÁCIA.pdf"
"MÍDIAS SOCIAIS.pdf"
"PREMIERE PRO CC.pdf"
"DESENVOLVEDOR DE GAMES KIDS.pdf"
"POWER POINT.pdf"
"LIDERANÇA EFICAZ.pdf"
"HOTELARIA E TURISMO.pdf"
"GESTÃO DE RH.pdf"
"DESENVOLVEDOR DE GAMES MÓDULO 1.pdf"
"DESENVOLVEDOR DE GAMES  MÓDULO 3.pdf"
"VITRINISMO.pdf"
"INDESIGN CS6.pdf"
"DESENVOLVEDOR DE GAMES  MÓDULO 2.pdf"
"INTRODUÇÃO A INFORMÁTICA.pdf"
"YOUTUBER.pdf"
"OPERADOR DE CAIXA.pdf"
"TÉCNICAS DE VENDAS.pdf"
"OPERADOR DE DRONE.pdf"
"INTERNET KIDS.pdf"
"MEU NOVO EMPREGO.pdf""

  
  
  
  // Adicione outros cursos e seus IDs aqui
};

// Configuração do Nodemailer para enviar e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail', // pode tambem substituir com outro serviço de correio eletrônico
  auth: {
    user: 'bruno.almeidaferrer@gmail.com',  // Substituir com o Email do Acadêmico
    pass: 'SUA_SENHA'  // Substitua com a sua senha do academico (se estiver usando Gmail)
  }
});

// Função para enviar e-mails com apostilas anexadas
async function enviarBoasVindas() {
  try {
    // 1. Requisição para a API do DKsoft
    const response = await axios.get('URL_DA_API_DO_DKSOFT', {
      headers: {
        'Authorization': 'Bearer'  // Se a API requerer um token de autenticação
      }
    });

    const matriculas = response.data;

    // 2. Iterando sobre as matrículas e enviando os e-mails
    for (const aluno of matriculas) {
      const { nome, email, curso, emailEnviado } = aluno;

      if (emailEnviado !== 'Enviado') {
        // Verifica se o curso do aluno existe no mapeamento
        if (apostilas[curso]) {
          // Montando o corpo do e-mail
          const assunto = `BOAS VINDAS ${nome}`;
          const corpoEmail = `
          BOAS VINDAS ${nome}
          
          Eu sou Bruno, Monitor de Sala da nossa Escola de Cursos Profissionalizantes.
            É um prazer lhe dar as boas-vindas e fornecer informações
            importantes para o ínicio do seu curso.
            
            Confirmo que você está inscrito nos módulos:

            ${curso}
            
            
            Meta Pixels
          `;

          // 3. Preparando o anexo da apostila (com ID do Google Drive)
          // Aqui você precisaria baixar a apostila do Google Drive ou obter o arquivo de outra forma
          const caminhoApostila = `./apostilas/${apostilas[curso]}.pdf`; // Caminho do arquivo local
          
          // 4. Enviando o e-mail
          await transporter.sendMail({
            from: 'email_do_academico',  // Remetente
            to: email,  // Destinatário
            subject: assunto,
            text: corpoEmail,
            attachments: [
              {
                filename: `${curso}_apostila.pdf`,
                path: caminhoApostila  // Caminho para a apostila
              }
            ]
          });

          console.log(`E-mail enviado para ${nome} (${email})`);

          // 5. Atualizar o status do envio (isso depende se quer atualizar a API ou o banco de dados do dk)
          await axios.put('URL_DA_API_DO_DKSOFT/atualizar_status', {
            idAluno: aluno.id,
            emailEnviado: 'Enviado'
          });
        } else {
          console.log(`Curso não encontrado para o aluno ${nome} (${curso})`);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao enviar os e-mails:', error);
  }
}

// Executar a função de envio
enviarBoasVindas();
