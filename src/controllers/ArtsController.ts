import { ArtsService } from "../services/ArtsService.js";
import { ArtsView } from "../views/ArtsView.js";

export class ArtsController {
    private artsElement: HTMLDivElement;
    private searchIcon: HTMLOrSVGScriptElement;
    private searchInput: HTMLInputElement;
    private fillterElement: HTMLDivElement;
    private fillterButton: HTMLButtonElement;
    private arts: Art[];
    private page = 0;

    private artsService = new ArtsService();
    private artsView = new ArtsView();

    constructor() {
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
        this.searchIcon = document.querySelector('.search__icon') as HTMLOrSVGScriptElement;
        this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
        this.fillterButton = document.querySelector('.search__button') as HTMLButtonElement;
        this.fillterElement = document.querySelector('.search__filter') as HTMLDivElement;
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