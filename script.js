document.addEventListener("DOMContentLoaded", () => {

    const flightInput = document.getElementById("flight-input");
    const searchBtn = document.getElementById("search-btn");
    const from = document.getElementById("input-from");
    const to = document.getElementById("input-to");
    const search = document.getElementById("search");
    const resultDiv = document.getElementById("results");

    
    const apiKey = "088f48820a00195cfbf2e78257f89135";


    searchBtn.addEventListener("click", async () => {
    const flightNumber = flightInput.value.trim().toUpperCase();

    if (flightNumber === "") {
        alert("Please enter a flight number");
        return;
    }

    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`;

    try {
        resultDiv.innerHTML = "Searching flight... ✈️";

        const response = await fetch(url);
        const data = await response.json();

        const flights = data.data;

        if (!flights || flights.length === 0) {
            resultDiv.innerHTML = "Flight not found 😢";
            return;
        }

        const flight = flights[0];

        const airline = flight.airline.name;
        const status = flight.flight_status;
        const departure = flight.departure.airport;
        const arrival = flight.arrival.airport;

        resultDiv.innerHTML = `
            <div>
                <h3>${airline}</h3>
                <p>Status: ${status}</p>
                <p>${departure} → ${arrival}</p>
            </div>
        `;

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Error fetching flight ⚠️";
    }
});

    search.addEventListener("click", async () => {

        const fromInput = from.value.trim().toUpperCase();
        const toInput = to.value.trim().toUpperCase();

        if (fromInput === "" || toInput === "") {
            alert("Please enter both From and To");
            return;
        }

        const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${fromInput}&arr_iata=${toInput}`;

        try {
            resultDiv.innerHTML = "Searching... ✈️";

            const response = await fetch(url);
            const data = await response.json();

            const flights = data.data;

            if (!flights || flights.length === 0) {
                resultDiv.innerHTML = "No flights found 😢";
                return;
            }

            resultDiv.innerHTML = "";

            flights.slice(0, 5).forEach(flight => {
                const airline = flight.airline.name;
                const status = flight.flight_status;

                resultDiv.innerHTML += `
                    <div>
                        <h3>${airline}</h3>
                        <p>Status: ${status}</p>
                    </div>
                `;
            });

        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = "Error fetching data ⚠️";
        }
    });
});
