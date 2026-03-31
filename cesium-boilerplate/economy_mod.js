// Mock Data for Markets
const markets = {
    venice: {
        name: "Venice",
        goods: {
            "Grain": 12.5,
            "Cloth": 45.0,
            "Spice": 120.0,
            "Wine": 30.0,
            "Salt": 25.0
        },
        tradeVolume: [1200, 1350, 1280, 1420, 1500, 1480, 1600] // Weekly volume
    },
    genoa: {
        name: "Genoa",
        goods: {
            "Grain": 11.0,
            "Cloth": 42.0,
            "Spice": 110.0,
            "Wine": 32.0,
            "Salt": 22.0
        },
        tradeVolume: [1100, 1150, 1200, 1250, 1300, 1350, 1400]
    },
    constantinople: {
        name: "Constantinople",
        goods: {
            "Grain": 15.0,
            "Cloth": 35.0,
            "Spice": 90.0,
            "Wine": 25.0,
            "Salt": 18.0
        },
        tradeVolume: [1800, 1750, 1900, 1850, 2000, 1950, 2100]
    },
    antwerp: {
        name: "Antwerp",
        goods: {
            "Grain": 14.0,
            "Cloth": 50.0,
            "Spice": 130.0,
            "Wine": 40.0,
            "Salt": 20.0
        },
        tradeVolume: [900, 1000, 1100, 1200, 1300, 1400, 1500]
    }
};

let priceChart = null;
let volumeChart = null;

// Initialize the Economy Mod
function initEconomyMod() {
    console.log("Initializing Economy Mod...");

    const toggleBtn = document.getElementById('toggle-economy-btn');
    const closeBtn = document.getElementById('close-economy-btn');
    const economyUI = document.getElementById('economy-ui');
    const marketSelect = document.getElementById('market-select');

    // Populate Market Select
    for (const key in markets) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = markets[key].name;
        marketSelect.appendChild(option);
    }

    // Event Listeners
    toggleBtn.addEventListener('click', () => {
        economyUI.style.display = 'flex';
        updateCharts(marketSelect.value);
    });

    closeBtn.addEventListener('click', () => {
        economyUI.style.display = 'none';
    });

    marketSelect.addEventListener('change', (e) => {
        updateCharts(e.target.value);
    });

    // Initial Chart Setup
    setupCharts();
}

function setupCharts() {
    const ctxPrice = document.getElementById('priceChart').getContext('2d');
    const ctxVolume = document.getElementById('volumeChart').getContext('2d');

    // Price Chart Config
    priceChart = new Chart(ctxPrice, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Price of Goods (Ducats)',
                data: [],
                backgroundColor: [
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(46, 204, 113, 0.7)'
                ],
                borderColor: [
                    'rgba(241, 196, 15, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(46, 204, 113, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ecf0f1'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ecf0f1'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ecf0f1'
                    }
                }
            }
        }
    });

    // Volume Chart Config
    volumeChart = new Chart(ctxVolume, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                label: 'Trade Volume',
                data: [],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ecf0f1'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ecf0f1'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ecf0f1'
                    }
                }
            }
        }
    });
}

function updateCharts(marketKey) {
    const market = markets[marketKey];
    if (!market) return;

    // Update Price Chart
    priceChart.data.labels = Object.keys(market.goods);
    priceChart.data.datasets[0].data = Object.values(market.goods);
    priceChart.update();

    // Update Volume Chart
    volumeChart.data.datasets[0].data = market.tradeVolume;
    volumeChart.data.datasets[0].label = `Trade Volume in ${market.name}`;
    volumeChart.update();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEconomyMod);
} else {
    initEconomyMod();
}
