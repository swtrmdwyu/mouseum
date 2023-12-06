import { SearchService } from "../services/SearchService.js";
import { ArtsView } from "../views/ArtsView.js";

export class SearchController {
    private searchIcon: HTMLOrSVGScriptElement;
    private SearchInput: HTMLInputElement;
    private artsElement: HTMLDivElement;
    private filterElement: HTMLImageElement;
    
    private searchService = new SearchService();
    private artsView = new ArtsView();

    constructor() {

        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.SearchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.filterElement = document.querySelector('.filter__icon') as HTMLImageElement;

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
        })

        this.filterElement.addEventListener('click', () => {
            
        })
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
        this.filterElement.style.display = 'block';
        const arts = await this.searchService.searchArts(this.SearchInput.value);
        this.artsElement.innerHTML = "";
        this.artsView.update(arts, this.artsElement);
    }
}