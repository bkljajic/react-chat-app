export const replaceStringWithEmoji = (string) => {
  const emojiMap = {
    '(smile)': '😊',
    '(wink)': '😉'
  };
  let regex = /(\(smile\)|\(wink\))/g
  return string.replace(regex, (m) => emojiMap[m] || m)
};
