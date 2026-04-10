export const handleLanguage = (
    lang: string,
    
    library: {
        ar: Object,
        en: Object,
        tu: Object,
        au: Object,
    }) => {

    switch (lang) {
        case "ar":
            return library.ar;
        case "en":
            return library.en;
        case "tu":
            return library.tu;
        case "au":
            return library.au;
        default:
            return library.en;
    }

}