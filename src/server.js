const proffys = [
  {
    name: "Diego Fernandes",
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "99999999999",
    bio: "Entusiasta das melhores tecnologias de química avançada.",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Guilherme Fidelis Pereira",
    avatar:
      "https://avatars3.githubusercontent.com/u/68570304?s=460&u=0d73f549db3fc57227898f90e6e6428cbe76be37&v=4",
    whatsapp: "15996638371",
    bio: "Práticas de Biologia utilizando Cultura-Pop",
    subject: "Biologia",
    cost: "20",
    weekday: [1],
    time_from: [720],
    time_to: [1220],
  },
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação Física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

//funcionalidades

function getSubject(subjectNumber) {
  const arrayPosition = +subjectNumber - 1;
  return subjects[arrayPosition];
}

function pageLanding(req, res) {
  return res.render("index.html");
}

function pageStudy(req, res) {
  //   console.log(req.query);
  const filters = req.query;
  return res.render("study.html", { proffys, filters, subjects, weekdays });
}

function pageGiveClasses(req, res) {
  const data = req.query;

  //se tiver dados(data)
  const isNotEmpty = Object.keys(data).length > 0;
  //se tiver dados adicionar
  if (isNotEmpty) {
    data.subject = getSubject(data.subject);
    //adicionar dados a lista de proffys
    proffys.push(data);
    return res.redirect("/study");
  }

  //se nao, mostrar a pagina
  return res.render("give-classes.html", { subjects, weekdays });
}

//servidor
const express = require("express");
const server = express();

//configurar nunjucks (template engine)
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//inicio e configuração do servidor
server
  //configurar arquivos estáticos (css, scripts, iagens)
  .use(express.static("public"))
  //rotas da aplicação
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  //start do servidor
  .listen(5500);
