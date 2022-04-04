const today = new Date();
const year = today.getFullYear();

const date = new Date(`April 22, ${year} 00:00:00`);
let _date = true;

const loader = setTimeout(() => {
  showElement("before-event");
  hideElement("event");
}, 1000);

let timer = setInterval(() => {
  const remainingtime = getRemainingTime(date - Date.now());
  _date = Date.now() - date <= 0;
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
        setTimeout(() => {
          hideElement("before-event");
          setTimeout(() => {
            clearInterval(timer);
            showElement("event");
          }, 1000);
        }, 2000);
      })();
}, 1000);

// Functions
function showElement(id) {
  let element = document.getElementById(id);
  element.style.display = "flex";
  let show = setInterval(() => {
    let opacity =
      element.style.opacity.length > 0 ? parseFloat(element.style.opacity) : 0;
    if (element.style.opacity < 1) {
      element.style.opacity = (opacity + 0.01).toString();
    } else {
      clearInterval(show);
    }
  }, 10);
}

function hideElement(id) {
  let element = document.getElementById(id);
  let hide = setInterval(() => {
    let opacity = parseFloat(element.style.opacity);
    if (element.style.opacity > 0) {
      element.style.opacity = (opacity - 0.01).toString();
    } else {
      element.style.display = "none";
      clearInterval(hide);
    }
  }, 10);
}

const [getSeconds, getMinutes, getHours, getDays] = [
  (date) => [Math.floor(date / 1000), date % 1000],
  (date) => [Math.floor(date / 60000), date % 60000],
  (date) => [Math.floor(date / 3600000), date % 3600000],
  (date) => [Math.floor(date / 86400000), date % 86400000],
];

const getRemainingTime = (date) => {
  let days, hours, minutes, seconds, miliseconds;
  [days, miliseconds] = getDays(date);
  [hours, miliseconds] = getHours(miliseconds);
  [minutes, miliseconds] = getMinutes(miliseconds);
  [seconds, miliseconds] = getSeconds(miliseconds);
  return [days, hours, minutes, seconds];
};
