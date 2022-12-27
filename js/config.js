async function getDataFromDB() {
  // data for gacha
  const info = {
    weights: [[5, 0.01], [4, 0.1], [3, 0.89]],
  };
  // data for character
  const master = [
    { id: '5001', rarity: 5, name: 'Angelica' }, // other attributes are ommitted
    { id: '5002', rarity: 5, name: 'Beatrix' },
    { id: '5003', rarity: 5, name: 'Charlotte' },
    { id: '4001', rarity: 4, name: 'Dorothy' },
    { id: '4002', rarity: 4, name: 'Emil' },
    { id: '4003', rarity: 4, name: 'Frederica' },
    { id: '3001', rarity: 3, name: 'Gretel' },
    { id: '3002', rarity: 3, name: 'Hansel' },
    { id: '3003', rarity: 3, name: 'Izabel' },
  ];

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
    config.push({ rarity, prob, ids , names});
  });
  return config;
}