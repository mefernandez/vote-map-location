function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  var simpleProfile = {
    id: profile.getId(),
    name: profile.getName(),
    email: profile.getEmail()
  };

  $.ajax({
    type: 'POST',
    url: '/storeprofile',
    success: function(result) {
      // Handle or verify the server response.
      console.log(result);
    },
    data: simpleProfile,
    dataType: 'json'
  });

}



function signInCallback(authResult) {
  if (authResult['code']) {

    // Hide the sign-in button now that the user is authorized, for example:
    $('#signinButton').attr('style', 'display: none');

    // Send the code to the server
    $.ajax({
      type: 'POST',
      url: '/storeauthcode',
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