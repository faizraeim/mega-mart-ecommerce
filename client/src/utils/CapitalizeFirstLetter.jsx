function CapitalizeFirstLetter(string) {
    if(!string) return "Unknown";

    const str = String(string)
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default CapitalizeFirstLetter