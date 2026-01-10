import database from "../../../../infra/database.js";

//const { request, response } = require("node:http");

async function status(request, response) {
  const result = await database.query("SELECT 1+1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "valor" });
}

export default status;
