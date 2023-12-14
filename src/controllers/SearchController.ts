import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";

export class SearchController {
    private searchIcon: HTMLOrSVGScriptElement;
    private searchInput: HTMLInputElement;
    private artsElement: HTMLDivElement;
    private filterElement: HTMLDivElement;
    private filters:NodeListOf<HTMLDivElement>;
    private page = 1;
    private searchValue: string;
    public filterActive: string;

    private searchService = new SearchService();
    private artsView = new ArtsView();


    constructor() {
        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.filterElement = document.querySelector('.search__filter') as HTMLDivElement;
        this.filters = document.querySelectorAll('.filter__item') as NodeListOf<HTMLDivElement>;

        window.addEventListener('scrollend', () => {
            if(window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
                if(!this.filterActive) {
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
        });

        this.searchIcon.addEventListener('click', () => {
            if(this.queryVerify()) {
                this.searchArts();
            }     
        });

        this.searchInput.addEventListener('keypress', pressedKey => {
            if(pressedKey.key === 'Enter') { 
                if(this.queryVerify()) {
                    this.searchArts();
                }
            } 
        });

        this.filters.forEach((filter: HTMLDivElement) =>{
            filter.addEventListener('click', async () =>{
                
                this.filters.forEach((brother: HTMLDivElement) => {
                    if(brother != filter) {
                        brother.classList.remove('active');
                    }
                });

                if(this.searchInput.value !== "") {
                    if(filter.classList.contains('active')) {
                        this.page = 1;
                        this.filterActive = "";
                        
                        const arts = await this.searchService.searchArts(this.searchInput.value, this.page);
                        filter.classList.remove('active');
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);

                    } else {
                        this.page = 1;
                        filter.classList.add('active');
                        this.filterActive = filter.dataset.filter;

                        const arts = await this.searchService.searchByFilter(this.searchInput.value, filter.dataset.filter, this.page);
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                    }
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
        if(this.searchValue === this.searchInput.value) {
            this.page++
        } else {
            this.page = 1;
            this.artsElement.innerHTML = "";
        }
        this.filterActive = "";
        this.searchValue = this.searchInput.value;
        this.filters.forEach((filter) => filter.classList.remove('active'));    
        const arts = await this.searchService.searchArts(this.searchInput.value, this.page);
        this.artsView.update(arts, this.artsElement);
    }
}