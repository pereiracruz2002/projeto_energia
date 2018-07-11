var RelatorioClass = function ()
{
    var _self = this;
    var chartLeads;

    this.getLeads = function ()
    {
        var elm = $('#reportLeads');
        elm.find('.reportContent').hide().after('<p class="text-center loading"><i class="fa fa-3x ico-spinner3 fa-spin"></i></p>');
        $.post(base_url + 'relatorios/leads', $('.page-header input, .page-header select').serialize(), function (result) {
            elm.find('.loading').remove();
            elm.find('.reportContent').fadeIn();
            var result_dataset = [];
            var colors = palette('tol-dv', Object.keys(result.qtd_cadastros).length);
            var result_labels = [];
            var i=0;
            $.each(result.qtd_cadastros, function(key, val){
                result_dataset.push({
                    label: key,
                    data: Object.values(val),
                    borderColor: '#'+colors[i],
                    fill: '#'+colors[i]
                });
                if(i == 0){
                    result_labels = Object.keys(val);
                }
                i++;
            });

            chartLeads = new Chart($('#chartLeads').get(0), {
                type: 'line',
                data: {
                    datasets: result_dataset,
                    labels: result_labels 
                },
                options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    suggestedMin: 0,
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

            var tbody = '';
            $.each(result.franquias, function(key, val){
                tbody += '<tr><td>'+key+'</td><td>'+val+'</td></tr>';
            })
            let table = $('#ranking_franquias').DataTable();
            if ( $.fn.dataTable.isDataTable( '#ranking_franquias' ) ) {
                table.destroy();
            }
            $('#ranking_franquias').show();
            $('#ranking_franquias').find('tbody').empty();
            $('#ranking_franquias').find('tbody').append(tbody);
            $('#ranking_franquias').show();
            $('#ranking_franquias').DataTable({
                order: [[1, 'desc']],
                language: {
                    "decimal":        ",",
                    "emptyTable":     "Nenhum registro encontrado",
                    "info":           "Mostrando _START_ até _END_ de _TOTAL_ registros",
                    "infoEmpty":      "Mostrando 0 até 0 de 0 registros",
                    "infoFiltered":   "(filtrado de _MAX_ total de registros)",
                    "infoPostFix":    "",
                    "thousands":      ".",
                    "lengthMenu":     "Mostrar _MENU_ registros",
                    "loadingRecords": "Carregando...",
                    "processing":     "Processando...",
                    "search":         "Procurar:",
                    "zeroRecords":    "Nenhum resultado encontrado",
                    "paginate": {
                        "first":      "Primeiro",
                        "last":       "Último",
                        "next":       "Próximo",
                        "previous":   "Anterior"
                    },
                    "aria": {
                        "sortAscending":  ": ative para ordenar a coluna crescente",
                        "sortDescending": ": ative para ordenar a coluna decrescente"
                    }
                }
            });

        }, 'json');
    }    
    
    this.init = function ()
    {
        if($('#reportLeads').get(0)){
            if (typeof chartLeads != 'undefined') {
                chartLeads.destroy();
            }

            $('#ranking_franquias').hide();
            _self.getLeads();
        }
    }
    _self.init();
}

