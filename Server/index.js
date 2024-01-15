const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: true, logging: false })
  .then(() => {
    server.listen(PORT,  () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error.message));