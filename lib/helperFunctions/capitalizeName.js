const capatalizeFirstLetterOfWord = name => {
  const nameArr = name.split(' ');
  const firstAndOrLastNameArr = nameArr.map(word => {
    const firstLetterUppercase = word.slice(0, 1).toUpperCase();
    const restOfWord = word.slice(1);
    const capitalWord = firstLetterUppercase.concat(restOfWord);
    return capitalWord;
  });
  const capitalName = firstAndOrLastNameArr.join(' ');
  return capitalName;
};

module.exports = capatalizeFirstLetterOfWord;
