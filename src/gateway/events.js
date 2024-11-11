export const events = [
  {
    id: 1,
    title: 'Go to the gym',
    description: 'some text here',
    dateFrom: new Date(2024, 10, 4, 10, 15),
    dateTo: new Date(2024, 10, 4, 15, 0),
  },
  {
    id: 2,
    title: 'Go to the school',
    description: 'hello, 2 am',
    dateFrom: new Date(2024, 10, 5, 10, 15),
    dateTo: new Date(2024, 10, 5, 11, 0),
  },
  {
    id: 3,
    title: 'Lunch',
    description: '',
    dateFrom: new Date(2024, 10, 8, 10, 30),
    dateTo: new Date(2024, 10, 8, 11, 30),
  },
  {
    id: 4,
    title: 'Meet friend',
    description: 'at the cafe',
    dateFrom: new Date(2024, 10, 6, 10, 30),
    dateTo: new Date(2024, 10, 6, 12, 0),
  },
];

const baseUrl = 'https://66efde95f2a8bce81be46357.mockapi.io/tasks';

export default events;
