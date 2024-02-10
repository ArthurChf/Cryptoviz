export const capitalize = (str: string) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
};

export const truncate = (str: string, maxLength: number) => {
    let res = str;
    if (str.length > maxLength) {
        res = `${str.substring(0, maxLength)}...`;
    }
    return res;
};
