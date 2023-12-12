import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";

export class SearchController {
    private searchIcon: HTMLOrSVGScriptElement;
    private SearchInput: HTMLInputElement;
    private artsElement: HTMLDivElement;
    private filterButton: HTMLImageElement;
    private filterElement: HTMLDivElement;
    private filters:NodeListOf<HTMLDivElement>;
    private searchService = new SearchService();
    private artsView = new ArtsView();
    private filterActive = false;

    constructor() {

        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.SearchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.filterButton = document.querySelector('.filter__icon') as HTMLImageElement;
        this.filterElement = document.querySelector('.filter__options') as HTMLDivElement;
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
                
                if(filter.classList.contains('active')) {
                    filter.classList.remove('active');
                    this.filterActive = false;
                } else {
                    filter.classList.add('active');
                    this.filterActive = true;
                    const arts = await this.searchService.searchByFilter(this.SearchInput.value, filter.dataset.filter);
                    this.artsElement.innerHTML = "";
                    this.artsView.update(arts, this.artsElement);
                }    
            })
        });

        this.filterButton.addEventListener('click', () => {
            if(this.filterElement.style.display === 'flex') {
                this.filterElement.style.display = 'none';
            } else {
                this.filterElement.style.display = 'flex';
                this.filters.forEach((filter) => filter.classList.remove('active'));
                this.filterActive = false;
            }   
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

    private async SearchArts(): Promise<void> {
        this.filters.forEach((filter) => filter.classList.remove('active'));
        this.filterActive = false;
        
        this.filterButton.style.display = 'block';
        const arts = await this.searchService.searchArts(this.SearchInput.value);
        this.artsElement.innerHTML = "";
        this.artsView.update(arts, this.artsElement);
    }
}