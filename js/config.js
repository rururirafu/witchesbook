function rarityOf(master, id) {
  const me = master.find(x => x.id === id);
  if (me) return me.rarity;
  throw new Error(`no such ID is found: ${id}`);
}

async function getDataFromDB() {
  // data for gacha
  const info = {
    weights: [[5, 0.01], [4, 0.1], [3, 0.89]],
    pickup: [['5001', 0.4], ['5002', 0.4], ['4001', 0.1]],
  };
  // data for character
  const master = [
    { id: '5001', rarity: 5 }, // other attributes are ommitted
    { id: '5002', rarity: 5 },
    { id: '5003', rarity: 5 },
    { id: '4001', rarity: 4 },
    { id: '4002', rarity: 4 },
    { id: '4003', rarity: 4 },
    { id: '3001', rarity: 3 },
    { id: '3002', rarity: 3 },
    { id: '3003', rarity: 3 },
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
    const pickups = info.pickup
      .filter(x => rarityOf(master, x[0]) === rarity);
    config.push({ rarity, prob, pickups, ids });
  });
  return config;
}