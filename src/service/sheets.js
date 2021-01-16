export default class Sheets {
  constructor(formData) {
    this.formData = formData;
    this.url =
      'https://script.google.com/macros/s/AKfycbyPjgczVKLeDbCSg4f72VZVeyXh6Jn7G2xdeIleUlP5SQP75wkC22mC/exec';
  }

  sendData = (data) => {
    const request = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    fetch(this.url, request).then(this.completeRequest);
  };

  submitForm = () => {
    const data = this.formData.getAll('row');
    this.sendData(data);
  };

  collectData = (value) => {
    this.formData.append('row', value);
    if (this.formData.getAll('row').length === 3) {
      this.submitForm();
    }
  };
}
