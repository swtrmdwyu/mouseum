import { ArtsService } from "../services/ArtsService.js";
import { ArtsView } from "../views/ArtsView.js";

export class ArtsController {
    private artsElement: HTMLDivElement;
    private searchIcon: HTMLOrSVGScriptElement;
    private searchInput: HTMLInputElement;
    private location: string;
    private url: URL
    private arts: Art[];
    public page = 0;

    private artsService = new ArtsService();
    private artsView = new ArtsView();

    constructor() {
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.location = window.location.href;
        this.url = new URL(this.location);

        this.searchIcon.addEventListener('click', () => {
            if(this.queryVerify()) {
                this.url.pathname = '/dist/pages/search.html';
                localStorage.setItem('searchValue', this.searchInput.value);
                window.location.href = this.url.toString();
            }     
        });

        this.searchInput.addEventListener('keypress', (pressedKey) => {
            if( pressedKey.key === 'Enter') {
                if(this.queryVerify()) {
                    this.url.pathname = '/dist/pages/search.html';
                    localStorage.setItem('searchValue', this.searchInput.value);
                    window.location.href = this.url.toString();
                }
            } 
        });
    }

    public async addArt(): Promise<void> {
        this.page++;
        this.arts = await this.artsService.getRandomArts(this.page);
        this.artsView.update(this.arts, this.artsElement);
    }

    private queryVerify(): boolean {
        if(!this.searchInput.value) {
            console.log('input vazio');
            return false
        } else {
            return true
        }
    }
}