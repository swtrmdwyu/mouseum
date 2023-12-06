import { ArtsController } from "./controllers/ArtsController.js";
import { SearchController } from "./controllers/SearchController.js";
const arts = new ArtsController();
const search = new SearchController();
arts.addArt();
window.addEventListener('scroll', () => {
    if (true) {
        if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
            arts.addArt();
        }
    }
});
