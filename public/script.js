let lan,
    lon,
    country,
    temp_c,
    temp_f,
    condition,
    icon;

    document.getElementById('temp_c').className = 'pressed_button';

    // Usando geolocalizacion para recibir las coordenadas del
    // cliente.
    // Se valida si la geolocalizacion esta disponible.
    // Conseguir position actual
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude
            long = position.coords.longitude;

            const weather_api = `/weather/${lat},${long}`;
            const response = await fetch(weather_api);
            const weather = await response.json();
            country = weather.location.country;
            temp_c = weather.current.temp_c;
            temp_f = weather.current.temp_f;
            condition = weather.current.condition.text;
            icon = weather.current.condition.icon;
            console.log(weather);

            document.getElementById('condition').innerText = condition;
            document.getElementById('icon').src = icon;
            document.getElementById('coords').innerText = lat + ', ' +long;
            document.getElementById('country').innerText = country;
            document.getElementById('temp').innerText = temp_c +  "°";
        });
    } else {
        console.log('No aviable');
    }

    document.getElementById("temp_c").addEventListener("click", async event =>{
        document.getElementById('temp').innerText = temp_c +  "°";
        document.getElementById('temp_c').className = 'pressed_button';
        document.getElementById('temp_f').className = '';
    });

    document.getElementById("temp_f").addEventListener("click", async event =>{
        document.getElementById('temp').innerText = temp_f +  "°";
        document.getElementById('temp_f').className = 'pressed_button';
        document.getElementById('temp_c').className = '';
    });

    document.getElementById("enviar").addEventListener("click", async event => {
        const time = Date.now();
        const data = {
            lat,
            long,
            time,
            country,
            temp_c,
            temp_f
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = response.json();
        console.log(json);
        alert('Datos ingresados');
    });

