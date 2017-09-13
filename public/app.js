'use strict';
(function(module){
  const profile = {};
  profile.all = [];

  $('#submit').on('click', (event) => {
    event.preventDefault();
    profile.first = $('#first').val();
    profile.last = $('#last').val();
    profile.age = $('#age').val();
  })

  profile.submit = function(callback) {
    $.post('/profile', {first: this.first, last: this.last, age: this.age})
      .then(function(data) {
        console.log(data);
        callback();
      })
  };
  profile.requestprofile = callback => {
    $.get('/profile')
      .then(response => profile.all = response, err => console.profile(err))
      .then(callback);
  };
  module.log = profile;
})(window);
