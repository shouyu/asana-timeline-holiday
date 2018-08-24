const coloringHoliday = () => {
  const axisGroup = document.getElementsByClassName('TimelineTimeAxis-group');
  Array.prototype.forEach.call(axisGroup, el => {
    // monthText = 'June' or 'June 2019'
    const monthText = el.querySelector('.TimelineTimeAxis-groupLabel')
      .textContent;
    const monthYear = monthText.split(' ');
    const month = monthYear[0];
    const year = monthYear[1] != undefined ? monthYear[1] : moment().year();

    const days = el.querySelectorAll('.TimelineTimeAxis-intervalLabel--day');
    Array.prototype.forEach.call(days, dayEl => {
      const dayText = dayEl.textContent;
      const date = moment(`${dayText}-${month}-${year}`, 'D-MMMM-YYYY');
      const isHoliday = date.day() === 0 || date.day() === 6;
      if (isHoliday) {
        dayEl.classList.add('holiday-indicator');
      }
    });
  });
};

let observer = undefined;
const loadingObserver = new MutationObserver(() => {
  if (document.getElementsByClassName('TimelineTimeAxis').length > 0) {
    observer = new MutationObserver(coloringHoliday);
    observer.observe(document.getElementsByClassName('TimelineTimeAxis')[0], {
      attribute: true,
      childList: true
    });
    loadingObserver.disconnect();
  }
});

loadingObserver.observe(
  document.getElementsByClassName('ProjectPageView-timelineMountNode')[0],
  {
    childList: true
  }
);
