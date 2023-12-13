import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";

export class SearchController {
    private searchIcon: HTMLOrSVGScriptElement;
    private SearchInput: HTMLInputElement;
    private artsElement: HTMLDivElement;
    private filterElement: HTMLDivElement;
    private filters:NodeListOf<HTMLDivElement>;

    private searchService = new SearchService();
    private artsView = new ArtsView();
    private filterActive = false;

    constructor() {
        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.SearchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.filterElement = document.querySelector('.search__filter') as HTMLDivElement;
        this.filters = document.querySelectorAll('.filter__item') as NodeListOf<HTMLDivElement>;

        

        this.searchIcon.addEventListener('click', () => {
            if(this.queryVerify()) {
                this.SearchArts();
            }     
        });

        this.SearchInput.addEventListener('keypress', pressedKey => {
            if( pressedKey.key === 'Enter') { 
                if(this.queryVerify()) {
                    this.SearchArts();
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

                if(this.SearchInput.value !== "") {
                    if(filter.classList.contains('active')) {
                        const arts = await this.searchService.searchArts(this.SearchInput.value);
                        filter.classList.remove('active');
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                        this.filterActive = false;
                    } else {
                        filter.classList.add('active');
                        this.filterActive = true;
                        const arts = await this.searchService.searchByFilter(this.SearchInput.value, filter.dataset.filter);
                        this.artsElement.innerHTML = "";
                        this.artsView.update(arts, this.artsElement);
                    }
                }
                
                    
            })
        });

    }

    private queryVerify(): boolean {
        if(!this.SearchInput.value) {
            console.log('input vazio');
            return false
        } else {
            return true
        }
    }

    public async SearchArts(): Promise<void> {
        this.filters.forEach((filter) => filter.classList.remove('active'));
        this.filterActive = false;

        this.filterElement.style.display = 'flex';
        const arts = await this.searchService.searchArts(this.SearchInput.value);
        this.artsElement.innerHTML = "";
        this.artsView.update(arts, this.artsElement);
    }
}