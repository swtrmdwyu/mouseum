import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";
export class SearchController {
    searchIcon;
    SearchInput;
    artsElement;
    filterElement;
    searchService = new SearchService();
    artsView = new ArtsView();
    constructor() {
        this.searchIcon = document.querySelector('.search__icon');
        this.SearchInput = document.querySelector('.search__input');
        this.artsElement = document.querySelector('.arts');
        this.filterElement = document.querySelector('.filter__icon');
        this.searchIcon.addEventListener('click', () => {
            if (this.queryVerify()) {
                this.SearchArts();
            }
        });
        this.SearchInput.addEventListener('keypress', pressedKey => {
            if (pressedKey.key === 'Enter') {
                if (this.queryVerify()) {
                    this.SearchArts();
                }
            }
        });
        this.filterElement.addEventListener('click', () => {
        });
    }
    queryVerify() {
        if (!this.SearchInput.value) {
            console.log('input vazio');
            return false;
        }
        else {
            return true;
        }
    }
    async SearchArts() {
        this.filterElement.style.display = 'block';
        const arts = await this.searchService.searchArts(this.SearchInput.value);
        this.artsElement.innerHTML = "";
        this.artsView.update(arts, this.artsElement);
    }
}
