export class SearchService {
    APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee';
    baseURL = 'https://api.harvardartmuseums.org/object';
    page = 1;
    fields = 'id,primaryimageurl';
    permission = 'imagepermissionlevel:0';
    constructor() { }
    async searchArts(searchValue) {
        return fetch(`${this.baseURL}?q=(${searchValue} AND ${this.permission})&size=20&page=${this.page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
}
