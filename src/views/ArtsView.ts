import { ArtsService } from "../services/ArtsService.js";

export class ArtsView {
    private artsService = new ArtsService();

    constructor() {}
    
    public update(arts: Art[], artsElement: HTMLDivElement): void {
        arts.forEach((art: Art) => {
            const artElement = document.createElement('div');
            // artElement.style.background = `url(${art.primaryimageurl}) center/cover no-repeat`;
            artElement.classList.add('arts__item');

            const artImage = document.createElement('img');
            artImage.src = art.primaryimageurl;
            artImage.dataset.id = art.id.toString();
            artImage.addEventListener('click', () => {
                this.showInfos(art.id.toString());
            })

            artElement.appendChild(artImage);
            artsElement.appendChild(artElement);
        })
    }

    private async showInfos(id: string): Promise<void> {
        //mostra modal
        const art = await this.artsService.getArt(id);
    }
}