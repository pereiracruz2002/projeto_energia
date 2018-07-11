$('input[name=date-range-picker]').daterangepicker({
    applyClass: 'btn-sm btn-success',
    cancelClass: 'btn-sm btn-default',
    ranges: {
        'Últimos 7 Dias': [moment().subtract(6, 'days'), new Date()],
        'Últimos 30 Dias': [moment().subtract(29, 'days'), new Date()],
        'Últimos 6 Meses': [moment().subtract(6, 'months'), new Date()],
        'Último Ano': [moment().subtract(1, 'year'), new Date()],
    },
    opens: 'left',
    format: 'DD/MM/YYYY',
    "startDate": $('[name=de]').val(),
    "endDate": $('[name=ate]').val(),

    locale: {
        applyLabel: 'Aplicar',
        cancelLabel: 'Cancelar',
        fromLabel: 'Dê',
        toLabel: 'Até',
        weekLabel: 'W',
        customRangeLabel: 'Faixa personalizada',
        daysOfWeek: moment()._locale._weekdaysMin,
        monthNames: moment()._locale._months,
        firstDay: 0
    }
}, function (start, end) {
    $('[name=de]').val(start.format('DD/MM/YYYY'));
    $('[name=ate]').val(end.format('DD/MM/YYYY'));
    Report.init();
});

let RelatorioClass = function ()
{
    var _self = this;
    var _graph_cadastros = [];
    var chartAcessos;
    var chartCadastros;
    var chartCadastrosRegiao;

    this.getAcessos = function ()
    {
        var elm = $('#reportAcesso');
        elm.find('.reportContent').hide().after('<p class="text-center loading"><i class="fa fa-3x ico-spinner3 fa-spin"></i></p>');
        $.post(base_url + 'franquias/reportAcessos', {
            'de': $('[name=de]').val(),
            'ate': $('[name=ate]').val(),
            'IDFranquia': $('[name=IDFranquia]').val()
        }, function (result) {
            elm.find('.loading').remove();
            elm.find('.reportContent').fadeIn();
            elm.find('.num_media').text(result.avg_segmento);
            elm.find('.label_acessos').text("/"+result.label_avg_segmento);
            elm.find('.num_conversao').text(result.conversao + '%');
            _graph_cadastros = result.qtd_cadastros;

            chartAcessos = new Chart($('#chartAcessos').get(0), {
                type: 'line',
                data: {
                    datasets: [{
                            label: 'Acessos',
                            data: Object.values(result.qtd_acessos),
                            borderColor: '#ff6384',
                            fill: false
                        }, {
                            label: 'Cadastros',
                            data: Object.values(result.qtd_cadastros),
                            borderColor: '#36a2eb',
                            fill: false
                        }],
                    labels: Object.keys(result.qtd_cadastros)
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

        }, 'json');
    }

    this.getCadastros = function ()
    {
        var elm = $('#reportCadastros, #reportComparacao');
        elm.find('.reportContent').hide().after('<p class="text-center loading"><i class="fa fa-3x ico-spinner3 fa-spin"></i></p>');
        $.post(base_url + 'franquias/reportCadastros', {
            'de': $('[name=de]').val(),
            'ate': $('[name=ate]').val(),
            'IDFranquia': $('[name=IDFranquia]').val()
        }, function (result) {
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
                            data: Object.values(result.grath_segmento),
                            borderColor: '#ff6384',
                            fill: false
                        }, {
                            label: 'Meus Cadastros',
                            data: Object.values(_graph_cadastros),
                            borderColor: '#36a2eb',
                            fill: false
                        }],
                    labels: Object.keys(_graph_cadastros)
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
                            data: Object.values(result.qtd_cadastros.estados),
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
        }, 'json');

    }

    this.getBanners = function ()
    {
        var elm = $('#reportBanner');
        elm.find('.reportContent').hide().after('<p class="text-center loading"><i class="fa fa-3x ico-spinner3 fa-spin"></i></p>');
        $.post(base_url + 'franquias/reportBanners', {
            'de': $('[name=de]').val(),
            'ate': $('[name=ate]').val(),
            'IDFranquia': $('[name=IDFranquia]').val()
        }, function (result) {
            elm.find('.loading').remove();
            elm.find('.reportContent').fadeIn();
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
        }).fail(function () {
            $('#reportBanner').remove();
        });
    }

    this.init = function ()
    {
        if (typeof chartCadastrosRegiao != 'undefined') {
            chartCadastrosRegiao.destroy();
        }

        if (typeof chartAcessos != 'undefined') {
            chartAcessos.destroy();
        }

        if (typeof chartCadastros != 'undefined') {
            chartCadastros.destroy();
        }
        _self.getAcessos();
        _self.getCadastros();
        _self.getBanners();
    }

    _self.init();
}

var Report = new RelatorioClass();

tinymce.init({
    selector: '.tinymce',
    language: 'pt_BR',
    plugins: 'image code',
    toolbar: 'undo redo  | bold italic underline fontselect formatselect',
    height: 300,
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    branding: false,
    menubar: false,
    file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
                var formData_object = new FormData();

                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                cb(blobInfo.blobUri(), {title: file.name});
            };
            reader.readAsDataURL(file);
        };

        input.click();
    }
});
