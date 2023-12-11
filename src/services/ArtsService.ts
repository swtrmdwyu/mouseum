export class ArtsService {
    private APIKey ='8bbd5817-292e-477f-8f11-4a4df88b74ee';
    private baseURL = 'https://api.harvardartmuseums.org/object'
    private fields = 'id,title,description,primaryimageurl,people,dated,technique,colors'
    private permission = 'imagepermissionlevel:0'

    constructor() { }

    public async getRandomArts(page: number): Promise<Art[]>{
         return fetch(`${this.baseURL}?sort=random&hasimage=1&q=${this.permission}&fields=${this.fields}&size=5&page=${page}&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(records => records.records);
    }

    public async getArt(id: string): Promise<Art[]> {
        return fetch(`${this.baseURL}?id=${id}&fields=${this.fields}&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(records => records.records);
    }
}


