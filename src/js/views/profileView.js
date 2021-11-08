class profileView {
  _parent = document.querySelector('#profileModal .modal-body');
  _modal = document.querySelector('#profileModal');
  _profileIcon = document.querySelector('#profileBtn');

  constructor() {}

  renderProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.clear();
    const html = this._createProfile(user);
    this._parent.insertAdjacentHTML('afterbegin', html);
    this.addhandlers();
  }
  _createProfile(profile) {
    return `
    <div class="profile-img">
    <img src=${profile.photo} alt="">
  </div>

  <div class="profile__info">
    <p><span>Name:</span>  ${profile.name}</p>
    <p><span>Email:</span> ${profile.email}</p>
  </div>
  <div class="profile__edit">
  <button class="btn btn-md btn-primary edit-info">Edit Profile</button>
  <button class="btn btn-md btn-primary change-password">Change Password</button>
</div>


<div class="modal__form__content profile__edit--info hidden">
  <!-- <p>Put you data to sign up </p> -->
  <form class="modal__form">
  <div class="profile-error"></div>
    <div>
      <label for="profileEmail">Email</label>
      <input
        type="email"
        id="profileEmail"
        value = ${profile.email}
        placeholder="Enter Email"
        class="form-input"
        minlength="10"
        maxlength="40"
        autocomplete="off"
        required
      />
      
    </div>

    <div>
      <label for="profileName">Name</label>
      <input
        type="text"
        id="profileName"
        value="${profile.name}"
        placeholder="Enter Name"
        class="form-input"
        minlength="8"
        autocomplete="off"
        required
      />
      
    </div>
    <button class="btn submit-btn btn-md btn-primary" type="submit">Save Changes</button>

  </form>
</div>

<div class="modal__form__content profile__edit--password hidden">
  <!-- <p>Put you data to sign up </p> -->
  <form class="modal__form">
    <div class="profile-error"></div>
    <div>
    <label for="profileCurrentPassword">Current Password</label>
    <input
      type="password"
      id="profileCurrentPassword"
      placeholder="Enter Current Password"
      class="form-input"
      minlength="8"
      autocomplete="off"
      required
    />
    
  </div>
    <div>
      <label for="profilePassword">Password</label>
      <input
        type="password"
        id="profilePassword"
        placeholder="Enter New Password"
        class="form-input"
        minlength="8"
        autocomplete="off"
        required
      />
      
    </div>

    <div>
      <label for="profilePasswordConfirm">Repeat Password</label>
      <input
        type="password"
        id="profilePasswordConfirm"
        placeholder="Enter Password Again"
        class="form-input"
        minlength="8"
        autocomplete="off"
        required
      />
      
    </div>
    <button class="btn submit-btn btn-md btn-primary" type="submit">Save Changes</button>

  </form>

  
</div>

<div class="delete-email">
  <button class="btn btn-danger btn-lg" id="deleteEmail">Delete Email</button>
</div>

      `;
  }

  _showEditInfo() {
    const editContainer = document.querySelector('.profile__edit--info');
    const changePassContainer = document.querySelector(
      '.profile__edit--password'
    );

    // add hidden to change password container
    !changePassContainer.classList.contains('hidden')
      ? changePassContainer.classList.add('hidden')
      : false;

    // show edit info container
    editContainer.classList.contains('hidden')
      ? editContainer.classList.remove('hidden')
      : false;
  }

  _showChangePassword() {
    const editContainer = document.querySelector('.profile__edit--info');
    const changePassContainer = document.querySelector(
      '.profile__edit--password'
    );

    // add hidden to edit info container
    !editContainer.classList.contains('hidden')
      ? editContainer.classList.add('hidden')
      : false;

    // show change password container
    changePassContainer.classList.contains('hidden')
      ? changePassContainer.classList.remove('hidden')
      : false;
  }
  addhandlers() {
    const editInfoBtn = document.querySelector(
      '#profileModal .profile__edit .edit-info'
    );
    const changePasswordBtn = document.querySelector(
      '#profileModal .profile__edit .change-password'
    );
    editInfoBtn.addEventListener('click', this._showEditInfo);
    changePasswordBtn.addEventListener('click', this._showChangePassword);
  }

  addHandler(handler) {
    this._profileIcon.addEventListener('click', handler);
  }

  clear() {
    this._parent.innerHTML = '';
  }

  addHandlerEditProfile(handler) {
    const editInfo = document.querySelector(
      '#profileModal .profile__edit--info form'
    );
    const email = document.getElementById('profileEmail');
    const name = document.getElementById('profileName');
    editInfo.addEventListener('submit', e => {
      e.preventDefault();
      handler({
        email: email.value,
        name: name.value,
      });

      this.renderProfile();
    });
  }

  addHandlerChangePassword(handler) {
    const editPassword = document.querySelector(
      '#profileModal .profile__edit--password form'
    );
    const currentPassword = document.getElementById('profileCurrentPassword');
    const password = document.getElementById('profilePassword');
    const passwordConfirm = document.getElementById('profilePasswordConfirm');
    editPassword.addEventListener('submit', e => {
      e.preventDefault();
      handler({
        passwordCurrent: currentPassword.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      });
    });

    this.renderProfile();
  }

  addHandlerDeleteEmail(handler) {
    const deleteEmailBtn = document.getElementById('deleteEmail');
    deleteEmailBtn.addEventListener('click', () => {
      handler();
    });
  }

  renderEditProfileError(err) {
    const editInfoError = document.querySelector(
      '#profileModal .profile__edit--info form .profile-error'
    );
    editInfoError.textContent = err;
  }
  renderChangePasswordError(err) {
    const changePasswordError = document.querySelector(
      '#profileModal .profile__edit--password form .profile-error'
    );
    changePasswordError.textContent = err;
  }
}

export default new profileView();
