import { ArtsService } from "../services/ArtsService.js";
export class ArtsView {
    artsService = new ArtsService();
    constructor() { }
    update(arts, artsElement) {
        arts.forEach((art) => {
            const artElement = document.createElement('div');
            artElement.style.background = `url(${art.primaryimageurl}) center/cover no-repeat`;
            artElement.classList.add('arts__item');
            artElement.dataset.id = art.id.toString();
            artElement.addEventListener('click', () => {
                this.showInfos(art.id.toString());
            });
            artsElement.appendChild(artElement);
        });
    }
    async showInfos(id) {
        const art = await this.artsService.getArt(id);
    }
}
