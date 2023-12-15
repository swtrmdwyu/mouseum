import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";

export class SearchController {
    private searchIcon: HTMLOrSVGScriptElement;
    private searchInput: HTMLInputElement;
    private artsElement: HTMLDivElement;
    private filterButton: HTMLButtonElement;
    private filterElement: HTMLDivElement;
    private filters:NodeListOf<HTMLDivElement>;
    private page = 1;
    private searchValue: string;
    public filterActive: string;
    private location: string;
    private url: URL

    private searchService = new SearchService();
    private artsView = new ArtsView();


    constructor() {
        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.filterButton = document.querySelector('.filter__button') as HTMLButtonElement;
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.filterElement = document.querySelector('.search__filter') as HTMLDivElement;
        this.filters = document.querySelectorAll('.filter__item') as NodeListOf<HTMLDivElement>;

        this.location = window.location.href;
        this.url = new URL(this.location);

        if(this.url.pathname === "/dist/pages/search.html") {
            if(localStorage.getItem('q')) {
                const q = JSON.parse(localStorage.getItem('q'));
                if(q.filter) {
                    this.filters.forEach((filter: HTMLDivElement) => {
                        if(filter.dataset.filter === q.filter) {
                            filter.classList.add('active')
                        }
                    }); 
                    
                    this.searchInput.value = q.value;
                    this.filterElement.style.display = 'flex';
                    this.filterActive = q.filter;
                    const searchWithFilters = async () => {
                        const arts = await this.searchService.searchByFilter(this.searchInput.value, this.filterActive, this.page);
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                    }
                    
                    searchWithFilters();
                }
            }
        } else {
            localStorage.setItem('q', "");    
        }

        

        this.filterButton.addEventListener('click', () => {
            if(this.filterElement.style.display === 'flex') {
                this.filterElement.style.display = 'none';
            } else {
                this.filterElement.style.display = 'flex';
            }
        });

        window.addEventListener('scrollend', () => {
            if(this.url.pathname === '/dist/pages/search.html') {
                if(window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
                    if(!this.filterActive) {
                        this.page++
    
                        this.searchArts();
                        
                    } else {
                        this.page++
                        const filter = async () => {
                            const arts = await this.searchService.searchByFilter(this.searchInput.value, this.filterActive, this.page);
                            this.artsView.update(arts, this.artsElement);
                        }
    
                        filter();
                    }
                    
                }
            }
        });


        this.searchIcon.addEventListener('click', () => {
            if(this.queryVerify()) {
                this.page = 1
                this.searchEvent();
            }     
        });

        this.searchInput.addEventListener('keypress', pressedKey => {
            if(pressedKey.key === 'Enter') { 
                if(this.queryVerify()) {
                    this.page = 1
                    this.searchEvent();
                } 
            } 
        });

        this.filters.forEach((filter: HTMLDivElement) => {
            filter.addEventListener('click', async () => { 
                this.filters.forEach((brother: HTMLDivElement) => {
                    if(brother != filter) {
                        brother.classList.remove('active');
                    }
                });

                if(filter.classList.contains('active')) {
                    this.page = 1;
                    this.filterActive = "";
                    filter.classList.remove('active')

                    //remover o fundo do svg
                } else {
                    this.page = 1;
                    filter.classList.add('active');
                    this.filterActive = filter.dataset.filter;
                    //adicionar fundo ao svg
                }
                     
            })
        });

        
    }

    private queryVerify(): boolean {
        if(!this.searchInput.value) {
            console.log('input vazio');
            return false
        } else {
            return true
        }
    }

    public async searchArts(): Promise<void> {
        if(this.searchValue !== this.searchInput.value) {
            this.page = 1;
            this.artsElement.innerHTML = "";
        } 

        this.filterActive = "";

        this.searchValue = this.searchInput.value;
        this.filters.forEach((filter) => filter.classList.remove('active'));    
        const arts = await this.searchService.searchArts(this.searchInput.value, this.page);
        this.artsView.update(arts, this.artsElement);
    }

    public whoIsActive(): string {
        const active = document.querySelector('.active') as HTMLDivElement;
        return active ? active.dataset.fitler : "";
    }

    private async searchEvent(): Promise<void> {   

        if(this.url.pathname === '/dist/index.html') {
            const q = {
                filter: this.filterActive || "",
                value: this.searchInput.value || ""
            }

            localStorage.setItem('q', JSON.stringify(q));

            window.location.href = '/dist/pages/search.html';
        } else if(this.filterActive){
            this.page = 1
            const arts = await this.searchService.searchByFilter(this.searchInput.value, this.filterActive, this.page);
            this.artsElement.innerHTML = "";
            this.artsView.update(arts, this.artsElement);
        }  else {
            this.page = 1;
            this.artsElement.innerHTML = "";
            this.searchArts();
        }
        
    }
}