export class ArtsService {
    APIKey;
    constructor() {
        this.APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee';
    }
    async getRandomArts(page) {
        return fetch(`https://api.harvardartmuseums.org/object?sort=random&hasimage=0&size=5&page=${page}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(async (records) => {
            const arts = records.records;
            for (let i = 0; i < arts.length; i++) {
                if (!arts[i].primaryimageurl) {
                    while (true) {
                        const newArt = await this.getRandomArtURL();
                        if (newArt[0].primaryimageurl != null) {
                            arts[i] = newArt[0];
                            break;
                        }
                    }
                }
            }
            return arts;
        });
    }
    async getRandomArtURL() {
        return fetch(`https://api.harvardartmuseums.org/object?sort=random&hasimage=1&size=1&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(records => records.records);
    }
}
