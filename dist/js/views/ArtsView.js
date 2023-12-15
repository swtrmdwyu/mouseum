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
            artImage.dataset.title = art.title;
            const span = document.createElement('span');
            span.textContent = art.title;
            span.classList.add('title__span');
            artElement.style.backgroundColor = 'lightgray';
            artElement.appendChild(artImage);
            artElement.appendChild(span);
            artsElement.appendChild(artElement);
            const loadImage = new Promise((resolve, reject) => {
                artImage.onload = resolve;
                artImage.onerror = reject;
            });
            loadImage
                .then(() => {
                artElement.style.backgroundColor = 'transparent';
                artImage.addEventListener('click', () => {
                    this.showInfos(art.id.toString());
                });
            })
                .catch((error) => {
                console.error('Erro ao carregar imagem:', artImage.src, error);
            });
        });
    }
    async showInfos(id) {
        const art = await this.artsService.getArt(id);
        this.modalController.render(art[0]);
    }
}
