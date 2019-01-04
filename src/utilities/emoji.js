import emojiRegex from 'emoji-regex';

export const isOnlyEmojis = message => {
  const noEmojis = message.replace(emojiRegex(), '');
  const noSpace = noEmojis.replace(/[\s\n]/gm, '');

  return !noSpace;
};
