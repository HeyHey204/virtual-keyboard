import keys from './keys.js';

export default function initLayout() {
  const BODY_ELEMENT = document.body;
  const HEADER_ELEMENT = document.createElement('header');
  const TITLE_ELEMENT = document.createElement('h1');
  const MAIN_ELEMENT = document.createElement('main');
  const WRAPPER_ELEMENT = document.createElement('div');
  const TEXTAREA_ELEMENT = document.createElement('textarea');
  const KEYBOARD_CONTAINER = document.createElement('div');
  const TIP_1 = document.createElement('p');
  const TIP_2 = document.createElement('p');
  const KEYS_ARR = keys.keys;
  const ROW_1 = KEYS_ARR.row1;
  const ROW_2 = KEYS_ARR.row2;
  const ROW_3 = KEYS_ARR.row3;
  const ROW_4 = KEYS_ARR.row4;
  const ROW_5 = KEYS_ARR.row5;
  let isLangEn = 'true';

  if (localStorage.getItem('isLangEn') === null) {
    isLangEn = 'true';
  } else {
    isLangEn = localStorage.getItem('isLangEn');
  }

  BODY_ELEMENT.prepend(TIP_2);
  BODY_ELEMENT.prepend(TIP_1);
  BODY_ELEMENT.prepend(MAIN_ELEMENT);
  BODY_ELEMENT.prepend(HEADER_ELEMENT);

  TIP_1.classList.add('tip');
  TIP_1.innerHTML = 'This is a virtual keyboard for Windows OS';
  TIP_2.classList.add('tip');
  TIP_2.innerHTML = 'Use Crtl + Alt to change a language (EN/RU)';

  HEADER_ELEMENT.classList.add('header');
  HEADER_ELEMENT.appendChild(TITLE_ELEMENT);

  TITLE_ELEMENT.classList.add('title');
  TITLE_ELEMENT.innerHTML = 'Keyboard';

  MAIN_ELEMENT.appendChild(WRAPPER_ELEMENT);

  WRAPPER_ELEMENT.classList.add('wrapper');
  WRAPPER_ELEMENT.appendChild(TEXTAREA_ELEMENT);
  WRAPPER_ELEMENT.appendChild(KEYBOARD_CONTAINER);

  KEYBOARD_CONTAINER.classList.add('keyboard-container');

  TEXTAREA_ELEMENT.classList.add('textarea');
  TEXTAREA_ELEMENT.name = 'textarea';
  TEXTAREA_ELEMENT.id = 'textarea';
  TEXTAREA_ELEMENT.cols = '150';
  TEXTAREA_ELEMENT.rows = '20';

  for (let i = 1; i <= 5; i += 1) {
    const ROW_ELEMENT = KEYBOARD_CONTAINER.appendChild(document.createElement('ul'));
    ROW_ELEMENT.classList.add('keys-row');
    ROW_ELEMENT.id = `keys-row_${i}`;
  }

  // class Key {
  //   constructor(rowEl, enKey, ruKey, code, altEnKey, altRuKey, [...classList] = 'key') {
  //     this.rowEl = rowEl;
  //     this.enKey = enKey;
  //     this.ruKey = ruKey;
  //     this.code = code;
  //     this.altEnKey = altEnKey;
  //     this.altRuKey = altRuKey;
  //     this.classList = [...classList];
  //   }
}

function createKey(rowEl, enKey, ruKey, code, [...classList] = 'key', altEnKey = null, altRuKey = null) {
  const KEY_ELEMENT = document.createElement('li');
  rowEl.appendChild(KEY_ELEMENT);

  KEY_ELEMENT.classList.add(...classList);
  KEY_ELEMENT.appendChild(document.createTextNode(isLangEn === 'true' ? enKey : ruKey));

  KEY_ELEMENT.setAttribute('en-key', enKey);
  KEY_ELEMENT.setAttribute('ru-key', ruKey);
  KEY_ELEMENT.setAttribute('code', code);
  KEY_ELEMENT.setAttribute('alt-en-key', altEnKey);
  KEY_ELEMENT.setAttribute('alt-ru-key', altRuKey);

  // if (altEnKey) {
  //   const ALT_KEY = document.createElement('span');
  //   ALT_KEY.classList.add('alt-key');
  //   ALT_KEY.innerHTML = altEnKey;
  //   KEY_ELEMENT.setAttribute('alt-en-key', altEnKey);
  //   if (KEY_ELEMENT.classList.contains('subkey')) KEY_ELEMENT.appendChild(ALT_KEY);
  // } else {
  //   KEY_ELEMENT.setAttribute('alt-en-key', enKey.toUpperCase());
  // }

  // if (altRuKey) {
  //   KEY_ELEMENT.setAttribute('alt-ru-key', altRuKey);
  // } else {
  //   KEY_ELEMENT.setAttribute('alt-ru-key', ruKey.toUpperCase());
  // }

  return KEY_ELEMENT;
}

const FIRST_KEYS_ROW = document.querySelector('#keys-row_1');
const SECOND_KEYS_ROW = document.querySelector('#keys-row_2');
const THIRD_KEYS_ROW = document.querySelector('#keys-row_3');
const FOURTH_KEYS_ROW = document.querySelector('#keys-row_4');
const FITHS_KEYS_ROW = document.querySelector('#keys-row_5');

for (let i = 0; i < ROW_1.length; i += 1) {
  let test = new Key(
    FIRST_KEYS_ROW,
    ROW_1[i].en,
    ROW_1[i].ru,
    ROW_1[i].code,
    ROW_1[i].altEn,
    ROW_1[i].altRu,
    ROW_1[i].classList,
  );
  console.log(test);
  createKey(
    FIRST_KEYS_ROW,
    ROW_1[i].en,
    ROW_1[i].ru,
    ROW_1[i].code,
    ROW_1[i].classList,
    ROW_1[i].altEn,
    ROW_1[i].altRu,
  );
}

for (let i = 0; i < ROW_2.length; i += 1) {
  createKey(
    SECOND_KEYS_ROW,
    ROW_2[i].en,
    ROW_2[i].ru,
    ROW_2[i].code,
    ROW_2[i].classList,
    ROW_2[i].altEn,
    ROW_2[i].altRu,
  );
}
for (let i = 0; i < ROW_3.length; i += 1) {
  createKey(
    THIRD_KEYS_ROW,
    ROW_3[i].en,
    ROW_3[i].ru,
    ROW_3[i].code,
    ROW_3[i].classList,
    ROW_3[i].altEn,
    ROW_3[i].altRu,
  );
}
for (let i = 0; i < ROW_4.length; i += 1) {
  createKey(
    FOURTH_KEYS_ROW,
    ROW_4[i].en,
    ROW_4[i].ru,
    ROW_4[i].code,
    ROW_4[i].classList,
    ROW_4[i].altEn,
    ROW_4[i].altRu,
  );
}
for (let i = 0; i < ROW_5.length; i += 1) {
  createKey(
    FITHS_KEYS_ROW,
    ROW_5[i].en,
    ROW_5[i].ru,
    ROW_5[i].code,
    ROW_5[i].classList,
    ROW_5[i].altEn,
    ROW_5[i].altRu,
  );
}
}
