const APIkey = '8bbd5817-292e-477f-8f11-4a4df88b74ee';
export async function getRandomArts(page) {
    const response = await fetch(`https://api.harvardartmuseums.org/object?sort=random&hasimage=1&size=5&page=${page}&apikey=${APIkey}`);
    const data = await response.json();
    console.log(data);
}
