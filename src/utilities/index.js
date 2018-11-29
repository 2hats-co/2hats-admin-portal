export const sleep = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis));
}

export const globalReplace = (string,tag,value) =>{
    var re = new RegExp(tag, 'g');
    return string.replace(re,value);
}