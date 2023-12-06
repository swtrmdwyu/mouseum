import { ArtsService } from "../services/ArtsService.js";
export class ArtsView {
    artsService = new ArtsService();
    constructor() { }
    update(arts, artsElement) {
        arts.forEach((art) => {
            const artElement = document.createElement('div');
            artElement.classList.add('arts__item');
            const artImage = document.createElement('img');
            artImage.src = art.primaryimageurl;
            artImage.dataset.id = art.id.toString();
            artImage.addEventListener('click', () => {
                this.showInfos(art.id.toString());
            });
            artElement.appendChild(artImage);
            artsElement.appendChild(artElement);
        });
    }
    async showInfos(id) {
        const art = await this.artsService.getArt(id);
    }
}
