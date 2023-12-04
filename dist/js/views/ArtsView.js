export class ArtsView {
    update(arts, artsElement) {
        const tmpURL = './assets/img/as-meninas.jpg';
        console.log(arts);
        arts.forEach((art, idx) => {
            const artElement = document.createElement('div');
            artElement.style.background = `url(${art.primaryimageurl}) center/cover no-repeat`;
            artElement.classList.add('arts__item');
            artElement.dataset.id = art.id;
            artsElement.appendChild(artElement);
        });
    }
}
