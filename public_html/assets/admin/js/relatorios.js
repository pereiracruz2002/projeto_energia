$('.date-range-picker').daterangepicker({
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
$('.select2').select2({
    placeholder: function(){
        $(this).data('placeholder');
    }
});
$('.atualizar_relatorio').on('click', function(){
    Report.init();
})

var Report = new RelatorioClass();

$('.reportFranquiasStatus').on('change', function(e){
    var elm = $(this);
    $('#gerarRelatorio input[name=status]').val(elm.val());
})
