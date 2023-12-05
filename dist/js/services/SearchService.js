export class SearchService {
    APIKey;
    page;
    constructor(APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee', page = 1) {
        this.APIKey = APIKey;
        this.page = page;
    }
    async searchArts(searchValue, size = 10) {
        return fetch(`https://api.harvardartmuseums.org/object?q=${searchValue}&size=${size}&page=${this.page}&hasimage=1&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(async (records) => {
            const arts = records.records;
            for (let i = 0; i < arts.length; i++) {
                if (!arts[i].primaryimageurl) {
                    while (true) {
                        this.page++;
                        const newArt = await this.newSearch(searchValue);
                        console.log(newArt[0]);
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
    async searchArtsByTitle(title) {
        return fetch(`https://api.harvardartmuseums.org/object?title=${title}&size=3&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
    async searchArtsByPerson(person) {
        return fetch(`https://api.harvardartmuseums.org/object?person=${person}&size=3&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
    async searchArtsByTechnique(technique) {
        return fetch(`https://api.harvardartmuseums.org/object?technique=${technique}&size=3&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
    async newSearch(searchValue) {
        return fetch(`https://api.harvardartmuseums.org/object?q=${searchValue}&size=1&page=${this.page}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(records => records.records);
    }
}
