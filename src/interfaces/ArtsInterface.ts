interface Art {
    id: number;
    title: string;
    description: string;
    primaryimageurl: string;
    people: any[];
    dated: string;
    technique: string;
    colors: [{
        color: string,
        spectrum: string,
        hue: string,
        percent: number,
        css3: string
    }]
    
}