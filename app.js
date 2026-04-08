let chart;

function simulate() {

    const r = parseFloat(document.getElementById("r").value);
    const K = parseFloat(document.getElementById("K").value);
    const s = parseFloat(document.getElementById("s").value);

    let G = 1; // condición inicial
    const dt = 0.1;
    const timeSteps = 100;

    let data = [];
    let labels = [];

    for (let t = 0; t < timeSteps; t++) {

        let dGdt = r * G * (1 - G / K) - s * G;
        G = G + dGdt * dt;

        data.push(G);
        labels.push(t);
    }

    const ctx = document.getElementById('chart').getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Gene Expression G(t)",
                data: data,
                borderColor: "#00d4ff",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#e0e6ed"
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: "#8aa2b2" }
                },
                y: {
                    ticks: { color: "#8aa2b2" }
                }
            }
        }
    });
}
