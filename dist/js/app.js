import { ArtsController } from "./controllers/ArtsController.js";
import { SearchController } from "./controllers/SearchController.js";
import { ModalController } from "./controllers/ModalController.js";
import { SearchService } from "./services/SearchService.js";
import { SavedView } from "./views/SavedView.js";
const modal = new ModalController();
const location = window.location.href;
let url = new URL(location);
if (url.pathname === '/dist/pages/saved.html') {
    const artElement = document.querySelector('.arts');
    const savedView = new SavedView();
    savedView.update(artElement);
}
else if (url.pathname === '/dist/index.html' || url.pathname === '/dist/') {
    const filter = new SearchService();
    const search = new SearchController();
    localStorage.setItem('searchValue', "");
    const arts = new ArtsController();
    const counterElement = document.querySelector('.art__counter');
    arts.addArt();
    window.addEventListener('scrollend', () => {
        if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
            count(parseInt(counterElement.textContent), parseInt(counterElement.textContent) + 5, counterElement);
            arts.addArt();
        }
    });
}
else {
    const filter = new SearchService();
    const search = new SearchController();
    const searchInput = document.querySelector('.search__input');
    const filters = document.querySelectorAll('.filter__item');
    const storage = localStorage.getItem('q');
    if (storage) {
        const q = JSON.parse(storage);
        searchInput.value = q.value;
        if (!q.filter) {
            search.searchArts();
        }
    }
}
function count(from, to, counterElement) {
    const counter = setInterval(() => {
        from++;
        counterElement.textContent = from.toString();
        if (from === to) {
            clearInterval(counter);
        }
    }, 150);
}
