export function loadTokens(tokenString: string) {
    let tokens: any = JSON.parse(tokenString);

    let entities: any = tokens.entities.reduce(
        (obj:any, item:any) => Object.assign(obj, { [item.id]: item.value })
    );

    let paletteFilter:any = Object.keys(entities)
    .filter((key) => key.includes('palette'))
    .reduce((obj:any, key:string) => {
        let newKey:string = key.split(".")[3];
        return Object.assign(obj, {[newKey]: entities[key]}, {})
    })
    let sysFilter:any = Object.keys(entities)
    .filter((key) => key.includes('sys'))
    .reduce((obj:any, key:string) => {
        let keySplit:string[] = key.split(".");
        if (keySplit[4] != undefined) {
            let newKey:string = keySplit[3] + "." + keySplit[4];
            return Object.assign(obj, {[newKey]: entities[key]}, {})
        } else {
            return Object.assign(obj, {}, {})
        }
    })

    // console.log(sysFilter);

    const palette: { [key: string]: { [key: number]: string } } = {};

    for (const key in paletteFilter) {
        if (paletteFilter.hasOwnProperty(key)) {
            const match = key.match(/([a-z\-]+)(\d{0,3})/);
            
            if (match) {
                const [, type, weight] = match;
                const numericWeight: number = parseInt(weight);
                
                if (!(type in palette)) {
                    palette[type] = {};
                }
                
                palette[type][numericWeight] = paletteFilter[key];
            }
        }
    }

    const colors: {[key: string]: {[key: string]: string}} = {};

    for (const key in sysFilter) {
        if (sysFilter.hasOwnProperty(key)) {
            const match = key.split(".");
            
            if (match.length == 2) {
                const [field, dispMode] = match;
                
                if (!(dispMode in colors)) {
                    colors[dispMode] = {};
                }
                
                colors[dispMode][field] = sysFilter[key];
            }
        }
    }

    // console.log({...colors, ...palette});
    return {...colors, ...palette};
}
