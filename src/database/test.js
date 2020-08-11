const Database = require("./db");
const createProffy = require("./createProffy");

Database.then(async (db) => {
  //inserir dados

  proffyValue = {
    name: "Guilherme",
    avatar:
      "https://avatars3.githubusercontent.com/u/68570304?s=460&u=0d73f549db3fc57227898f90e6e6428cbe76be37&v=4",
    whatsapp: "15996638371",
    bio: "Professor de Biologia",
  };

  classValue = {
    subject: 2,
    cost: "20",
    //proffy id virá pelo banco de dados
  };

  classScheduleValues = [
    //class_id vira pelo banco de dados, apos cadastrarmos a aula
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220,
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220,
    },
  ];

  // await createProffy(db, { proffyValue, classValue, classScheduleValues });

  //consultar dados inseridos

  //todos proffys
  const selectedProffys = await db.all("SELECT * FROM proffys")
  // console.log(selectedProffys)

  //consultar as classes de um determinado professor
  //e trazer junto os dados do professor

  const selectedClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 2;
  `)
  // console.log(selectedClassesAndProffys)

  //o horario que a pessoa trabalha, por exemplo, é das 8h - 18h
  // o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado
  //o time_to precisa ser acima

const selectClassesSchedules = await db.all(`
  SELECT class_schedule.*
  FROM class_schedule
  WHERE class_schedule.class_id = "1"
  AND class_schedule.weekday = "0"
  AND class_schedule.time_from <= "520"
  AND class_schedule.time_to > "1220"
`)

 console.log(selectClassesSchedules)

});
