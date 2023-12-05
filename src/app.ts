import { ArtsController } from "./controllers/ArtsController.js";
import { ArtsService } from "./services/ArtsService.js";
import { SearchController } from "./controllers/SearchController.js"

const arts = new ArtsController();
const service = new ArtsService();
const search = new SearchController();


arts.addArt();