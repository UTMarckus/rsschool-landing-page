const toggleSwitch = document.querySelector('#theme-checkbox');
const logoImg = document.querySelector(".logo-img");

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    if (document.getElementById("theme-dark").classList.contains("theme-option__inactive")) toggleSwitcher()
  }
}

function switchTheme(e) {
  toggleSwitcher()

  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    logoImg.src = "./img/svg/logo-dark.svg"
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    logoImg.src = "./img/svg/logo.svg"
  }
}

function toggleSwitcher() {
  const options = document.querySelectorAll(".theme-option")
  options.forEach(el => {
    el.classList.toggle("theme-option__inactive");
    el.classList.toggle("theme-option__active");
  })
}

toggleSwitch.addEventListener('change', switchTheme, false);
