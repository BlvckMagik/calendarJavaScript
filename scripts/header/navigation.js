/* eslint-disable import/extensions */
import { getItem, setItem } from '../common/storage.js';
import { renderRedline } from '../calendar/redline.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import shmoment from '../common/shmoment.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const prevWeekBtn = document.querySelector('[data-direction="prev"]');
const nextWeekBtn = document.querySelector('[data-direction="next"]');
const todayBtn = document.querySelector('[data-direction="today"]');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month

  displayedMonthElem.innerHTML = getDisplayedMonth(
    getItem('displayedWeekStart')
  );
}

const render = () => {
  renderHeader();
  renderWeek();
  renderCurrentMonth();
  renderRedline();
};

const handlePrevWeekBtn = () => {
  setItem(
    'displayedWeekStart',
    shmoment(getItem('displayedWeekStart')).subtract('days', 7).result()
  );
  render();
};

const handleNextWeekBtn = () => {
  setItem(
    'displayedWeekStart',
    shmoment(getItem('displayedWeekStart')).add('days', 7).result()
  );
  render();
};

const handleTodayBtn = () => {
  setItem('displayedWeekStart', getStartOfWeek(new Date()));
  render();
};

export const initNavigation = () => {
  renderCurrentMonth();
  prevWeekBtn.addEventListener('click', handlePrevWeekBtn);
  nextWeekBtn.addEventListener('click', handleNextWeekBtn);
  todayBtn.addEventListener('click', handleTodayBtn);
};
