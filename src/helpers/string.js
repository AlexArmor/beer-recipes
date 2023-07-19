export function truncateString(str, symbols = 100) {
    if (!str) return "";
    if (str.length > symbols) {
        return str.slice(0, symbols) + "...";
    }
    return str;
}