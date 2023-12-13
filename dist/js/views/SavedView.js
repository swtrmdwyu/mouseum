import { ArtsService } from "../services/ArtsService.js";
import { ModalController } from "../controllers/ModalController.js";
export class SavedView {
    artsService = new ArtsService();
    modalController = new ModalController();
    constructor() { }
    update(artsElement) {
        const arts = JSON.parse(localStorage.getItem('saved')) || [];
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
