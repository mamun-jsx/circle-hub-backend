import app from "./app.js";
import config from "./config/index.js";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running 🏃‍♂️ on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
