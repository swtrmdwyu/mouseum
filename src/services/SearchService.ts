export class SearchService {
    private APIKey ='8bbd5817-292e-477f-8f11-4a4df88b74ee';
    private baseURL = 'https://api.harvardartmuseums.org/object'
    private fields = 'id,primaryimageurl,title,people,technique,person'
    private permission = 'imagepermissionlevel:0'

    constructor () {}

    public async searchArts(searchValue: string, page: number): Promise<Art[]> {
        return fetch(`${this.baseURL}?q=(${searchValue} AND ${this.permission})&size=5&page=${page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(q => q.records);
    }

    public async searchByFilter(searchValue: string, filter: string, page: number) {
        return fetch(`${this.baseURL}?${filter}=${searchValue}&q=${this.permission}&size=20&page=${page}&hasimage=1&fields=${this.fields}&apikey=${this.APIKey}`)
        .then(res => res.json())
        .then(q => q.records);
    }
}