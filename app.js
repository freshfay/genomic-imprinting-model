let chart;

// sliders
const rSlider = document.getElementById("r");
const KSlider = document.getElementById("K");
const sSlider = document.getElementById("s");

// valores visuales
const rVal = document.getElementById("r_val");
const KVal = document.getElementById("K_val");
const sVal = document.getElementById("s_val");
const eqVal = document.getElementById("eq_val");

// actualizar valores
function updateValues() {
    rVal.textContent = rSlider.value;
    KVal.textContent = KSlider.value;
    sVal.textContent = sSlider.value;
}

// modelo (Euler)
function simulateCurve(r, K, s) {
    let G = 1;
    const dt = 0.1;
    const steps = 100;

    let data = [];

    for (let t = 0; t < steps; t++) {
        let dGdt = r * G * (1 - G / K) - s * G;
        G += dGdt * dt;
        data.push(G);
    }

    return data;
}

// actualizar gráfica
function updateChart() {

    const r = parseFloat(rSlider.value);
    const K = parseFloat(KSlider.value);
    const s = parseFloat(sSlider.value);

    // equilibrio
    let eq = K * (1 - s / r);
    eqVal.textContent = `≈ ${eq.toFixed(2)}`;

    const labels = Array.from({ length: 100 }, (_, i) => i);

    const base = simulateCurve(r, K, s);
    const lowStress = simulateCurve(r, K, s * 0.5);
    const highStress = simulateCurve(r, K, s * 1.5);

    if (chart) chart.destroy();

    const ctx = document.getElementById("chart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Condición actual",
                    data: base,
                    borderWidth: 2
                },
                {
                    label: "Menor estrés",
                    data: lowStress,
                    borderDash: [5, 5]
                },
                {
                    label: "Mayor estrés",
                    data: highStress,
                    borderDash: [2, 2]
                }
            ]
        },
        options: {
            animation: {
                duration: 800
            },
            plugins: {
                legend: {
                    labels: { color: "#e0e6ed" }
                }
            },
            scales: {
                x: { ticks: { color: "#8aa2b2" } },
                y: { ticks: { color: "#8aa2b2" } }
            }
        }
    });
}

// eventos en tiempo real
[rSlider, KSlider, sSlider].forEach(slider => {
    slider.addEventListener("input", () => {
        updateValues();
        updateChart();
    });
});

// inicial
updateValues();
updateChart();
