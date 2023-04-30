export default function keysActions() {
  const KEYS = document.querySelectorAll('.key');
  const BACKSPACE_KEY = document.querySelector('.key_backspace');
  const SHIFT_KEY_LEFT = document.querySelector('.key_shift-left');
  const SHIFT_KEY_RIGHT = document.querySelector('.key_shift-right');
  const CAPS_KEY = document.querySelector('.key_caps');
  const DEL_KEY = document.querySelector('.key_del');
  const TEXTAREA_ELEMENT = document.querySelector('.textarea');

  let isLangEn = localStorage.getItem('isLangEn') === 'true';

  function addChar(keyBtn) {
    const START = TEXTAREA_ELEMENT.selectionStart;
    const END = TEXTAREA_ELEMENT.selectionEnd;
    let resStr = '';

    if (keyBtn.classList.contains('key_space')) {
      resStr = `${TEXTAREA_ELEMENT.value.substring(0, START)} ${TEXTAREA_ELEMENT.value.substring(END)}`;
    } else if (keyBtn.classList.contains('key_tab')) {
      resStr = `${TEXTAREA_ELEMENT.value.substring(0, START)}\t${TEXTAREA_ELEMENT.value.substring(END)}`;
    } else if (keyBtn.classList.contains('key_enter')) {
      resStr = `${TEXTAREA_ELEMENT.value.substring(0, START)}\n${TEXTAREA_ELEMENT.value.substring(END)}`;
    } else if (!keyBtn.classList.contains('key_fn') && !keyBtn.classList.contains('key_space')) {
      resStr = `${TEXTAREA_ELEMENT.value.substring(0, START)}${keyBtn.innerText[0]}${TEXTAREA_ELEMENT.value.substring(END)}`;
    }
    TEXTAREA_ELEMENT.value = resStr;
    TEXTAREA_ELEMENT.focus();
    TEXTAREA_ELEMENT.selectionEnd = TEXTAREA_ELEMENT.value.substring(START, END).length === 0
      ? END + 1 : START + 1;
  }

  function backspaceAction() {
    const START = TEXTAREA_ELEMENT.selectionStart;
    const END = TEXTAREA_ELEMENT.selectionEnd;
    let resStr = '';

    if (TEXTAREA_ELEMENT.value.substring(START, END).length === 0 && START && END) {
      resStr = TEXTAREA_ELEMENT.value.substring(0, START - 1)
        + TEXTAREA_ELEMENT.value.substring(END);

      TEXTAREA_ELEMENT.value = resStr;
      TEXTAREA_ELEMENT.focus();
      TEXTAREA_ELEMENT.selectionEnd = START - 1;
    } else {
      resStr = TEXTAREA_ELEMENT.value.substring(0, START)
        + TEXTAREA_ELEMENT.value.substring(END);

      TEXTAREA_ELEMENT.value = resStr;
      TEXTAREA_ELEMENT.focus();
      TEXTAREA_ELEMENT.selectionEnd = START;
    }
  }

  function deleteAction() {
    const START = TEXTAREA_ELEMENT.selectionStart;
    const END = TEXTAREA_ELEMENT.selectionEnd;
    let resStr = '';

    if (TEXTAREA_ELEMENT.value.substring(START, END).length === 0) {
      resStr = TEXTAREA_ELEMENT.value.substring(0, START)
        + TEXTAREA_ELEMENT.value.substring(START + 1);
    } else {
      resStr = TEXTAREA_ELEMENT.value.substring(0, START)
        + TEXTAREA_ELEMENT.value.substring(END);
    }

    TEXTAREA_ELEMENT.value = resStr;
    TEXTAREA_ELEMENT.focus();
    TEXTAREA_ELEMENT.selectionEnd = START;
  }

  function shiftDown() {
    const lang = isLangEn ? 'en-key' : 'ru-key';
    const isCapsActive = CAPS_KEY.classList.contains('active');
    for (let i = 0; i < KEYS.length; i += 1) {
      KEYS[i].innerText = isCapsActive ? KEYS[i].getAttribute(`${lang}`) : KEYS[i].getAttribute(`alt-${lang}`);
    }
  }

  function shiftUp() {
    const lang = isLangEn ? 'en-key' : 'ru-key';
    const isCapsActive = CAPS_KEY.classList.contains('active');
    for (let i = 0; i < KEYS.length; i += 1) {
      KEYS[i].innerText = isCapsActive ? KEYS[i].getAttribute(`alt-${lang}`) : KEYS[i].getAttribute(`${lang}`);
    }
  }

  function capsDown() {
    const lang = isLangEn ? 'en-key' : 'ru-key';
    if (CAPS_KEY.classList.contains('active')) {
      for (let i = 0; i < KEYS.length; i += 1) {
        KEYS[i].innerText = KEYS[i].getAttribute(`alt-${lang}`);
      }
    } else {
      for (let i = 0; i < KEYS.length; i += 1) {
        KEYS[i].innerText = KEYS[i].getAttribute(`${lang}`);
      }
    }
  }

  function changeLanguage() {
    const isCapsActive = CAPS_KEY.classList.contains('active');
    if (isLangEn) {
      for (let i = 0; i < KEYS.length; i += 1) {
        KEYS[i].innerText = isCapsActive ? KEYS[i].getAttribute('alt-en-key') : KEYS[i].getAttribute('en-key');
      }
    } else {
      for (let i = 0; i < KEYS.length; i += 1) {
        KEYS[i].innerText = isCapsActive ? KEYS[i].getAttribute('alt-ru-key') : KEYS[i].getAttribute('ru-key');
      }
    }
  }

  window.addEventListener('keydown', (e) => {
    for (let i = 0; i < KEYS.length; i += 1) {
      if (e.code === KEYS[i].getAttribute('code') && !KEYS[i].classList.contains('key_fn')) {
        e.preventDefault();
        addChar(KEYS[i]);
        KEYS[i].classList.add('active');
      } else if (e.code === KEYS[i].getAttribute('code') && KEYS[i].classList.contains('key_fn') && e.code !== 'CapsLock') {
        KEYS[i].classList.add('active');
      }
    }

    if (e.code === 'CapsLock') {
      e.preventDefault();
      CAPS_KEY.classList.toggle('active');
      capsDown();
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      backspaceAction();
    }

    if (e.key === 'Delete') {
      e.preventDefault();
      deleteAction();
    }

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      e.preventDefault();
      shiftDown();
    }

    if (e.code === 'AltLeft' || e.code === 'AltRight') {
      e.preventDefault();
    }

    if ((e.key.toLowerCase() === 'control' && e.altKey) || (e.key.toLowerCase() === 'alt' && e.ctrlKey)) {
      isLangEn = !isLangEn;
      localStorage.setItem('isLangEn', isLangEn);
      changeLanguage();
    }
  });

  window.addEventListener('keyup', (e) => {
    for (let i = 0; i < KEYS.length; i += 1) {
      if (e.code === KEYS[i].getAttribute('code') && e.code !== 'CapsLock') {
        KEYS[i].classList.add('animation');
        KEYS[i].classList.remove('active');
      }
      setTimeout(() => {
        KEYS[i].classList.remove('animation');
      }, 100);
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      e.preventDefault();
      shiftUp();
    }
  });

  KEYS.forEach((keyBtn) => {
    if (!keyBtn.classList.contains('key_fn')) {
      keyBtn.addEventListener('click', () => {
        addChar(keyBtn);
      });
    }
    if (!keyBtn.classList.contains('key_caps')) {
      keyBtn.addEventListener('mousedown', () => {
        keyBtn.classList.add('active');
      });
      keyBtn.addEventListener('mouseup', () => {
        keyBtn.classList.add('animation');
        keyBtn.classList.remove('active');
        setTimeout(() => {
          keyBtn.classList.remove('animation');
        }, 100);
      });
    }
  });

  BACKSPACE_KEY.addEventListener('click', (e) => {
    e.preventDefault();
    backspaceAction();
  });

  DEL_KEY.addEventListener('click', (e) => {
    e.preventDefault();
    deleteAction();
  });

  CAPS_KEY.addEventListener('click', (e) => {
    e.preventDefault();
    CAPS_KEY.classList.toggle('active');
    capsDown();
  });

  [SHIFT_KEY_LEFT, SHIFT_KEY_RIGHT].forEach((key) => key.addEventListener('mousedown', (e) => {
    e.preventDefault();
    shiftDown();
  }));

  [SHIFT_KEY_LEFT, SHIFT_KEY_RIGHT].forEach((key) => key.addEventListener('mouseup', (e) => {
    e.preventDefault();
    shiftUp();
  }));
}
