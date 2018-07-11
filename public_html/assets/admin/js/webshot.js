function getAcessos(result, qtd_acessos, qtd_cadastros, data_acessos_keys)
{
    var elm = $('#reportAcesso');

    elm.find('.num_media').text(result.avg_segmento);
    elm.find('.label_acessos').text("/"+result.label_avg_segmento);
    elm.find('.num_conversao').text(result.conversao + '%');
    _graph_cadastros = result.qtd_cadastros;

    chartAcessos = new Chart($('#chartAcessos').get(0), {
        type: 'line',
        data: {
            datasets: [{
                    label: 'Acessos',
                    data: qtd_acessos,
                    borderColor: '#ff6384',
                    fill: false
                }, {
                    label: 'Cadastros',
                    data: qtd_cadastros,
                    borderColor: '#36a2eb',
                    fill: false
                }],
            labels: data_acessos_keys 
        },
        options: {
            scales: {
                yAxes: [{
                        ticks: {
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Define a plugin to provide data labels
    Chart.plugins.register({
        afterDatasetsDraw: function(chart, easing) {
            // To only draw at the end of animation, check for easing === 1
            var ctx = chart.ctx;

            chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach(function(element, index) {
                        // Draw the text in black, with the specified font
                        ctx.fillStyle = 'rgb(153, 153, 153)';

                        var fontSize = 14;
                        var fontStyle = 'normal';
                        var fontFamily = 'Helvetica Neue'; 
                        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                        // Just naively convert to string for now
                        var dataString = dataset.data[index].toString();

                        // Make sure alignment settings are correct
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        var padding = 5;
                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                }
            });
        }
    });


}

function getBanners (result)
{
    var elm = $('#reportBanner');

        if (result.length == 0) {
            $('#reportBanner').remove();
        } else {
            var html = '<table class="table table-striped">' +
                       '    <thead>' + 
                       '        <tr>' + 
                       '            <th>Posição</th>' + 
                       '            <th>Impressoes</th>' + 
                       '            <th>Cliques</th>' + 
                       '        </tr>' + 
                       '    </thead>' + 
                       '    <tbody>'

            $.each(result, function (key, val) {
                html += '<tr>' +
                        '    <td>' + val.posicao + '</td>' +
                        '    <td>' + val.views + '</td>' +
                        '    <td>' + val.clicks + '</td>' +
                        '</tr>'
            })
            html += '</tbody>';
            html += '</table>';
            elm.find('.panel-body').html(html);
        }

}



function getCadastros(result, data_cadastros_qtd, grath_segmento, grath_cadastro, cadastro_keys, qtd_cadastros_estados){
    var elm = $('#reportCadastros, #reportComparacao');

        elm.find('.loading').remove();
        elm.find('.reportContent').fadeIn();
        $.each(result.qtd_cadastros.tipos, function (key, val) {
            elm.find('.' + key).text(val);
        });
        $('#cadastros_total').text(result.qtd_cadastros.total);
        $('#ranking').text(result.ranking + 'ª');

        chartCadastros = new Chart($('#chartCadastros').get(0), {
            type: 'line',
            data: {
                datasets: [{
                        label: 'Média de cadastros do segmento',
                        data: grath_segmento,
                        borderColor: '#ff6384',
                        fill: false
                    }, {
                        label: 'Meus Cadastros',
                        data: grath_cadastro,
                        borderColor: '#36a2eb',
                        fill: false
                    }],
                labels: cadastro_keys
            },
            options: {

                responsive: true,
                maintainAspectRatio: false
            }
        });

        //Object.keys(result.qtd_cadastros.estados)
        var qtd_cad_estados_labels = [];
        for (i in result.qtd_cadastros.estados) {
            qtd_cad_estados_labels.push(i + " (" + result.qtd_cadastros.estados[i] + ")");
        }

        chartCadastrosRegiao = new Chart($('#chartCadastrosRegiao').get(0), {
            type: 'pie',
            data: {
                datasets: [{
                        data: qtd_cadastros_estados,
                        backgroundColor: palette('tol-dv', Object.keys(result.qtd_cadastros.estados).length).map(function (hex) {
                            return '#' + hex;
                        })
                    }],
                labels: qtd_cad_estados_labels
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    position: 'left'
                },
                tooltips: {
                    enabled: false
                }
            }
        });
}

getAcessos(data_acessos, data_acessos_qtd_acessos, data_acessos_qtd_cadastros, data_acessos_keys);
getCadastros(data_cadastros, data_cadastros_qtd, grath_segmento, data_acessos_qtd_cadastros, data_acessos_keys, qtd_cadastros_estados);
getBanners(data_banners);
$('.tools').remove();
