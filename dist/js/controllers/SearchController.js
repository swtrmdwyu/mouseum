import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";
export class SearchController {
    searchIcon;
    searchInput;
    artsElement;
    filterElement;
    filters;
    page = 1;
    searchValue;
    filterActive;
    searchService = new SearchService();
    artsView = new ArtsView();
    constructor() {
        this.searchIcon = document.querySelector('.search__icon');
        this.searchInput = document.querySelector('.search__input');
        this.artsElement = document.querySelector('.arts');
        this.filterElement = document.querySelector('.search__filter');
        this.filters = document.querySelectorAll('.filter__item');
        window.addEventListener('scrollend', () => {
            if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
                if (!this.filterActive) {
                    this.SearchArts();
                }
                else {
                }
            }
        });
        this.searchIcon.addEventListener('click', () => {
            if (this.queryVerify()) {
                this.SearchArts();
            }
        });
        this.searchInput.addEventListener('keypress', pressedKey => {
            if (pressedKey.key === 'Enter') {
                if (this.queryVerify()) {
                    this.SearchArts();
                }
            }
        });
        this.filters.forEach((filter) => {
            filter.addEventListener('click', async () => {
                this.filters.forEach((brother) => {
                    if (brother != filter) {
                        brother.classList.remove('active');
                    }
                });
                if (this.searchInput.value !== "") {
                    if (filter.classList.contains('active')) {
                        this.page = 1;
                        this.filterActive = false;
                        const arts = await this.searchService.searchArts(this.searchInput.value, this.page);
                        filter.classList.remove('active');
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                    }
                    else {
                        filter.classList.add('active');
                        this.filterActive = true;
                        const arts = await this.searchService.searchByFilter(this.searchInput.value, filter.dataset.filter, this.page);
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                    }
                }
            });
        });
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
    async SearchArts() {
        if (this.searchValue === this.searchInput.value) {
            this.page++;
        }
        else {
            this.page = 1;
            this.artsElement.innerHTML = "";
        }
        this.filterActive = false;
        this.searchValue = this.searchInput.value;
        this.filters.forEach((filter) => filter.classList.remove('active'));
        const arts = await this.searchService.searchArts(this.searchInput.value, this.page);
        this.artsView.update(arts, this.artsElement);
    }
}
