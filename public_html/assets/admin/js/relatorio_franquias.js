$('.gerarRelatorio').on('submit', function(e){
    e.preventDefault();
    $( "input[name='status']").val($('.page-header select').val());
    $(this).send();
    // $.post(base_url + 'relatorios/geraRelatorioFranquia', $('.page-header select').serialize(), function (result) {

    // });  





})
var RelatorioClass = function ()
{
    var _self = this;

    this.getData = function ()
    {

        var elm = $('#report');
        elm.find('.reportContent').hide().after('<p class="text-center loading"><i class="fa fa-3x ico-spinner3 fa-spin"></i></p>');
        $.post(base_url + 'relatorios/franquias', $('.page-header select').serialize(), function (result) {
            elm.find('.loading').remove();
            elm.find('.reportContent').fadeIn();

            var tbody = '';
            $.each(result, function(key, val){
                tbody += '<tr><td>'+val.nomeFantasia+'</td><td>'+val.dataCadastro+'</td><td>'+val.status+'</td><td>'+val.listRamos+'</td><td>'+val.nome+'</td><td>'+val.email+'</td><td>'+val.telefone+'</td></tr>';
            })
            var table = $('#ranking_banners');
            if ( $.fn.dataTable.isDataTable( '#ranking_banners' ) ) {
                table.DataTable().destroy();
            }

            table.show();
            table.find('tbody').empty();
            table.find('tbody').html(tbody);
            table.show();
            table.DataTable({
                order: [[2, 'desc']],
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
        $('#ranking_banners').hide();
        _self.getData();
    }
    _self.init();
}

