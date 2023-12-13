export class SearchService {
    APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee';
    baseURL = 'https://api.harvardartmuseums.org/object';
    fields = 'id,primaryimageurl,title,people,technique,person';
    permission = 'imagepermissionlevel:0';
    constructor() { }
    async searchArts(searchValue, page) {
        return fetch(`${this.baseURL}?q=(${searchValue} AND ${this.permission})&size=5&page=${page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
    async searchByFilter(searchValue, filter, page) {
        return fetch(`${this.baseURL}?${filter}=${searchValue}&q=${this.permission}&size=20&page=${page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(q => q.records);
    }
}
