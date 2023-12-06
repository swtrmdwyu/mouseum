export class ArtsService {
    APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee';
    baseURL = 'https://api.harvardartmuseums.org/object';
    page = 1;
    fields = 'id,title,description,primaryimageurl,people,dated';
    permission = 'imagepermissionlevel:0';
    constructor() { }
    async getRandomArts(page) {
        return fetch(`${this.baseURL}?sort=random&hasimage=1&q=${this.permission}&fields=${this.fields}&size=5&page=${page}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(records => records.records);
    }
    async getArt(id) {
        return fetch(`${this.baseURL}?id=${id}&fields=${this.fields}&apikey=${this.APIKey}`)
            .then(res => res.json())
            .then(records => records.records);
    }
}
