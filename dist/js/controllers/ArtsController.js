import { ArtsService } from "../services/ArtsService.js";
import { ArtsView } from "../views/ArtsView.js";
export class ArtsController {
    artsElement;
    searchIcon;
    searchInput;
    location;
    url;
    arts;
    page = 0;
    artsService = new ArtsService();
    artsView = new ArtsView();
    constructor() {
        this.artsElement = document.querySelector('.arts');
        this.searchIcon = document.querySelector('.search__icon');
        this.searchInput = document.querySelector('.search__input');
        this.location = window.location.href;
        this.url = new URL(this.location);
        this.searchIcon.addEventListener('click', () => {
            if (this.queryVerify()) {
                this.url.pathname = '/dist/pages/search.html';
                localStorage.setItem('searchValue', this.searchInput.value);
                window.location.href = this.url.toString();
            }
        });
        this.searchInput.addEventListener('keypress', (pressedKey) => {
            if (pressedKey.key === 'Enter') {
                if (this.queryVerify()) {
                    this.url.pathname = '/dist/pages/search.html';
                    localStorage.setItem('searchValue', this.searchInput.value);
                    window.location.href = this.url.toString();
                }
            }
        });
    }
    async addArt() {
        this.page++;
        this.arts = await this.artsService.getRandomArts(this.page);
        this.artsView.update(this.arts, this.artsElement);
    }
    queryVerify() {
        if (!this.searchInput.value) {
            console.log('input vazio');
            return false;
        }
        else {
            return true;
        }
    }
}
