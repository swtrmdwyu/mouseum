import { ArtsService } from "../services/ArtsService.js";
import { ArtsView } from "../views/ArtsView.js";
export class ArtsController {
    artsElement;
    arts;
    page = 0;
    artsService = new ArtsService();
    artsView = new ArtsView();
    constructor() {
        this.artsElement = document.querySelector('.arts');
    }
    async addArt() {
        this.arts = await this.artsService.getRandomArts(this.page);
        this.artsView.update(this.arts, this.artsElement);
    }
}
