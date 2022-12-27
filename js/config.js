async function getDataFromDB() {
  // data for gacha
  const info = {
    weights: [[5, 0.01], [4, 0.1], [3, 0.89]],
  };

// Read the CSV file and parse its contents into an array of objects
  const response = await fetch('res/data.csv');
  const text = await response.text();
  const lines = text.split('\n');
  const keys = lines[0].split(',');
  const master = lines.slice(1).map(line => {
    const values = line.split(',');
    return keys.reduce((obj, key, index) => {
      obj[key] = key === 'rarity' ? parseInt(values[index], 10) : values[index];
      return obj;
    }, {});
  });

  return [info, master];
}

export async function getConfig() {
  const config = [];
  const [info, master] = await getDataFromDB();
  info.weights.forEach(([rarity, prob]) => {
    const ids = master
      .filter(x => x.rarity === rarity)
      .map(x => x.id);
    const names = master
      .filter(x => x.rarity === rarity)
      .map(x => x.name);
    config.push({ rarity, prob, ids, names });
  });
  return config;
}