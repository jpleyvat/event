const date = new Date("April 22, 2021 00:00:00");
// const date = new Date("April 08, 2021 21:05:00");
// const date = Date.now();
let _date = true;

const [getSeconds, getMinutes, getHours, getDays] = [
  (date) => [Math.floor(date / 1000), date % 1000],
  (date) => [Math.floor(date / 60000), date % 60000],
  (date) => [Math.floor(date / 3600000), date % 3600000],
  (date) => [Math.floor(date / 86400000), date % 86400000],
];

const loader = setTimeout(() => {
  document.getElementById("before-event").style.display = "block";
}, 1000);

const getRemainingTime = (date) => {
  let days, hours, minutes, seconds, miliseconds;
  [days, miliseconds] = getDays(date);
  [hours, miliseconds] = getHours(miliseconds);
  [minutes, miliseconds] = getMinutes(miliseconds);
  [seconds, miliseconds] = getSeconds(miliseconds);
  return [days, hours, minutes, seconds];
};

const timer = setInterval(() => {
  const remainingtime = getRemainingTime(date - Date.now());
  _date = Date.now() - date <= 0;
  // _date = false;
  _date
    ? [
        document.getElementById("days"),
        document.getElementById("hours"),
        document.getElementById("minutes"),
        document.getElementById("seconds"),
      ].map((element, index) => {
        element.innerHTML = remainingtime[index];
      })
    : (() => {
        clearInterval(timer);
        document.getElementById("before-event").style.display = "none";
        document.getElementById("event").style.display = "block";
      })();
}, 1000);
