import { ArtsController } from "./controllers/ArtsController.js";
import { SearchController } from "./controllers/SearchController.js";
import { ModalController } from "./controllers/ModalController.js";
import { SearchService } from "./services/SearchService.js";
import { SavedView } from "./views/SavedView.js";
const modal = new ModalController();
const location = window.location.href;
let url = new URL(location);
console.log(url.pathname);
if (url.pathname === '/dist/pages/saved.html') {
    const artElement = document.querySelector('.saved-arts');
    const savedView = new SavedView();
    savedView.update(artElement);
}
else if (url.pathname === '/dist/index.html') {
    const arts = new ArtsController();
    const counter = document.querySelector('.art__counter');
    arts.addArt();
    window.addEventListener('scrollend', () => {
        if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
            counter.textContent = (parseInt(counter.textContent) + 5).toString();
            arts.addArt();
        }
    });
}
else {
    const filter = new SearchService();
    const search = new SearchController();
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('q');
    const searchInput = document.querySelector('.search__input');
    const searchIcon = document.querySelector('.search__icon');
    searchInput.value = value;
    search.SearchArts();
}
