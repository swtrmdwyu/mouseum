import { VerifyColor } from "../utils/VerifyColor.js";

export class ModalController {
    private modalELement: HTMLDivElement;
    private closeButton: HTMLImageElement;
    private imageElement: HTMLImageElement;
    private idElement: HTMLParagraphElement;
    private buttonsElement: HTMLDivElement;
    private titleElement: HTMLHeadingElement;
    private yearElement: HTMLParagraphElement;
    private artistElement: HTMLParagraphElement;
    private techniqueElement: HTMLParagraphElement;
    private descriptionElement: HTMLParagraphElement;
    private colorsElement: HTMLDivElement;

    constructor () { 
        this.modalELement = document.querySelector('.modal') as HTMLDivElement;
        this.closeButton = document.querySelector('.close__button') as HTMLImageElement;
        this.imageElement = document.querySelector('.art__img') as HTMLImageElement;
        this.idElement = document.querySelector('.art__id') as HTMLParagraphElement;
        this.buttonsElement = document.querySelector('.art__buttons') as HTMLDivElement;
        this.titleElement = document.querySelector('.art__title') as HTMLHeadingElement;
        this.yearElement = document.querySelector('.art__year') as HTMLParagraphElement;
        this.artistElement = document.querySelector('.art__artist') as HTMLParagraphElement;
        this.techniqueElement = document.querySelector('.art__technique') as HTMLParagraphElement;
        this.descriptionElement = document.querySelector('.art__description') as HTMLParagraphElement;
        this.colorsElement = document.querySelector('.art__colors') as HTMLDivElement;

        this.closeButton.addEventListener('click', () => {
            this.modalELement.style.display = 'none';
        })
    }


    public render(art: Art):void {
        this.modalELement.style.display = 'flex';
        this.imageElement.src = art.primaryimageurl;
        this.idElement.textContent = art.id.toString();
        this.titleElement.textContent = art.title;
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
            span.style.color = VerifyColor.color(color.color);

            colorElement.appendChild(span);
            colorElement.addEventListener('click', () => {
                const colorHEX = color.color;

                navigator.clipboard.writeText(colorHEX)
                    .then(() => console.log('copiado'))
                    .catch((err) => console.log(err))
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
        this.buttonsElement.appendChild(saveButton)
    }

    private saveArt(art: string) {
        const arts = JSON.parse(localStorage.getItem('saved')) || [];
        const artJSON = JSON.parse(art);
        const artsToSave = arts.filter((savedArt: Art) => artJSON.id !== savedArt.id);

        if(artsToSave.length === arts.length) {
            artsToSave.push(artJSON);
            console.log('entrou')
        }

        localStorage.setItem('saved', JSON.stringify(artsToSave));
    }

    private formatText(type: string, text: string) {
        //formatar titulo
        //formatar tamanho da descrição
    }
}