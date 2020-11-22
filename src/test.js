// In order to test the project with use the command: $  NODE_ENV=test npm start

fetch = require("node-fetch");

async function testing() {
  const date = new Date();
  let time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  /******************************* *
   * Users test
   ******************************* */
  // user #1 signUp 
  let user1 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "1"),
    (email = "user1@test.com"),
    (password = "Aa123456")
  );

  // user #2 signUp 
  let user2 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "2"),
    (email = "user2@test.com"),
    (password = "Aa234567")
  );
  // user #3 signUp
  let user3 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "3"),
    (email = "user3@test.com"),
    (password = "Aa345678")
  );
  // user #4 signUp with an existing mail
  let user4 = await registerNewUserTest(
    (firstName = "user"),
    (lastName = "4"),
    (email = "user1@test.com"),
    (password = "Aa456789")
  );
  console.log("Signing up 3 users. If test succceded, the 3 objects will be shown.");
  console.log({ user1 });
  console.log({ user2 });
  console.log({ user3 });

  console.log("Sign up a new user with an existing e-mail. If test succceded an error will be printed.");
  console.log("The error is: " + user4);

  // user #1 log in
  let logIn1 = await loginUserTest(
    (email = "user1@test.com"),
    (password = "Aa123456"),
    (rememberMe = false)
  );
  console.log("Log in with user #1. If test succceded the user's object will be shown: ");
  console.log({ logIn1 });

  // user #2 log in with wrong password
  let logIn2 = await loginUserTest(
    (email = "user2@test.com"),
    (password = "Aa123456"),
    (rememberMe = false)
  );
  console.log(
    "Log in user #2 with wrong password. If test succceded an error will be printed: "
  );
  console.log({ logIn2 });

  // user #3 log in with wrong e-mail
  let logIn3 = await loginUserTest(
    (email = "fakeUser@test.com"),
    (password = "Aa345678"),
    (rememberMe = false)
  );
  console.log("Log in user #3 with wrong e-mail. If test succceded an error will be printed:");
  console.log({ logIn3 });

  // log in with a user that doesn't exist in the system
  let logIn4 = await loginUserTest(
    (email = "fakeUser@test.com"),
    (password = "Aa345678"),
    (rememberMe = false)
  );
  console.log(
    "Log in with a user e-mail and pw that doesn’t exist. If test succceded an error will be printed."
  );
  console.log({ logIn4 });

  // user #2 log in  with rememberMe
  let logIn5 = await loginUserTest(
    (email = "user2@test.com"),
    (password = "Aa234567"),
    (rememberMe = true)
  );
  console.log(
    "Log in the second user remember me. If test succceded, user will be printed: "
  );
  console.log({ logIn5 });

  /*********************************** *
   * Laptops test
   *********************************** */

  // get all laptops
  let laptops = await getLaptopsTest();
  console.log("Get all Laptops - if test succeded, laptops object array is printed:");
  console.log({ laptops });

  /************************************ *
   * Activities test
   ************************************ */

  // write new activity
  let activity1 = await createNewActivityTest({
    name: "visit-item",
    description: "user user1@test.com visited item Dell-Inspiron",

    userEmail: "user1@test.com",
    time: time
  }).then({});
  console.log(
    "Writitng a new visit item activity. If test succeded, new visit activity object is printed."
  );
  console.log({ activity1 });


  // Get all activities
  let allActivities = await getAllActivitiesTest();
  console.log(
    "Get all activities. If test succeded, an array with the activities objects will be printed."
  );
  console.log({ allActivities });

  /*********************************** *
   * Contact us test 
   *********************************** */

  // Create new inquiry
  let contactUs1 = await createNewContactTest(
    (name = "user"),
    (email = "user1@test.com"),
    (phoneNumber = "0900000000"),
    (description = "Is there a shipping option? I LOVE the website"),
    (time = time),
    (active = true)
  );
  console.log(
    "Write a new inquiry in contact us. If test succeded the new object of inquiries will be printed:"
  );
  console.log({ contactUs1 });

  // Mark inquiry as done
  let done = await doneWithContactTest(contactUs1.id);
  console.log(
    "Change inquiry 1 from active to inactive. If test succeded, the inquiry 1’s object will be printed with the active field as false."
  );
  console.log({ done });

  // get all inquiries
  let allInquiries = await getAllContactsTest();
  console.log("Get all inquiries. If test succeded, an array with the inquiries objects will be printed:");
  console.log({ allInquiries });
}

/******************************** *
 * Users functions
 ********************************* */
async function registerNewUserTest(firstName, lastName, email, password) {
  return await fetch("http://localhost:3000/api/users/signUp/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function loginUserTest(email, password, rememberMe) {
  return await fetch("http://localhost:3000/api/users/signIn/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      rememberMe: rememberMe
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function logoutUserTest() {
  return await fetch("http://localhost:3000/api/users/", {
    method: "GET"
  }).then(res => {
    return res.text();
  });
}



/********************************* *
 * Laptops functions 
 ********************************* */

async function getLaptopsTest() {
  return await fetch("http://localhost:3000/api/laptops/", {
    method: "GET"
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}


/****************************** *
 * Activities functions
 ******************************* */

async function getAllActivitiesTest() {
  return await fetch("http://localhost:3000/api/activities/admin", {
    method: "GET"
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function getUserCheckoutTest(userEmail) {
  return await fetch("http://localhost:3000/api/activities/userPage", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      userEmail: userEmail
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function createNewActivityTest({ name, description, cart, cartTotal, userEmail, time }) {
  return await fetch("http://localhost:3000/api/activities/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name,
      description: description,
      cart: cart,
      cartTotal: cartTotal,
      userEmail: userEmail,
      time: time
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

/************************* *
 * Contact functions
 ************************** */

async function getAllContactsTest() {
  return await fetch("http://localhost:3000/api/contact/contactUsAll", {
    method: "GET"
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}


async function createNewContactTest(name, email, phoneNumber, description, time, active) {
  return await fetch("http://localhost:3000/api/contact/contactUs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      description: description,
      time: time,
      active: active
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

async function doneWithContactTest(id) {
  return await fetch("http://localhost:3000/api/contact/adminContactUs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      id: id
    })
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

testing();
