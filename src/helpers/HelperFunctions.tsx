type ExpectedData = {
  name: string;
  url: string;
};

export function getEveryThirdItem(array: ExpectedData[]) {
  var result = [];
  for (var i = 0; i < array.length; i += 3) {
    result.push(array[i]);
  }
  return result;
}

export function getRandomNumber(limit: number) {
  return Math.floor(Math.random() * limit);
}

export function shuffleCards(data: ExpectedData[] | null) {
  let currentIndex = data!.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = data![currentIndex];
    data![currentIndex] = data![randomIndex];
    data![randomIndex] = temporaryValue;
  }
}
