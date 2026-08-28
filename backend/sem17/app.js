if (typeof axios === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cloudflare.com';
    document.head.appendChild(script);
}

// Substitua pelo seu token gerado no OpenWeatherMap
const apiKey = '3b2e39be0f1e1124135924e58c1f1806'; 

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Cidade não encontrada ou erro na requisição');
    }
    // O fetch exige a conversão manual para JSON
    return await response.json(); 
}

async function axiosWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await axios.get(url);
    // O Axios já entrega o resultado parseado dentro da propriedade 'data'
    return response.data; 
}

function displayWeather(data) {
    const resultadoDiv = document.getElementById('resultado');
    const erroDiv = document.getElementById('erro');
    
    erroDiv.style.display = 'none';
    resultadoDiv.style.display = 'block';
    
    resultadoDiv.innerHTML = `
        <h3>Clima em ${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
        <p><strong>Sensação Térmica:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Umidade:</strong> ${data.main.humidity}%</p>
        <p><strong>Pressão:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Vento:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Descrição:</strong> ${data.weather[0].description}</p>
    `;
}

function displayError(message) {
    const resultadoDiv = document.getElementById('resultado');
    const erroDiv = document.getElementById('erro');
    
    resultadoDiv.style.display = 'none';
    erroDiv.style.display = 'block';
    erroDiv.innerText = message;
}

async function getWeather() {
    const city = document.getElementById('cidade').value.trim();
    const metodo = document.getElementById('metodo').value;
    
    if (!city) {
        displayError('Por favor, digite o nome de uma cidade.');
        return;
    }

    try {
        let data;
        if (metodo === 'fetch') {
            data = await fetchWeather(city);
        } else {
            data = await axiosWeather(city);
        }
        displayWeather(data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            displayError('Cidade não encontrada. Verifique a ortografia.');
        } else {
            displayError(error.message || 'Erro ao conectar à API.');
        }
    }
}
