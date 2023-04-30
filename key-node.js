export default class KeyNode extends HTMLElement {
  constructor(isLangEn, enKey, ruKey, code, altEnKey, altRuKey, [...classList] = 'key') {
    super();
    this.classList.add(...classList);
    this.setAttribute('en-key', enKey);
    this.setAttribute('ru-key', ruKey);
    this.setAttribute('code', code);
    this.setAttribute('alt-en-key', altEnKey);
    this.setAttribute('alt-ru-key', altRuKey);

    this.append(document.createTextNode(isLangEn === 'true' ? enKey : ruKey));
  }
}
