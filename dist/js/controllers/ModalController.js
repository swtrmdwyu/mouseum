import { VerifyColor } from "../utils/VerifyColor.js";
import { MessageView } from "../views/MessageView.js";
export class ModalController {
    modalELement;
    closeButton;
    imageElement;
    idElement;
    buttonsElement;
    titleElement;
    yearElement;
    artistElement;
    techniqueElement;
    descriptionElement;
    colorsElement;
    messageView = new MessageView();
    constructor() {
        this.modalELement = document.querySelector('.modal');
        this.closeButton = document.querySelector('.close__button');
        this.imageElement = document.querySelector('.art__img');
        this.idElement = document.querySelector('.art__id');
        this.buttonsElement = document.querySelector('.art__buttons');
        this.titleElement = document.querySelector('.art__title');
        this.yearElement = document.querySelector('.art__year');
        this.artistElement = document.querySelector('.art__artist');
        this.techniqueElement = document.querySelector('.art__technique');
        this.descriptionElement = document.querySelector('.art__description');
        this.colorsElement = document.querySelector('.art__colors');
        this.closeButton.addEventListener('click', () => {
            this.modalELement.style.display = 'none';
            this.modalELement.style.opacity = '0';
        });
        this.formatText('title', 'lore');
    }
    render(art) {
        this.modalELement.style.opacity = '1';
        this.modalELement.style.display = 'flex';
        this.imageElement.src = art.primaryimageurl;
        this.idElement.textContent = art.id.toString();
        this.titleElement.textContent = this.formatText('title', art.title);
        this.yearElement.textContent = art.dated;
        this.artistElement.textContent = `Artist: ${art.people === undefined || art.people === null ? "Unknow" : art.people[0].name}`;
        this.techniqueElement.textContent = `Technique: ${art.technique === null ? "Unknow" : art.technique}`;
        this.descriptionElement.textContent = this.formatText('description', art.description);
        this.colorsElement.innerHTML = "";
        art.colors.forEach(color => {
            const colorElement = document.createElement('div');
            colorElement.classList.add('art__color');
            colorElement.style.backgroundColor = color.color;
            const span = document.createElement('span');
            span.textContent = color.color;
            span.style.color = VerifyColor.color(color.color);
            colorElement.appendChild(span);
            colorElement.addEventListener('click', () => {
                const colorHEX = color.color;
                navigator.clipboard.writeText(colorHEX)
                    .then(() => this.messageView.success('HEX copiedvs!'))
                    .catch((err) => console.log(err));
            });
            this.colorsElement.appendChild(colorElement);
        });
        const saveButton = document.createElement('a');
        saveButton.innerHTML = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" fill="none"/>
                                    <path id="path" class="not-saved" fill-rule="evenodd" clip-rule="evenodd" d="M20 5L20 19.0536C20 21.3571 17.5116 22.8012 15.5116 21.6584L12.4961 19.9353C12.1887 19.7596 11.8113 19.7596 11.5039 19.9353L8.48842 21.6584C6.48845 22.8012 4 21.3571 4 19.0536L4 5C4 3.34314 5.34315 2 7 2L17 2C18.6569 2 20 3.34315 20 5Z" fill="#1e1e1e"/>
                                </svg>`;
        saveButton.classList.add('save__button');
        const saveButtonPath = saveButton.querySelector('#path');
        const storage = localStorage.getItem('saved');
        if (storage) {
            const saved = JSON.parse(storage);
            saved.forEach((item) => {
                if (item.id === art.id) {
                    saveButtonPath.classList.remove('not-saved');
                    saveButtonPath.classList.add('saved');
                }
            });
        }
        saveButton.addEventListener('click', () => {
            this.saveArt(JSON.stringify(art));
            if (saveButtonPath.classList.contains('not-saved')) {
                saveButtonPath.classList.remove('not-saved');
                saveButtonPath.classList.add('saved');
                this.messageView.success('Image saved sucessfully!');
            }
            else {
                saveButtonPath.classList.remove('saved');
                saveButtonPath.classList.add('not-saved');
                this.messageView.success('Image removed!');
            }
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
        }
        localStorage.setItem('saved', JSON.stringify(artsToSave));
    }
    formatText(type, text) {
        let formatedText = '';
        if (text) {
            if (type === 'title') {
                const titleLength = text.length;
                if (titleLength >= 50) {
                    formatedText = text.slice(0, 49) + '...';
                }
                else {
                    return text;
                }
            }
            else {
                const descriptionLength = text.length;
                if (descriptionLength >= 150) {
                    formatedText = text.slice(0, 149) + '...';
                }
                else {
                    return text;
                }
            }
        }
        return formatedText;
    }
}
