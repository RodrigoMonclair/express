import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const dadosProcesso = [
  {
    id: "89a9bf5c-bcd7-44d3-94f3-144b1fffddde",
    documentName: "Relação de Remunerações de Contribuição",
    status: "Em elaboração",
    details:
      "Remunerações que incidiram contribuição, no período de 1997 a 2016",
    dateInit: "28/11/2022",
    comments: "10 dias úteis para conclusão",
    datEnd: "",
    setor: "NUPAC",
  },
];

app.get("/all", (req, res) => {
  return res.status(200).json(dadosProcesso);
});

app.post("/create", (req, res) => {
  
  const form = req.body;

  dadosProcesso.push(form);
  return res.status(201).json(dadosProcesso);
});

app.put("/edit/:id", (req, res) => {
  console.log(req.params);
    const {id} = req.params;
    const form = req.body;
    const editByID = dadosProcesso.find((processo) => processo.id === id);
    const index = dadosProcesso.indexOf(editByID);
  
    dadosProcesso.splice(index, 1, form);
  
    return res.status(202).json(dadosProcesso);
});

app.delete("/delete/:id", (req, res) => {
  
  const { id } = req.params;

  const deleteByID = dadosProcesso.find((processo) => processo.id === id);
  const index = dadosProcesso.indexOf(deleteByID);

  dadosProcesso.splice(index, 1);

  return res.status(200).json(dadosProcesso);
});

app.listen(process.env.PORT, () => {
  console.log(`run on port http://localhost:${process.env.PORT}`);
});
