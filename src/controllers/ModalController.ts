export class ModalController {
    private modalELement: HTMLDivElement;
    private closeButton: HTMLImageElement;
    private imageElement: HTMLImageElement;
    private idElement: HTMLParagraphElement;
    private downloadButton: HTMLAnchorElement;
    private saveButton: HTMLAnchorElement;
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
        this.downloadButton = document.querySelector('.download__button') as HTMLAnchorElement;
        this.saveButton = document.querySelector('.save__button') as HTMLAnchorElement;
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
                    .catch((err) => console.log(err))
            });

            this.colorsElement.appendChild(colorElement);
        });
        
        this.downloadButton.addEventListener('click', () => {
            this.downloadImage(art.primaryimageurl)
        })

        this.saveButton.addEventListener('click', () => {
            this.saveArt(JSON.stringify(art));
        })
    }

    private downloadImage(url: string) {
        //baixar imagem
    }

    private saveArt(art: string) {
        const arts = JSON.parse(localStorage.getItem('saved')) || [];
        
        arts.push(JSON.parse(art));
        
        localStorage.setItem('saved', JSON.stringify(arts));
        console.log(arts)
    }
}