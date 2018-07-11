$(document).ready(function () {
    //$('.usuario_admin').hide();
    //$('.usuario_cliente').hide();
    //$('.usuario_franqueador').hide();
    //$('.usuario_colunista').hide();

    $('form').on('click', '.radioBtn a', function () {
        var sel = $(this).data('title');
        var tog = $(this).data('toggle');
        $(this).parent().next('.' + tog).prop('value', sel);
        $(this).parent().find('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
        $(this).parent().find('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    });

    $('select[name=nivel]').on('change', function () {
        var elm = $(this)
        $('.usuario_admin').hide();
	    $('.usuario_cliente').hide();
	    $('.usuario_franqueador').hide();
	    $('.usuario_colunista').hide();
        if (elm.val() == 1) {
            $('.usuario_admin').show();
        } else if (elm.val() == 2) {
            $('.usuario_cliente').show();
        } else if (elm.val() == 3) {
            $('.usuario_franqueador').show();
        } else if (elm.val() == 4) {
            $('.usuario_colunista').show();
        }

        //var select = $('select[name=ramos]')
        //select.attr('disabled', 'disabled').html('<option value="">Carregando...</option>')

    });

    $('.getCidades').on('change', function(){
	    var elm = $(this)
	    var options = '';
	    $.getJSON(base_url+'franquias/getCidades/'+elm.val(), function(data){
	        $.each(data, function(key, val){
	            options += '<option value="'+val.IDCid+'">'+val.nome+'</option>';
	        })
	        $('[name=cidade]').html(options);
	    }); 
	})

    // $("input[name=cep]").on('keyup', function () {
    //     var field = $(this);
    //     var type = field.val();

    //     if (type.length < 9) {
    //         $("input[name=Endereco]").val("");
    //         $("input[name=Bairro]").val("");
    //         $("input[name=Cidade]").val("");
    //         $("input[name=Estado]").val("");

    //         return;
    //     }

    //     $.post(base_url + "usuarios/getCep", {cep: type}, function (data) {
    //         if (data !== null) {
    //             $("input[name=Endereco]").val(data['logradouro']);
    //             $("input[name=Bairro]").val(data['bairro']);
    //             $("input[name=Cidade]").val(data['localidade']);
    //             $("input[name=Estado]").val(data['uf']);
    //         }
    //     });
    // });
});