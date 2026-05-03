import app from "./app.js";
import config from "./config/index.js";

async function main() {
  try {
    console.log("Current Working Directory:", process.cwd());
    app.listen(config.port, () => {

      console.log(`Server is running 🏃‍♂️ on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
