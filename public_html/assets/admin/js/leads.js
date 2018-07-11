$('.btn-modal').click(function(e){
    e.preventDefault();
    $('#configEmail').modal();
});

$('.save_configEmail').on('click', function(e){
    e.preventDefault();
    var btn = $(this);
    btn.html('<span class="fa fa-refresh fa-spin"></span>');
    $.post(base_url+'leads/email_output', {assunto: $('[name=assunto]').val(), msg: $('[name=msg]').val()}, function(data){
        $('.modal-body').prepend(data.msg);
        btn.html('Salvar');
    });
})

$(document).ready(function(){
	$('.btn-exportar').attr({'data-toggle': 'modal', 'data-target': '.modalExportar'});
});
// $('.btn-exportar').on('click',function(e){

// });
