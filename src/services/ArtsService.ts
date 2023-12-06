export class ArtsService {
    private APIKey: string

    constructor() {
        this.APIKey = '8bbd5817-292e-477f-8f11-4a4df88b74ee';
    }

    public async getRandomArts(page: number): Promise<[]>{
         return fetch(`https://api.harvardartmuseums.org/object?sort=random&hasimage=1&q=imagepermissionlevel:0&size=5&page=${page}&apikey=${this.APIKey}`)
                    .then(res => res.json())
                    .then(records => records.records);
    }
}


