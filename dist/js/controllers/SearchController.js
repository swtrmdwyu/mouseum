import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";
export class SearchController {
    searchIcon;
    SearchInput;
    artsElement;
    filterButton;
    filterElement;
    filters;
    searchService = new SearchService();
    artsView = new ArtsView();
    filterActive = false;
    constructor() {
        this.searchIcon = document.querySelector('.search__icon');
        this.SearchInput = document.querySelector('.search__input');
        this.artsElement = document.querySelector('.arts');
        this.filterButton = document.querySelector('.filter__icon');
        this.filterElement = document.querySelector('.filter__options');
        this.filters = document.querySelectorAll('.filter__item');
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
        this.filters.forEach((filter) => {
            filter.addEventListener('click', async () => {
                this.filters.forEach((brother) => {
                    if (brother != filter) {
                        brother.classList.remove('active');
                    }
                });
                if (filter.classList.contains('active')) {
                    filter.classList.remove('active');
                    this.filterActive = false;
                }
                else {
                    filter.classList.add('active');
                    this.filterActive = true;
                    const arts = await this.searchService.searchByFilter(this.SearchInput.value, filter.dataset.filter);
                    this.artsElement.innerHTML = "";
                    this.artsView.update(arts, this.artsElement);
                }
            });
        });
        this.filterButton.addEventListener('click', () => {
            if (this.filterElement.style.display === 'flex') {
                this.filterElement.style.display = 'none';
            }
            else {
                this.filterElement.style.display = 'flex';
                this.filters.forEach((filter) => filter.classList.remove('active'));
                this.filterActive = false;
            }
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
        this.filters.forEach((filter) => filter.classList.remove('active'));
        this.filterActive = false;
        this.filterButton.style.display = 'block';
        const arts = await this.searchService.searchArts(this.SearchInput.value);
        this.artsElement.innerHTML = "";
        this.artsView.update(arts, this.artsElement);
    }
}
