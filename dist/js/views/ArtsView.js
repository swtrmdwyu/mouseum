import { ArtsService } from "../services/ArtsService.js";
import { ModalController } from "../controllers/ModalController.js";
export class ArtsView {
    artsService = new ArtsService();
    modalController = new ModalController();
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
            const loadImage = new Promise((resolve) => {
                artElement.style.background = 'black';
                artImage.onload = resolve;
            });
            artElement.appendChild(artImage);
            artsElement.appendChild(artElement);
        });
    }
    async showInfos(id) {
        const art = await this.artsService.getArt(id);
        this.modalController.render(art[0]);
    }
}
