export default function idToNumber(input){
    let hash = 0, len = input.length;
    for (let i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0;
    }
    if (hash < 1) {
        hash *= 10
    }
    if (hash < 0) {
        hash *= -1;
    }
    return hash;
}