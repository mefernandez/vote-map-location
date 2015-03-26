gapi.load('auth2', function() {
  auth2 = gapi.auth2.init({
    client_id: '748960406594-l0rgulrbco42rn6j0g7ssr887dop65pr.apps.googleusercontent.com',
    // Scopes to request in addition to 'profile' and 'email'
    //scope: 'additional_scope'
  });
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

function signInCallback(authResult) {
  if (authResult['code']) {

    // Hide the sign-in button now that the user is authorized, for example:
    $('#signinButton').attr('style', 'display: none');

    // Send the code to the server
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/storeauthcode',
      contentType: 'application/octet-stream; charset=utf-8',
      success: function(result) {
        // Handle or verify the server response.
        console.log("User logged in!");
      },
      processData: false,
      data: authResult['code']
    });
  } else {
    // There was an error.
    alert("Error on POST /storeauthcode")
  }
}