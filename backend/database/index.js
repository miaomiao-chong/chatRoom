const { PATH } = require("../utils/constant");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"));

mongoose.connection.on("error", (error) => console.log(error));
// mongoose.connection.once("open", () => console.log("Connected To Database"));

module.exports = mongoose;
