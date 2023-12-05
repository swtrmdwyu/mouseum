export class SearchService {
    constructor (private APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee', private page = 1) {}

    public async searchArts(searchValue: string, size: number = 10) {
        return fetch(`https://api.harvardartmuseums.org/object?q=${searchValue}&size=${size}&page=${this.page}&hasimage=1&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(async records => {
                        const arts = records.records;
                        for(let i = 0; i < arts.length; i++) {
                            if (!arts[i].primaryimageurl) {
                                while(true) {
                                    this.page++
                                    const newArt = await this.newSearch(searchValue);
                                    console.log(newArt[0])
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

    public async searchArtsByTitle(title: string) {
        return fetch(`https://api.harvardartmuseums.org/object?title=${title}&size=3&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(q => q.records);
    }

    public async searchArtsByPerson(person: string) {
        return fetch(`https://api.harvardartmuseums.org/object?person=${person}&size=3&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(q => q.records);
    }
    
    public async searchArtsByTechnique(technique: string) {
        return fetch(`https://api.harvardartmuseums.org/object?technique=${technique}&size=3&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(q => q.records);
    }

    private async newSearch(searchValue: string) {
        return fetch(`https://api.harvardartmuseums.org/object?q=${searchValue}&size=1&page=${this.page}&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(records => records.records);
    }
    
}