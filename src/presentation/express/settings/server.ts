import { envs } from "../../../config/plugins/env.plugin";
import { app } from "./app";

const PORT = envs.PORT;

app.listen(PORT, () => {
  console.log("Server started...");
});
