document.querySelector('#openSignUpModal').addEventListener('click', function() {
    // hide log in modal
    var logInModal = bootstrap.Modal.getInstance(document.querySelector('#logIn'));
    logInModal.hide();

    // show sign up modal
    var signUpModal = new bootstrap.Modal(document.querySelector('#signUp'));
    signUpModal.show();
  });