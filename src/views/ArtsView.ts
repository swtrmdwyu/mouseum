export class ArtsView {
    constructor() {}
    
    update(arts: Arts[], artsElement: HTMLDivElement) {

        arts.forEach((art: Arts) => {
            const artElement = document.createElement('div');
            artElement.style.background = `url(${art.primaryimageurl}) center/cover no-repeat`;
            artElement.classList.add('arts__item');
            artElement.dataset.id = art.id.toString();
            artElement.addEventListener('click', () => {
                console.log(artElement.dataset.id)
            })
            
            artsElement.appendChild(artElement);
        })
    }
}