import { authMiddleware } from "./middlewares/authMiddleware";
import { stackMiddlewares } from "./middlewares/stackMiddlewares";

export default stackMiddlewares([authMiddleware]);
