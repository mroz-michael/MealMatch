const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = "insertDBURLHere";


main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}