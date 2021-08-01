/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { getItem, setItem } from '../common/storage.js';
import shmoment from '../common/shmoment.js';
import { openPopup, closePopup } from '../common/popup.js';

const weekElem = document.querySelector('.calendar__week');
const deleteEventBtn = document.querySelector('.delete-event-btn');

function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage

  if (
    !event.target.classList.contains('event') &&
    !event.target.classList.contains('event__title') &&
    !event.target.classList.contains('event__time')
  )
    return;

  const y = event.pageY;
  const x = event.pageX;
  openPopup(x, y);

  if (
    event.target.classList.contains('event__title') ||
    event.target.classList.contains('event__time')
  ) {
    setItem('eventIdToDelete', event.target.closest('.event').dataset.id);
  } else {
    setItem('eventIdToDelete', event.target.dataset.id);
  }
}

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря

  setItem('events', []);
}

const createEventElement = event => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement

  const eventBlock = document.createElement('div');
  eventBlock.classList.add('event');
  eventBlock.dataset.id = event.id;
  eventBlock.innerHTML = `<span class="event__title">${event.title}</span>
  <span class="event__time">${event.startTime} - ${event.endTime}</span>`;
  eventBlock.setAttribute(
    'style',
    `top: ${event.start.getMinutes()}px; height: ${
      (event.end - event.start) / 1000 / 60
    }px`
  );

  return eventBlock;
};

export const renderEvents = () => {
  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых

  const events = getItem('events');
  const weekStart = getItem('displayedWeekStart');

  const weekEventsList = events.filter(
    eventEl =>
      eventEl.start.getTime() > weekStart.getTime() &&
      eventEl.start.getTime() <
        shmoment(weekStart).add('days', 7).result().getTime()
  );

  weekEventsList.forEach(eventEl => {
    const eventCell = document
      .querySelector(`.calendar__day[data-time = '${eventEl.start.getDate()}']`)
      .querySelector(
        `.calendar__time-slot[data-time = '${eventEl.start.getHours()}']`
      );
    eventCell.append(createEventElement(eventEl));
  });
};

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)

  const eventsList = getItem('events');
  const eventIdToDelete = getItem('eventIdToDelete');

  const newEventsList = eventsList.filter(({ id }) => +id !== +eventIdToDelete);
  setItem('events', newEventsList);

  document.querySelector(
    `.event[data-id = '${eventIdToDelete}']`
  ).parentElement.innerHTML = '';

  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener('click', onDeleteEvent);

weekElem.addEventListener('click', handleEventClick);
