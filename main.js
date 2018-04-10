/*
 Напишите скрипт который реализует следующее поведение:

 - При нажатии на клавишу (не виртуальной клавиатуры) должно
  обрабатываться событие keydown.
  (Для обработки нажатия нажатия клавиш, повесьте слушателя на window.
  window.addEventListener("keydown", callback);)

 - Должны обрабатываться только те клавиши, которые присутствуют
  в разметке HTML (на виртуальной клавиатуре).

 - Звук нажатия на клавишу должен соответсвовать ноте, описанной
  в атрибуте button data-note.

 - Подсветку текущей клавиши реализуйте с помощью класса
  keyboard__btn--active.

 - Чекбокс Sound должен включать и выключать звук нажатия на клавиши.
*/
const soundSwitcher = document.querySelector('#slideThree');
const checkSound = {
  playSound: soundSwitcher.checked
}

playSound = note => {
  const audio = document.querySelector(`audio[data-note=${note}]`);
  audio.currentTime = 0;
  audio.play();
};

const buttons = Array.from(document.querySelectorAll('button'));
const keys = "qwertyuiop[]asdfghjkl;'zxcvbnm,./".split('');

const keydown = (event) => {
  console.log('event targer', event.target);
};

soundSwitcher.addEventListener('click', (event) => {
  checkSound.playSound = event.target.checked
  ? true
  : false;
});

const keydownEvent = (event) => {
  if (keys.includes(event.key)) {
    const currentButton = buttons.find((element) => {
      return element.textContent == event.key;
    });
    currentButton.classList.add('keyboard__btn--active');  // добавляем класс active для подсветки
    // console.log(currentButton.textContent);

    let note = currentButton.getAttribute("data-note");
    if (checkSound.playSound) playSound(note);  // подключаем мелодию для выбраной ноты
  }
}

const keyupEvent = (event) => {
  const activeButtons = document.querySelectorAll('.keyboard__btn--active'); //Выбераем все подсвеченые елементы
  activeButtons.forEach((element) => {
    element.classList.remove('keyboard__btn--active');  //Проходимся по каждому елементу маи удаляем класс active
  });
}

window.addEventListener('keydown', keydownEvent);
window.addEventListener('keyup', keyupEvent);
