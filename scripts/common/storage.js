/* eslint-disable no-unused-vars */
const storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [
    {
      // пример объекта события

      description: 'qwe',
      end: new Date(
        'Sun Aug 01 2021 15:55:00 GMT+0300 (Восточная Европа, летнее время)'
      ),
      endTime: '15:55',
      id: 0.1379407929872345,
      start: new Date(
        'Sun Aug 01 2021 04:43:00 GMT+0300 (Восточная Европа, летнее время)'
      ),
      startTime: '04:43',
      title: 'Milk',
    },
  ],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const setItem = (key, value) => {
  // ф-ция должна устанавливать значения в объект storage
  storage[key] = value;
};

// ф-ция должна возвращать по ключу значения из объекта storage
export const getItem = key => storage[key];

// пример объекта события
// const eventExample = {
//   id: 0.7520027086457333, // id понадобится для работы с событиями
//   title: 'Title',
//   description: 'Some description',
//   start: new Date('2021-07-30T01:10:00.000Z'),
//   end: new Date('2021-07-30T04:30:00.000Z'),
// };
