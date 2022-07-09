const data1 = {
    labels: ['Yes', 'No'],
    datasets: [{
            label: 'Prefer to stay',
            borderWidth: 3,
            borderRadius: 6,
            borderColor: "#222",
            data: [90.9, 9.1],
            backgroundColor: ["#38807f", "#38807f77"],
        },

    ]
};

const config1 = {
    type: 'pie',
    data: data1,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: "#fff",

                }
            },
        }
    },
};

const data2 = {
    labels: ['Yes', 'No'],
    datasets: [{
            label: 'Prefer to stay',
            borderWidth: 3,
            borderRadius: 6,
            borderColor: "#222",
            data: [80, 20],
            backgroundColor: ["#38807f", "#38807f77"],
        },

    ]
};

const config2 = {
    type: 'pie',
    data: data2,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: "#fff",

                }
            },
        }
    },
};

const DATA_COUNT = 4;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
}
const datapoints = [0, 5, 10, 5];
const linedata = {
    labels: ["Calm", "Nervous", "Embarrassed", "Worried"],
    datasets: [{
        title: 'Rose\'s Anxiety',

        data: datapoints,
        fill: false,
        borderColor: "#38807f",
        borderDash: [20, 20],
        borderRadius: '100%',
        cubicInterpolationMode: 'monotone',
    }, ]
};

const lineconfig = {
    type: 'line',
    data: linedata,
    options: {
        responsive: true,
        aspectRatio: 7,
        plugins: {
            title: {
                color: "#fff",
                display: true,
                text: 'Anxiety',
                position: "left"
            },
            legend: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: false,
                title: {
                    display: true
                },
                color: '#fff',
                suggestedMin: 0,
                suggestedMax: 3
            },
            y: {
                display: true,
                title: {
                    display: false,
                },
                ticks: {
                    callback: function(value, index, ticks) {
                        return ''
                    }
                },
                suggestedMin: 0,
                suggestedMax: 10
            }
        }
    },
};


const pie1 = new Chart(
    document.getElementById('pie1'),
    config1
);

pie1.canvas.parentNode.style.width = '60%';

const pie2 = new Chart(
    document.getElementById('pie2'),
    config2
);

pie2.canvas.parentNode.style.width = '60%';


const line = new Chart(
    document.getElementById('linechart'),
    lineconfig
);

line.canvas.parentNode.style.height = '200px';


// Lightense(elements, {
//     time: 300,
//     padding: 40,
//     offset: 40,
//     keyboard: true,
//     cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
//     background: 'rgba(58, 155, 127, 1)',
//     zIndex: 2147483647
// });


window.addEventListener('load', function() {
    Lightense('img:not(.no-lightense)', { background: "#222222ee" });
}, false);