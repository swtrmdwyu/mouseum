export class SearchService {
    private APIKey ='8bbd5817-292e-477f-8f11-4a4df88b74ee';
    private baseURL = 'https://api.harvardartmuseums.org/object'
    public page = 1;
    private fields = 'id,primaryimageurl,title,people,technique,person'
    private permission = 'imagepermissionlevel:0'

    constructor () {}

    public async searchArts(searchValue: string): Promise<Art[]> {
        return fetch(`${this.baseURL}?q=(${searchValue} AND ${this.permission})&size=20&page=${this.page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(q => q.records);
    }

    public async searchByFilter(searchValue: string, filter: string) {
        return fetch(`${this.baseURL}?${filter}=${searchValue}&q=${this.permission}&size=20&page=${this.page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
        .then(res => res.json())
        .then(q => q.records);
    }
}