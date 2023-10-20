

const getLocale = (text) => {
    switch (text) {
        case "en-US":
            return "en";
        case "in-HI":
            return "hi";
        case "cn-CN":
            return "cn";
        default:
            return "en";
    }
};

export default getLocale;