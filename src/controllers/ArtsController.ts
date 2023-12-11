import { ArtsService } from "../services/ArtsService.js";
import { ArtsView } from "../views/ArtsView.js";

export class ArtsController {
    private artsElement: HTMLDivElement;
    private arts: Art[];
    public page = 0;

    private artsService = new ArtsService();
    private artsView = new ArtsView();

    constructor() {
        this.artsElement = document.querySelector('.arts') as HTMLDivElement;
    }

    public async addArt(): Promise<void> {
        this.page++;
        this.arts = await this.artsService.getRandomArts(this.page);
        this.artsView.update(this.arts, this.artsElement);
    }
}