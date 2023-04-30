import keys from './keys.js';
import KeyNode from './key-node.js';

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
  TITLE_ELEMENT.innerHTML = 'virtual keyboard';

  MAIN_ELEMENT.appendChild(WRAPPER_ELEMENT);

  WRAPPER_ELEMENT.classList.add('wrapper');
  WRAPPER_ELEMENT.appendChild(TEXTAREA_ELEMENT);
  WRAPPER_ELEMENT.appendChild(KEYBOARD_CONTAINER);

  KEYBOARD_CONTAINER.classList.add('keyboard-container');

  TEXTAREA_ELEMENT.classList.add('textarea');
  TEXTAREA_ELEMENT.name = 'textarea';
  TEXTAREA_ELEMENT.id = 'textarea';
  TEXTAREA_ELEMENT.cols = 'auto';
  TEXTAREA_ELEMENT.rows = '20';

  class KeyboardRow extends HTMLElement {
    constructor(id) {
      super();
      this.classList.add('keys-row');
      this.id = `keys-row_${id}`;
    }

    addKey(key) {
      this.append(key);
      return this;
    }
  }

  customElements.define('key-node', KeyNode);
  customElements.define('keyboard-row', KeyboardRow);

  for (let i = 1; i <= 5; i += 1) {
    const ROW_ELEMENT = new KeyboardRow(i);
    KEYBOARD_CONTAINER.appendChild(ROW_ELEMENT);
  }

  const [
    FIRST_KEYS_ROW,
    SECOND_KEYS_ROW,
    THIRD_KEYS_ROW,
    FOURTH_KEYS_ROW,
    FITHS_KEYS_ROW,
  ] = KEYBOARD_CONTAINER.childNodes;

  for (let i = 0; i < ROW_1.length; i += 1) {
    FIRST_KEYS_ROW.addKey(new KeyNode(
      isLangEn,
      ROW_1[i].en,
      ROW_1[i].ru,
      ROW_1[i].code,
      ROW_1[i].altEn,
      ROW_1[i].altRu,
      ROW_1[i].classList,
    ));
  }

  for (let i = 0; i < ROW_2.length; i += 1) {
    SECOND_KEYS_ROW.addKey(new KeyNode(
      isLangEn,
      ROW_2[i].en,
      ROW_2[i].ru,
      ROW_2[i].code,
      ROW_2[i].altEn,
      ROW_2[i].altRu,
      ROW_2[i].classList,
    ));
  }
  for (let i = 0; i < ROW_3.length; i += 1) {
    THIRD_KEYS_ROW.addKey(new KeyNode(
      isLangEn,
      ROW_3[i].en,
      ROW_3[i].ru,
      ROW_3[i].code,
      ROW_3[i].altEn,
      ROW_3[i].altRu,
      ROW_3[i].classList,
    ));
  }
  for (let i = 0; i < ROW_4.length; i += 1) {
    FOURTH_KEYS_ROW.addKey(new KeyNode(
      isLangEn,
      ROW_4[i].en,
      ROW_4[i].ru,
      ROW_4[i].code,
      ROW_4[i].altEn,
      ROW_4[i].altRu,
      ROW_4[i].classList,
    ));
  }
  for (let i = 0; i < ROW_5.length; i += 1) {
    FITHS_KEYS_ROW.addKey(new KeyNode(
      isLangEn,
      ROW_5[i].en,
      ROW_5[i].ru,
      ROW_5[i].code,
      ROW_5[i].altEn,
      ROW_5[i].altRu,
      ROW_5[i].classList,
    ));
  }
}
