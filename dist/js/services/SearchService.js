export class SearchService {
    APIKey;
    page;
    constructor(APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee', page = 1) {
        this.APIKey = APIKey;
        this.page = page;
    }
    async searchArts(searchValue, size = 10) {
        return fetch(`https://api.harvardartmuseums.org/object?q=(${searchValue} AND imagepermissionlevel:0)&size=${size}&page=${this.page}&hasimage=1&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
}
