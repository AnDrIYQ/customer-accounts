export default function(variable) {
    return (
        variable === undefined ||
        variable === null ||
        variable === false ||
        variable === 0 ||
        variable === '' ||
        variable === '0' ||
        (typeof variable === 'object' && !Object.keys(variable)?.length) ||
        (variable instanceof Array && !variable?.length)
    );
};