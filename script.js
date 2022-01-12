// global vars
let occupationList = [];
let stateList = [];
let formValues = {
  name: undefined,
  email: undefined,
  password: undefined,
  occupation: undefined,
  state: undefined,
};

// DOM elements
const occupationSelectEl = document.querySelector('#occupation');
const stateSelectEl = document.querySelector('#state');
const formEl = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');

// updates select lists w/ data
function injectListData() {
  // loop over arrays and create options for list
  occupationList.forEach((occupation) => {
    // create option HTML for each item in the array
    const newOption = `<option value="${occupation}">${occupation}</option>`;

    occupationSelectEl.innerHTML += newOption;
  });

  stateList.forEach((state) => {
    // create option HTML for each item in the array
    const newOption = `<option value="${state.name}">${state.abbreviation}</option>`;

    stateSelectEl.innerHTML += newOption;
  });
}

// send data via json (I have never done a POST request through regular form submission or this way, so not sure if this was done correctly)
function sendData() {
  const rawData = fetch('https://frontend-take-home.fetchrewards.com/form', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      // not sure if I need this
      // 'Content-Type': 'application/json', 
    },
    body: JSON.stringify(formValues),
  })
    // for testing
    // .then((res) => res.json)
    // .then((res) => console.log(res));
}

// fetches list data from endpoint
async function getData() {
  await fetch('https://frontend-take-home.fetchrewards.com/form')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // spread data into global array
      occupationList = [...data.occupations];
      stateList = [...data.states];
    });

  injectListData();
}

// event listeners
formInputs.forEach((input) => {
  input.addEventListener('change', (e) => {
    formValues[e.target.id] = e.target.value;
  });
});

formEl.addEventListener('submit', () => {
   sendData();
   alert(
    'Your account was created successfully, please check your email for a verification email.',
  );
});

// fetch list data on page load
getData();
