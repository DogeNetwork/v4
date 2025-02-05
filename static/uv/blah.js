"dependencies": {
     "@titaniumnetwork-dev/ultraviolet": "3.2.7",
  }
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
app.use("/uv/", express.static(uvPath));
