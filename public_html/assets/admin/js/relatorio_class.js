var RelatorioClass = function ()
{
    var _self = this;
    var chartAcessos;

    this.getAcessos = function ()
    {
        var elm = $('#reportAcesso');
        elm.find('.reportContent').hide().after('<p class="text-center loading"><i class="fa fa-3x ico-spinner3 fa-spin"></i></p>');
        $.post(base_url + 'relatorios/visitas', {
            'de': $('[name=de]').val(),
            'ate': $('[name=ate]').val()
        }, function (result) {
            elm.find('.loading').remove();
            elm.find('.reportContent').fadeIn();
            _graph_cadastros = result.qtd_cadastros;

            chartAcessos = new Chart($('#chartAcessos').get(0), {
                type: 'line',
                data: {
                    datasets: [{
                            label: 'Acessos',
                            data: Object.values(result.visitas),
                            borderColor: '#36a2eb',
                            fill: false
                        }],
                    labels: Object.keys(result.visitas)
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

            var tbody = '';
            $.each(result.origem, function(key, val){
                tbody += '<tr><td>'+val[0]+'</td><td>'+val[1]+'</td></tr>';
            })
            let table = $('#origem');
            table.show();
            table.find('tbody').empty();
            table.find('tbody').html(tbody);
            table.DataTable({
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
        if($('#reportAcessos').get(0)){
            if (typeof chartAcessos != 'undefined') {
                chartAcessos.destroy();
            }

            $('#origem').hide();
            _self.getAcessos();
        }
    }
    _self.init();
}
