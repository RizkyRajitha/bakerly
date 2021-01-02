let data = [
  { name: "Jaffna", province: "Northern" },
  { name: "Kilinochchi", province: "Northern" },
  { name: "Mannar", province: "Northern" },
  { name: "Vavuniya", province: "Northern" },
  { name: "Puttalam", province: "NorthWestern" },
  { name: "Kurunegala", province: "NorthWestern" },
  { name: "Kandy", province: "Central" },
  { name: "Nuwara Eliya", province: "Central" },
];

const db = require("./dbFunctions/districts");

data.forEach(async (element) => {
  let data = await db.createDistric(element);
  console.log(data);
});
