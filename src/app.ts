import { ArtsController } from "./controllers/ArtsController.js";
import { SearchController } from "./controllers/SearchController.js"
import { ModalController } from "./controllers/ModalController.js";
import { SearchService } from "./services/SearchService.js";

const arts = new ArtsController();
const search = new SearchController();
const modal = new ModalController();
const counter = document.querySelector('.art__counter') as HTMLParagraphElement;
const filter = new SearchService();

arts.addArt();

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
        counter.textContent = (parseInt(counter.textContent) + 5).toString();
        arts.addArt();
    }
})
