// Menu hamburger
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
});

// Loan calculator elements
const loanSelect = document.getElementById('loanAmount');
const loanRange = document.getElementById('loanRange');
const paymentDisplay = document.getElementById('monthlyPayment');

// calculate monthly payment
function updateMonthlyPayment(amount) {
  const rate = 0.05;
  const months = 12;
  const monthlyPayment = (amount * (1 + rate)) / months;
  paymentDisplay.textContent = `Estimated monthly payment: ${monthlyPayment.toFixed(2)} €`;
}

// populate lona amount options
for (let amount = 1000; amount <= 20000; amount += 1000) {
  const option = document.createElement('option');
  option.value = amount;
  option.textContent = amount + ' €';
  loanSelect.appendChild(option);
}

// sync select and range inputs
function syncLoanAmount(value) {
  loanSelect.value = value;
  loanRange.value = value;
  updateMonthlyPayment(parseFloat(value));
}

// input event listeners
loanSelect.addEventListener('change', () => {
  syncLoanAmount(loanSelect.value);
});

loanRange.addEventListener('input', () => {
  syncLoanAmount(loanRange.value);
});

// show error message
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

// clear all errors
function clearErrors() {
  ['loanAmountError', 'nameError', 'emailError', 'phoneError', 'consentError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

// validation function
function validateForm() {
  clearErrors();
  const loanAmount = parseFloat(loanSelect.value);
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const phone = document.getElementById('userPhone').value.trim();
  const consent = document.getElementById('consent').checked;

  let valid = true;

  if (!loanAmount) {
    showError('loanAmountError', 'Please select a loan amount.');
    valid = false;
  }

  if (name === '') {
    showError('nameError', 'Name is required.');
    valid = false;
  }
  else if (name.length < 2) {
    showError('nameError', 'Name must be longer.');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError('emailError', 'Please enter a valid email.');
    valid = false;
  }

  const phonePattern = /^[0-9\-\+]{9,15}$/;
  if (!phonePattern.test(phone)) {
    showError('phoneError', 'Enter a valid phone number');
    valid = false;
  }

  if (!consent) {
    showError('consentError', 'You must agree to the terms.');
    valid = false;
  }

  return valid;
}

// form submission
document.getElementById('loanForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm()) {
    alert('Form is valid!');
  }
});

// Live validation cleanup
document.getElementById('userName').addEventListener('input', () => {
  document.getElementById('nameError').textContent = '';
});

document.getElementById('userEmail').addEventListener('input', () => {
  document.getElementById('emailError').textContent = '';
});

document.getElementById('userPhone').addEventListener('input', () => {
  document.getElementById('phoneError').textContent = '';
});

document.getElementById('consent').addEventListener('change', () => {
  document.getElementById('consentError').textContent = '';
});

// Init
syncLoanAmount(loanRange.value);

document.getElementById('applyNow').addEventListener('click', function () {
  document.getElementById('loanFormSection').scrollIntoView({
    behavior: 'smooth'
  });
});

// countdown timer
function getCountdownTarget() {
  const params = new URLSearchParams(window.location.search);
  const counter = params.get("counter");

  let targetDate;
  let label = "Countdown to Midsummer Eve";

  if (counter === "newyear") {
    targetDate = new Date("December 31, 2025 23:59:59");
    label = "Countdown to New Year's Eve";
  } else {
    targetDate = new Date("June 20, 2025 00:00:00");
  }

  document.getElementById("countdown-title").textContent = label;
  return targetDate;
}

function updateCountdown() {
  const target = getCountdownTarget();
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "<h3>🎉 It's here!</h3>";
    return;
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();