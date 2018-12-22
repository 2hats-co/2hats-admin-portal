export const sleep = millis => {
  return new Promise(resolve => setTimeout(resolve, millis));
};

export const globalReplace = (string, tag, value) => {
  var re = new RegExp(tag, 'g');
  return string.replace(re, value);
};

export const copyToClipboard = text => {
  const dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
};
export function makeId(chars) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < chars; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export const propsIntoObject = props =>
  props.reduce((r, c) => Object.assign(r, c), {});

export const getInitials = displayName => {
  let initials = displayName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export const removeHtmlTags = text => {
  const htmlTags = /(<([^>]+)>)/gi;
  return text.replace(htmlTags, '');
};

export const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getRandomId = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const idealTextColor = rgbColor => {
  const splitColor = rgbColor
    .replace('rgb(', '')
    .replace(')', '')
    .split(',');
  const components = { R: splitColor[0], G: splitColor[1], B: splitColor[2] };

  const nThreshold = 105;
  const bgDelta =
    components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

  return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff';
};

export const randomGreeting = () => {
  const greetings = [
    'Hey',
    'Howdy',
    '¡Hola',
    'Sup',
    'What’s good',
    'Shalom',
    'Yee haw',
    'Top of the morning to ya',
    'Bone app the teeth',
    'Great to see ya',
    '¡Feliz cumpleaños',
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
};
