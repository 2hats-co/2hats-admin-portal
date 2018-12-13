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
export function makeId(chars) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < chars; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export const propsIntoObject = (props) => props.reduce(( (r, c) => Object.assign(r, c) ), {})

export const getInitials = (displayName) => {
    let initials = displayName.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
}

export const removeHtmlTags = (text) => {
    const htmlTags = /(<([^>]+)>)/ig;
    return text.replace(htmlTags, '');
}
