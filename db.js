import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.URL, {
      dbName: "MovieDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default conn;
