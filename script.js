document.addEventListener("DOMContentLoaded", () => {
    const citySelect = document.getElementById("city");
    const localitySelect = document.getElementById("locality");
    const calculateButton = document.getElementById("calculate");
    const resultsDiv = document.getElementById("results");
    const solutionsDiv = document.createElement("div");
    solutionsDiv.id = "solutions";
    solutionsDiv.classList.add("hidden", "big-container");
    resultsDiv.parentNode.insertBefore(solutionsDiv, resultsDiv.nextSibling);

    const aqiData = {
        "DELHI": [
            { locality: "Connaught Place", aqi: 250, medicalCost: 2000, propertyValue: 15000 },
            { locality: "Karol Bagh", aqi: 180, medicalCost: 1800, propertyValue: 14000 },
            { locality: "Dwarka", aqi: 200, medicalCost: 1900, propertyValue: 13500 },
            { locality: "Rohini", aqi: 220, medicalCost: 1950, propertyValue: 13000 },
            { locality: "Lajpat Nagar", aqi: 210, medicalCost: 1850, propertyValue: 12500 },
            { locality: "Laxmi Nagar", aqi: 170, medicalCost: 2079, propertyValue: 15000 }
        ],
        "MUMBAI": [
            { locality: "Bandra", aqi: 100, medicalCost: 1500, propertyValue: 20000 },
            { locality: "Dadar", aqi: 80, medicalCost: 1200, propertyValue: 18000 },
            { locality: "Andheri", aqi: 90, medicalCost: 1400, propertyValue: 17000 },
            { locality: "Goregaon", aqi: 85, medicalCost: 1300, propertyValue: 16000 },
            { locality: "Colaba", aqi: 75, medicalCost: 1100, propertyValue: 15000 },
            { locality: "Thane", aqi: 100, medicalCost: 5850, propertyValue: 30000 },
            { locality: "Navi Mumbai", aqi: 120, medicalCost: 5850, propertyValue: 30000 }
        ],
        "BANGALORE": [
            { locality: "Indiranagar", aqi: 90, medicalCost: 1600, propertyValue: 22000 },
            { locality: "Koramangala", aqi: 110, medicalCost: 1700, propertyValue: 21000 },
            { locality: "Whitefield", aqi: 95, medicalCost: 1650, propertyValue: 20000 },
            { locality: "Electronic City", aqi: 105, medicalCost: 1750, propertyValue: 19500 },
            { locality: "Jayanagar", aqi: 100, medicalCost: 1600, propertyValue: 19000 },
            { locality: "Yelahanka", aqi: 80, medicalCost: 1780, propertyValue: 15000 },
            { locality: "JP Nagar", aqi: 90, medicalCost: 1441, propertyValue: 18000 },
            { locality: "HSR Layout", aqi: 100, medicalCost: 1573, propertyValue: 22000 },
            { locality: "Hebbal", aqi: 92, medicalCost: 1200, propertyValue: 10000 },
            { locality: "Malleshwaram", aqi: 95, medicalCost: 1100, propertyValue: 13000 }
        ],
        "HYDERABAD": [
            { locality: "Banjara Hills", aqi: 130, medicalCost: 1800, propertyValue: 19000 },
            { locality: "Madhapur", aqi: 140, medicalCost: 1900, propertyValue: 18500 },
            { locality: "Gachibowli", aqi: 120, medicalCost: 1750, propertyValue: 18000 },
            { locality: "Begumpet", aqi: 135, medicalCost: 1850, propertyValue: 17500 },
            { locality: "Kukatpally", aqi: 125, medicalCost: 1700, propertyValue: 17000 },
            { locality: "Secunderabad", aqi: 76, medicalCost: 3713, propertyValue: 7500 },
            { locality: "Jubilee Hills", aqi: 64, medicalCost: 4950, propertyValue: 12200 }
        ],
        "CHENNAI": [
            { locality: "T Nagar", aqi: 120, medicalCost: 1750, propertyValue: 19500 },
            { locality: "Adyar", aqi: 100, medicalCost: 1650, propertyValue: 20000 },
            { locality: "Velachery", aqi: 110, medicalCost: 1700, propertyValue: 19000 },
            { locality: "Anna Nagar", aqi: 115, medicalCost: 1800, propertyValue: 18500 },
            { locality: "Nungambakkam", aqi: 105, medicalCost: 1650, propertyValue: 18000 },
            { locality: "Tambaram", aqi: 67, medicalCost: 3337, propertyValue: 5040 }
        ],
        "KOLKATA": [
            { locality: "Park Street", aqi: 90, medicalCost: 1600, propertyValue: 18000 },
            { locality: "Salt Lake", aqi: 110, medicalCost: 1700, propertyValue: 17500 },
            { locality: "Gariahat", aqi: 95, medicalCost: 1650, propertyValue: 17000 },
            { locality: "Behala", aqi: 100, medicalCost: 1600, propertyValue: 16500 },
            { locality: "Dum Dum", aqi: 105, medicalCost: 1700, propertyValue: 16000 },
            { locality: "Howrah", aqi: 130, medicalCost: 2716, propertyValue: 5000 },
            { locality: "Alipore", aqi: 110, medicalCost: 3430, propertyValue: 18000 }
        ]
    };

    const solutions = {
        "DELHI": [
            "Green spaces, a type of nature-based solution, help reduce the urban heat island effect by increasing vegetation cover. This mitigates heat absorption in cities dominated by buildings and pavement, lowering cooling costs, improving air quality, and reducing heat-related health risks."
            
        ],
        "MUMBAI": [
            "Photocatalytic Paint Use photocatalytic paint on buildings and public structures that can absorb pollutants like NOx and SOx. When exposed to sunlight, this paint converts harmful pollutants into harmless substances. Smog Towers with Algae Install algae-based smog towers that use microalgae to capture CO₂ and release oxygen. Algae can also be processed into biofuel, making the system self-sustaining. Urban Vertical Forests Build vertical gardens on skyscrapers and noise barriers along highways. These green facades can act as pollution filters while enhancing aesthetics. Air-Purifying Bus Stops Construct bus stops with air-purification units that filter pollutants while commuters wait. These can be solar-powered and integrated with digital pollution monitors."
        ],
        "BANGALORE": [
            "Bangalore is implementing various air quality improvement initiatives, starting with the installation of *HEPA + Carbon filter air purifiers* in enclosed spaces such as homes, offices, schools, and hospitals to reduce pollutants like PM2.5 and VOCs. To monitor air quality in real-time, *AirVisual Pro* and *IoT-enabled AQI sensors* are being deployed across the city, providing continuous data on both indoor and outdoor pollution levels. This data can be integrated with mobile apps and public displays to raise awareness and inform policy decisions. Additionally, the city is expanding *green infrastructure* by increasing tree cover, developing urban forests, and introducing vertical gardens to act as natural air filters. To control emissions, stricter regulations on vehicles and industries are being enforced, alongside efforts to promote electric vehicles and improve public transportation. Public engagement is also a key focus, with awareness campaigns encouraging residents to adopt eco-friendly practices, such as using indoor plants for air purification. These combined efforts aim to create a cleaner and healthier urban environment."
        ],
        "HYDERABAD": [
            "Charminar Mist Fans with Pollen Absorbers Install mist fans near iconic landmarks like Charminar.Equip them with pollen and particulate matter absorbers to reduce localized pollution. Biochar Road Surfaces Implement biochar-infused asphalt for roads, which absorbs pollutants from the atmosphere. Biochar also reduces heat absorption, lowering urban temperatures."
        ],
        "CHENNAI": [
            "Coastal Wind Turbine Air Cleaners Install vertical wind turbine air cleaners along Marina Beach that capture pollutants using rotating electrostatic filters. Mangrove Wall Filters Develop mangrove-inspired air filters for industrial zones. These vertical gardens mimic the filtration properties of mangroves, absorbing CO₂ and releasing oxygen."
        ],
        "KOLKATA": [
            "Kolkata is creating a wind path forest by planting dense trees along roads and rivers to channel clean air into the polluted city center. Wind helps reduce air pollution by dispersing pollutants, mixing them with clean air, and slowing ozone formation. Poor airflow in cities can lead to pollutant buildup."
        ],
        

    };

    function populateLocalities(city) {
        localitySelect.innerHTML = '<option value="">Choose a Locality</option>';
        localitySelect.disabled = true;
        if (city && aqiData[city]) {
            aqiData[city].forEach((loc, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = loc.locality;
                localitySelect.appendChild(option);
            });
            localitySelect.disabled = false;
        }
        calculateButton.disabled = true;
    }

    function calculateResults() {
        const city = citySelect.value;
        const localityIndex = localitySelect.value;
        if (city && localityIndex !== "") {
            const data = aqiData[city][localityIndex];
            const healthRisk = Math.min(Math.ceil(data.aqi / 50), 5);
            const premiumFactor = (healthRisk - 1) * 0.1;
            const healthCostPremium = data.medicalCost * premiumFactor;
            const adjustedPropertyValue = data.propertyValue * (1 - (healthCostPremium / 1000 * 0.01));

            resultsDiv.innerHTML = `
                <h3>Results for ${data.locality}</h3>
                <p>AQI: ${data.aqi}</p>
                <p>Health Risk Score: ${healthRisk}</p>
                <p>Normal Medical Cost: ₹${data.medicalCost.toLocaleString()}</p>
                <p>Health Cost Premium: ₹${healthCostPremium.toFixed(2)}</p>
                <p>Adjusted Property Value (per sqft): ₹${adjustedPropertyValue.toFixed(2)}</p>
                <p>Normal Property Value (per sqft): ₹${data.propertyValue.toLocaleString()}</p>
                <p>Difference in Property Value Due to AQI: ₹${(data.propertyValue - adjustedPropertyValue).toFixed(2)}</p>
                <button id="solutionTab">View Solutions</button>
            `;
            resultsDiv.classList.remove("hidden");

            document.getElementById("solutionTab").addEventListener("click", () => {
                showSolutions(city);
            });
        }
    }

    function showSolutions(city) {
        solutionsDiv.innerHTML = `<h3>Solutions for ${city}</h3><ul>` +
            solutions[city].map(point => `<li>${point}</li>`).join("") + "</ul>" +
            `<button id="backToResults">Back to Results</button>`;
        solutionsDiv.classList.remove("hidden");
        resultsDiv.classList.add("hidden");

        document.getElementById("backToResults").addEventListener("click", () => {
            resultsDiv.classList.remove("hidden");
            solutionsDiv.classList.add("hidden");
        });
    }

    citySelect.addEventListener("change", () => {
        populateLocalities(citySelect.value);
        resultsDiv.classList.add("hidden");
        solutionsDiv.classList.add("hidden");
    });

    localitySelect.addEventListener("change", () => {
        calculateButton.disabled = localitySelect.value === "";
    });

    calculateButton.addEventListener("click", calculateResults);
});
