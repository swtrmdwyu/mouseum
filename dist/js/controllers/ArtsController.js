import { ArtsService } from "../services/ArtsService.js";
import { ArtsView } from "../views/ArtsView.js";
export class ArtsController {
    artsElement;
    searchIcon;
    searchInput;
    fillterElement;
    fillterButton;
    arts;
    page = 0;
    artsService = new ArtsService();
    artsView = new ArtsView();
    constructor() {
        this.artsElement = document.querySelector('.arts');
        this.searchIcon = document.querySelector('.search__icon');
        this.searchInput = document.querySelector('.search__input');
        this.fillterButton = document.querySelector('.search__button');
        this.fillterElement = document.querySelector('.search__filter');
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
