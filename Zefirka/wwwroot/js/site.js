var isShowedCalculator = false;

function drawGraph(sourceType, dataVM) {
    var textSourceType = '';
    var data;

    switch (sourceType) {
        case 'wind':
            textSourceType = 'Ветер';
            data = dataVM.wind;
            break;
        case 'sun':
            textSourceType = 'Солнце';
            data = dataVM.temperature;
            break;
        case 'hybrid':
            textSourceType = 'Гибрид';
            break;
    }

    Highcharts.chart('graph', {
        chart: {
            type: 'spline',
            backgroundColor: '#ebebeb',
        },
        title: {
            text: `Последние данные об источнике (${textSourceType})`
        },
        xAxis: {
            categories: dataVM.date
        },
        yAxis: {
            title: {
                text: 'Значение'
            },
            //labels: {
            //    formatter: function () {
            //        return this.value + '°';
            //    }
            //}
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [
            {
            name: textSourceType,
            marker: {
                symbol: 'diamond'
            },
            data: data
        }]
    });
};
 
$('#sourceType').on('change', function (e) {
    //debugger;
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;

    $.ajax({
        url: "../../Home/GetData",
        type: "GET",
        success: function (res) {
            drawGraph(valueSelected, res);
            console.log("Success");
            console.log(res);
        },
        error: function (res) {
            console.log("Error");
            console.log(res);
        }
    });
})

$('#showHideCalcBlockButton').click(function () {
    //debugger;
    if (!isShowedCalculator) {
        $('#calculator').css('display', 'block');
        isShowedCalculator = true;
        $('#showHideCalcBlockButton').html('Скрыть калькулятор');
    }
    else {
        $('#calculator').css('display', 'none');
        isShowedCalculator = false;
        $('#showHideCalcBlockButton').html('Показать калькулятор');
    }
});

$('#calculateButton').click(function () {
    var totalMoney = $('#totalMoney').html();
    var sourcePrice = $('#sourcePrice').val();

    var result = Math.round(sourcePrice / totalMoney);

    $('#sourceResult').css('display', 'block');
    $('#resultTextBox').val(result);
});