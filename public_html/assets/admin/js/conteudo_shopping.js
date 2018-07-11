$(document).ready(function() {
    $("#selecao_franquia").select2();
    tinymce.init({
        selector: '.tinymce',
        language: 'pt_BR',
        plugins: [
            "advlist autolink autosave link image lists charmap preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount code fullscreen media nonbreaking",
            "table contextmenu directionality textcolor paste textcolor colorpicker textpattern"
        ],
        toolbar1: " bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontsizeselect | table | cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image | preview | forecolor backcolor | subscript superscript charmap spellchecker pagebreak hr removeformat code",
        height: 300,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        branding: false,
        menubar: false,
        relative_urls: false,
        remove_script_host: false,
        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function () {
                var file = this.files[0];
                var formData = new FormData();
                formData.append('file', file);
                $.ajax({
                    url : base_url+'conteudo/uploadImgContent',
                    type : 'POST',
                    data : formData,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,  // tell jQuery not to set contentType
                    dataType: 'json',
                    success : function(result) {
                        if(result.status == 1){
                            cb(result.url, {title: file.name});
                        } else {
                            alert(result.msg);
                        }
                    }
                });
            };

            input.click();
        }
    });

    function update_permalink(){
        var link = $('#gem_permalink').text().trim()+$('[name=url]').val().trim(); 
        $('#link_completo').text(link);
    }

    $('.update_link').on('change', function(){
        var elm = $(this);
        if(elm.attr('name') == 'IDCat'){
            var options = '';
            $.getJSON(base_url+'conteudo/getSubCategorias/'+elm.val(), function(result){
                $.each(result, function(key, val){
                    options += '<option value="'+val.IDSub+'" data-url="'+val.nomeUrl+'">'+val.nome+'</option>' 
                })
                $('[name=IDSub]').html(options);
                $('[name=IDSub]').trigger('change');
            })
        }
        $('#'+elm.attr('name')+'_url').text(elm.find('option:selected').attr('data-url'));
        update_permalink();
    });

    $('#conteudo [name=titulo]').on('blur', function(e){
        var elm = $(this);
        var elm_url = $('[name=url]');
        //if(elm_url.val() == ''){
            $.post(base_url+'conteudo/getPermalink', {'title': elm.val()}, function(result){
                elm_url.val(result.url);
                update_permalink();
            });
        //}
    })
    $('#conteudo [name=data]').on('change', function(){
        var data = $(this).val().split('-');
        $('#ano_url').text(data[0]);
        $('#mes_url').text(data[1]);
        update_permalink();
    })
        

	$('select[name=IDSeg]').on('change', function () {
	    var elm = $(this)
	    $( "#ramos_inner").empty();
	    $( "#ramos_inner").html('<i class="fa ico-spinner3 fa-spin"></i>')
	    $.get(base_url + 'conteudo/returnAllRamosToChoiseInForm/' + elm.val(), function (data) {
	    	$( "#ramos_inner").empty();
	    	$( "#ramos_inner" ).append( data );
	    })
	})

	// $('select[name=IDFranquia]').on('change', function () {
 //        var elm = $(this)
 //        var select = $('select[name=IDSeg]')
 //        select.attr('disabled', 'disabled').html('<option value="">Carregando...</option>')
 //        $.get(base_url + 'conteudo/returnAllSegmentToChoiseInForm/' + elm.val(), function (data) {
 //        	select.removeAttr('disabled').html(data)
 //        })
 //    });

    $('#add_keywords').on('click', function(e){
		e.preventDefault();
		var palavra = $('input[name=input_keywords]').val()
		var palavrasAtuais = $('input[name=keywords]').val();
        if(palavrasAtuais !='')
		  palavrasAtuais+=','+palavra;
        else
            palavrasAtuais=palavra; 

		$('input[name=keywords]').val(palavrasAtuais);

		$(".tagchecklist").append('<button class="btn btn-danger" type="button">'+palavra+'<span class="badge"><a class="remove_keyword" href="#"> <i class="fa fa-times-circle"></i></a></span></button>')
		$('input[name=input_keywords]').val('');
	});

    $('[name=imagemPrincipal]').on('change', function(){
        var elm = $(this);
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            $('.img-principal').remove();
            elm.after('<img src="'+reader.result+'" class="img-responsive img-principal center-block" />')
        };
        if(typeof file != 'undefined'){
            reader.readAsDataURL(file);
        }

    })

    $('[name=facebookImagem]').on('change', function(){
        var elm = $(this);
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            $('.img-facebook').remove();
            elm.after('<img src="'+reader.result+'" class="img-responsive img-facebook center-block" />')
        };
        if(typeof file != 'undefined'){
            reader.readAsDataURL(file);
        }
    });
});

$('body').on('click', '.remove_keyword', function(e){
	e.preventDefault();
	$(this).parent().parent().remove();
	 palavrasAtualizadas = '';
	$(".tagchecklist button" ).each(function( index ) {
	    palavrasAtualizadas+= ','+$( this ).text();
	});
	$('input[name=keywords]').val(palavrasAtualizadas.substring(1));
});
