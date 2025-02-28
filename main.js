const dropList = document.querySelectorAll("form select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");



for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "EUR"
          ? "selected"
          : ""
        : currency_code == "RON"
        ? "selected"
        : "";

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img"); 
      imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => { 
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault(); 
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .exchange-arrows");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value; 
  fromCurrency.value = toCurrency.value; 
  toCurrency.value = tempCode; 
  loadFlag(fromCurrency); 
  loadFlag(toCurrency); 
  getExchangeRate(); 
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  exchangeRateTxt.innerText = "Getting exchange rate...";
  if (amountVal === "" || amountVal <= 0) {
    alert("Please enter a valid amount greater than 0.");
    return;
  }

  let url = `https://v6.exchangerate-api.com/v6/441249c85fc66312efc9c473/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });

    
}
