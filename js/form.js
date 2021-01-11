const URL =
  'https://script.google.com/macros/s/AKfycbx_vjsjzvHO6SSL35xbvxL053YaZsdbgyPvGgnDHFxZp_YlOcI/exec';

export default class Form {
  constructor() {
    this.form = document.querySelector('#form');
    this.name = this.form.querySelector('#name');
    this.phone = this.form.querySelector('#phone');
    this.birth = this.form.querySelector('#birth');

    this.form.addEventListener('submit', this.onSubmit);
    this.name.addEventListener('change', this.restrictInput);
    this.phone.addEventListener('change', this.restrictInput);
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (!(this.name.value && this.phone.value && this.birth.value)) {
      console.log('blank');
      return;
    }

    const data = [name.value, phone.value, birth.value];
    sendData(data);

    this.form.reset();
  };

  sendData(data) {
    const request = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    fetch(URL, request).then(this.completeRequest);
  }

  completeRequest(r) {
    console.log(r.ok);
  }

  restrictInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const pattern =
      e.target.type === 'text' ? /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g : /[^0-9]/g;
    e.target.value = value.replace(pattern, '');
    console.log(value.replace(pattern, ''));
  };
}
