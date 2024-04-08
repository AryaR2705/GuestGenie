const extractInformation = (text) => {
  console.log('Input Text:', text);

  const peoplePattern = /(\d+)\s*(?:mates|gang|friends|group|candidates|people|buddies|comrades|pals|associates|allies|colleagues|chums|fellows|boys|girls|team|crew|partners|person|guys|guy|friend|couples|gangs|couple)/i;

 const peoplePattern1 = /with(?: my)?\s*(?:my|a|some|our|both|the|those)?\s+(?:friend|mom|dad|brother|sister|uncle|aunt|cousin|grandma|grandpa|partner|husband|couples|wife|child|children|kids|us|girlfriend|boyfriend|dude|girl|boy|man|woman|women|mommy|babe|buddy)/i;


  const roomPattern = /(\d+)\s*(?:BHK|bedroom|room)/i;

  const datePattern1 = /(\d+)\s*(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*to\s*(\d+)\s*(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*\d*/i;

  const datePattern2 = /(\d+(?:st|nd|rd|th))\s*(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*to\s*(\d+(?:st|nd|rd|th))\s*(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*\d*/i;

  const peopleMatch = text.match(peoplePattern) || text.match(peoplePattern1);
  const roomMatch = text.match(roomPattern);
  const dateMatch = text.match(datePattern1) || text.match(datePattern2);

  if (!peopleMatch || !roomMatch || !dateMatch) {
    console.error('Error: Unable to extract information.');
    return {
      numPeople: '-',
      roomType: '-',
      checkInDate: '-',
      checkOutDate: '-',
    };
  }

const numPeople = peoplePattern1.test(text) ? 2 : (peopleMatch ? parseInt(peopleMatch[1]) : '-');
  const roomType = roomMatch ? roomMatch[1] : '-';
  const checkInDate = dateMatch ? dateMatch[1] : '-';
  const checkOutDate = dateMatch ? dateMatch[2] || dateMatch[1] : '-';

  console.log('Result:', {
    numPeople,
    roomType,
    checkInDate,
    checkOutDate,
  });

  return {
    numPeople,
    roomType,
    checkInDate,
    checkOutDate,
  };
};

module.exports = extractInformation;
