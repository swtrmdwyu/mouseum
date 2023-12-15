import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";
export class SearchController {
    searchIcon;
    searchInput;
    artsElement;
    filterButton;
    filterElement;
    filters;
    page = 1;
    searchValue;
    filterActive;
    location;
    url;
    searchService = new SearchService();
    artsView = new ArtsView();
    constructor() {
        this.searchIcon = document.querySelector('.search__icon');
        this.searchInput = document.querySelector('.search__input');
        this.filterButton = document.querySelector('.filter__button');
        this.artsElement = document.querySelector('.arts');
        this.filterElement = document.querySelector('.search__filter');
        this.filters = document.querySelectorAll('.filter__item');
        this.location = window.location.href;
        this.url = new URL(this.location);
        if (this.url.pathname === "/dist/pages/search.html") {
            if (localStorage.getItem('q')) {
                const q = JSON.parse(localStorage.getItem('q'));
                if (q.filter) {
                    this.filters.forEach((filter) => {
                        if (filter.dataset.filter === q.filter) {
                            filter.classList.add('active');
                        }
                    });
                    this.searchInput.value = q.value;
                    this.filterElement.style.display = 'flex';
                    this.filterActive = q.filter;
                    const searchWithFilters = async () => {
                        const arts = await this.searchService.searchByFilter(this.searchInput.value, this.filterActive, this.page);
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                    };
                    searchWithFilters();
                }
            }
        }
        else {
            localStorage.setItem('q', "");
        }
        this.filterButton.addEventListener('click', () => {
            if (this.filterElement.style.display === 'flex') {
                this.filterElement.style.display = 'none';
            }
            else {
                this.filterElement.style.display = 'flex';
            }
        });
        window.addEventListener('scrollend', () => {
            if (this.url.pathname === '/dist/pages/search.html') {
                if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
                    if (!this.filterActive) {
                        this.page++;
                        this.searchArts();
                    }
                    else {
                        this.page++;
                        const filter = async () => {
                            const arts = await this.searchService.searchByFilter(this.searchInput.value, this.filterActive, this.page);
                            this.artsView.update(arts, this.artsElement);
                        };
                        filter();
                    }
                }
            }
        });
        this.searchIcon.addEventListener('click', () => {
            if (this.queryVerify()) {
                this.page = 1;
                this.searchEvent();
            }
        });
        this.searchInput.addEventListener('keypress', pressedKey => {
            if (pressedKey.key === 'Enter') {
                if (this.queryVerify()) {
                    this.page = 1;
                    this.searchEvent();
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
                    this.page = 1;
                    this.filterActive = "";
                    filter.classList.remove('active');
                }
                else {
                    this.page = 1;
                    filter.classList.add('active');
                    this.filterActive = filter.dataset.filter;
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
    async searchArts() {
        if (this.searchValue !== this.searchInput.value) {
            this.page = 1;
            this.artsElement.innerHTML = "";
        }
        this.filterActive = "";
        this.searchValue = this.searchInput.value;
        this.filters.forEach((filter) => filter.classList.remove('active'));
        const arts = await this.searchService.searchArts(this.searchInput.value, this.page);
        this.artsView.update(arts, this.artsElement);
    }
    whoIsActive() {
        const active = document.querySelector('.active');
        return active ? active.dataset.fitler : "";
    }
    async searchEvent() {
        if (this.url.pathname === '/dist/index.html') {
            const q = {
                filter: this.filterActive || "",
                value: this.searchInput.value || ""
            };
            localStorage.setItem('q', JSON.stringify(q));
            window.location.href = '/dist/pages/search.html';
        }
        else if (this.filterActive) {
            this.page = 1;
            const arts = await this.searchService.searchByFilter(this.searchInput.value, this.filterActive, this.page);
            this.artsElement.innerHTML = "";
            this.artsView.update(arts, this.artsElement);
        }
        else {
            this.page = 1;
            this.artsElement.innerHTML = "";
            this.searchArts();
        }
    }
}
