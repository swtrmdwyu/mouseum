export class ArtsView {
    constructor() { }
    update(arts, artsElement) {
        console.log(arts);
        arts.forEach((art) => {
            const artElement = document.createElement('div');
            artElement.style.background = `url(${art.primaryimageurl}) center/cover no-repeat`;
            artElement.classList.add('arts__item');
            artElement.dataset.id = art.id;
            artElement.addEventListener('click', () => {
                console.log(artElement.dataset.id);
            });
            artsElement.appendChild(artElement);
        });
    }
}
