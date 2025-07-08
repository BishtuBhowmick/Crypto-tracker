const cryptoList = document.getElementById("crypto-list");
const searchInput = document.getElementById("search");

async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );
    const data = await response.json();
    displayCrypto(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCrypto(cryptos) {
  cryptoList.innerHTML = ""; // Clear before showing

  const searchValue = searchInput.value.toLowerCase();

  cryptos
    .filter((coin) => coin.name.toLowerCase().includes(searchValue))
    .forEach((coin) => {
      const item = document.createElement("div");
      item.className = "crypto-item";
      item.innerHTML = `
        <div class="crypto-name">${coin.name} (${coin.symbol.toUpperCase()})</div>
        <div class="crypto-price">
          $${coin.current_price.toLocaleString()} 
          <span style="color:${coin.price_change_percentage_24h >= 0 ? 'lime' : 'red'}">
            (${coin.price_change_percentage_24h.toFixed(2)}%)
          </span>
        </div>
      `;
      cryptoList.appendChild(item);
    });
}

searchInput.addEventListener("input", fetchCryptoData);

window.addEventListener("load", fetchCryptoData);
