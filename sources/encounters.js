import range from "~/sources/range";

export default [
  {roll: [1], title: 'Hunting party', perceptionDC: 15, numberRollCount: 1, numberDice: 6, numberBaseValue: 2},
  {roll: [2], title: 'Missionaries', perceptionDC: 10, numberRollCount: 1, numberDice: 6, numberBaseValue: 4},
  {roll: [3], title: 'Treasure hunters', perceptionDC: 14, numberRollCount: 1, numberDice: 4, numberBaseValue: 6},
  {roll: [4], title: 'Local settlement', perceptionDC: 10, numberRollCount: 2, numberDice: 10, numberBaseValue: 20},
  {roll: [5], title: 'Rangers', perceptionDC: 15, numberRollCount: 1, numberDice: 4, numberBaseValue: 4},
  {roll: [6], title: 'Large expedition', perceptionDC: 12, numberRollCount: 2, numberDice: 10, numberBaseValue: 4},
  {roll: [7], title: 'Nomadic goblins', perceptionDC: 16, numberRollCount: 4, numberDice: 10, numberBaseValue: 4},
  {
    roll: [8],
    title: 'Diplomatic elves, Civilized trolls, Peaceful bestials',
    perceptionDC: 20,
    numberRollCount: 1,
    numberDice: 10,
    numberBaseValue: 4
  },
  {
    roll: range(20, 9),
    title: 'None', perceptionDC: 0, numberRollCount: 1, numberDice: 10, numberBaseValue: 4
  }
]
