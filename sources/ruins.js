import range from "~/sources/range";

export default [
  {roll: range(7, 1), title: 'None', investigationDC: 0, findsRollCount: 0, findsDice: 0, findsBaseValue: 0},
  {
    roll: [8, 9, 10],
    title: 'Completely crumbled or already ransacked',
    investigationDC: 0,
    findsRollCount: 0,
    findsDice: 0,
    findsBaseValue: 0
  },
  {
    roll: [11, 12],
    title: 'Small, badly damaged',
    investigationDC: 13,
    findsRollCount: 1,
    findsDice: 4,
    findsBaseValue: 2
  },
  {roll: [13, 14], title: 'Small, dilapidated', investigationDC: 11, findsRollCount: 1, findsDice: 6, findsBaseValue: 2},
  {
    roll: [15, 16],
    title: 'Small, well preserved',
    investigationDC: 10,
    findsRollCount: 1,
    findsDice: 8,
    findsBaseValue: 2
  },
  {
    roll: [17, 18],
    title: 'Medium, badly damaged',
    investigationDC: 17,
    findsRollCount: 2,
    findsDice: 6,
    findsBaseValue: 2
  },
  {roll: [19], title: 'Medium, dilapidated', investigationDC: 15, findsRollCount: 2, findsDice: 8, findsBaseValue: 2},
  {
    roll: [20],
    title: 'Medium, well-preserved',
    investigationDC: 14,
    findsRollCount: 2,
    findsDice: 10,
    findsBaseValue: 2
  },
  {roll: [21], title: 'Grand, badly damaged', investigationDC: 21, findsRollCount: 3, findsDice: 8, findsBaseValue: 2},
  {roll: [22], title: 'Grand, dilapidated', investigationDC: 19, findsRollCount: 3, findsDice: 10, findsBaseValue: 2},
  {
    roll: range(7, 23),
    title: 'Grand, well-preserved',
    investigationDC: 18,
    findsRollCount: 3,
    findsDice: 12,
    findsBaseValue: 2
  },
]
