const fs = require("fs");

// function to reset the db every time `npm run start` is run
function resetDb() {
  const originalDB = fs.readFileSync("original.json");
  fs.writeFileSync("db.json", originalDB);
}

resetDb();
