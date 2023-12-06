export class SearchService {
    constructor (private APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee', private page = 1) {}

    public async searchArts(searchValue: string, size: number = 10) {
        return fetch(`https://api.harvardartmuseums.org/object?q=(${searchValue} AND imagepermissionlevel:0)&size=${size}&page=${this.page}&hasimage=1&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(q => q.records);
    }    
}