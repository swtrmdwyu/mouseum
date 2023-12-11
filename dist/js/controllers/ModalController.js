export class ModalController {
    modalELement;
    closeButton;
    imageElement;
    idElement;
    buttonsElement;
    yearElement;
    artistElement;
    techniqueElement;
    descriptionElement;
    colorsElement;
    constructor() {
        this.modalELement = document.querySelector('.modal');
        this.closeButton = document.querySelector('.close__button');
        this.imageElement = document.querySelector('.art__img');
        this.idElement = document.querySelector('.art__id');
        this.buttonsElement = document.querySelector('.art__buttons');
        this.yearElement = document.querySelector('.art__year');
        this.artistElement = document.querySelector('.art__artist');
        this.techniqueElement = document.querySelector('.art__technique');
        this.descriptionElement = document.querySelector('.art__description');
        this.colorsElement = document.querySelector('.art__colors');
        this.closeButton.addEventListener('click', () => {
            this.modalELement.style.display = 'none';
        });
    }
    render(art) {
        this.modalELement.style.display = 'flex';
        this.imageElement.src = art.primaryimageurl;
        this.idElement.textContent = art.id.toString();
        this.yearElement.textContent = art.dated;
        this.artistElement.textContent = `Artista: ${art.people === undefined || art.people === null ? "Desconhecido" : art.people[0].name}`;
        this.techniqueElement.textContent = `Técnica: ${art.technique === null ? "Sem informações" : art.technique}`;
        this.descriptionElement.textContent = art.description;
        this.colorsElement.innerHTML = "";
        art.colors.forEach(color => {
            const colorElement = document.createElement('div');
            colorElement.classList.add('art__color');
            colorElement.style.backgroundColor = color.color;
            const span = document.createElement('span');
            span.textContent = color.color;
            colorElement.appendChild(span);
            colorElement.addEventListener('click', () => {
                const colorHEX = color.color;
                navigator.clipboard.writeText(colorHEX)
                    .then(() => console.log('copiado'))
                    .catch((err) => console.log(err));
            });
            this.colorsElement.appendChild(colorElement);
        });
        const saveButton = document.createElement('a');
        saveButton.innerHTML = '<i class="uil uil-bookmark"></i>';
        saveButton.classList.add('save__button');
        saveButton.addEventListener('click', () => {
            this.saveArt(JSON.stringify(art));
        });
        this.buttonsElement.innerHTML = "";
        this.buttonsElement.appendChild(saveButton);
    }
    saveArt(art) {
        const arts = JSON.parse(localStorage.getItem('saved')) || [];
        const artJSON = JSON.parse(art);
        const artsToSave = arts.filter((savedArt) => artJSON.id !== savedArt.id);
        if (artsToSave.length === arts.length) {
            artsToSave.push(artJSON);
            console.log('entrou');
        }
        localStorage.setItem('saved', JSON.stringify(artsToSave));
    }
}
