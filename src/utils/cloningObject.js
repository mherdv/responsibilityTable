function isObject(obj) {
    var type = typeof obj;
    // eslint-disable-next-line
    return type === 'function' || type === 'object' && !!obj;
};
function iterationCopy(src) {
    let target = src instanceof Array ? [] : {};
    for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
            // if the value is a nested object, recursively copy all it's properties
            if (isObject(src[prop])) {
                target[prop] = iterationCopy(src[prop]);
            } else {
                target[prop] = src[prop];
            }
        }
    }
    return target;
}

function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
}


export { iterationCopy, jsonCopy }