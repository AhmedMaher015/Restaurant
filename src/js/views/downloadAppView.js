class downloadAppView {
  constructor() {}

  makeHandler() {
    const downloadBtn = document.querySelector('.download-app');
    downloadBtn.addEventListener('click', () => {
      window.open(
        'https://github.com/AhmedHamed-20/resturant_project/releases/download/v4.0/panda_restaurant.apk',
        '_blank'
      );
    });
  }
}

export default new downloadAppView();
