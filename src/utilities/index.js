export const sleep = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis));
}

export const globalReplace = (string,tag,value) =>{
    var re = new RegExp(tag, 'g');
    return string.replace(re,value);
}

export const copyToClipboard = (text) => {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}

export const propsIntoObject = (props) =>{return props.reduce(((r, c) => Object.assign(r, c)), {})}
