import { ArtsService } from "../services/ArtsService.js";

export class ArtsView {
    private artsService = new ArtsService();

    constructor() {}
    
    public update(arts: Art[], artsElement: HTMLDivElement): void {
        arts.forEach((art: Art) => {
            const artElement = document.createElement('div');
            artElement.style.background = `url(${art.primaryimageurl}) center/cover no-repeat`;
            artElement.classList.add('arts__item');
            artElement.dataset.id = art.id.toString();
            artElement.addEventListener('click', () => {
                this.showInfos(art.id.toString())
            })
            
            artsElement.appendChild(artElement);
        })
    }

    private async showInfos(id: string): Promise<void> {
        //mostra modal
        const art = await this.artsService.getArt(id);
    }
}