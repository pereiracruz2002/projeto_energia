tinymce.init({
    selector: '.tinymce_simple',
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
	paste_as_text: true,
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

$('select[name=IDSeg]').on('change', function () {
    var elm = $(this)

    $('#IDSeg_url').text(elm.find('option:selected').attr('data-url'));
    $( "#ramos_inner").empty();
    $( "#ramos_inner").html('<i class="fa ico-spinner3 fa-spin"></i>');

    $.getJSON(base_url + 'franquias/getRamosJson/' + elm.val(), function (data) {
        var html = '<table class="table table-striped table-bordered td_checks">' +
                       '<thead>' + 
                         '<tr>' + 
                             '<th></th>' + 
                             '<th>Ramo</th>' +
                             '<th>Principal</th>' +
                         '</tr>' +
                        '</thead>' +
                        '<tbody>'
        $.each(data, function(key, val){
            html += '<tr>' +
                        '<td><input type="checkbox" name="ramo[]" value="'+val.IDRamo+'" /></td>' +
                        '<td>'+val.descricao+'</td>' +
                        '<td><input type="radio" name="IDRamo" value="'+val.IDRamo+'" data-url="'+val.nomeUrl+'" disabled="true"  /></td>' +
                    '</tr>';
        })
        html += '</tbody>' + 
            '</table>';
        $('#ramos_inner').html(html);
    });
});
$('body').on('click', '.td_checks td', function(e){
    var td_input = $(this).find('input');
    if(!td_input.get(0)){
        td_input = $(this).parent().find('input:first')
    }
    if(!td_input.is(':disabled')){
        td_input.prop('checked', !td_input.is(':checked'));
    }

    if(td_input.prop('name') == 'IDRamo'){
        $('#IDRamo_url').text(td_input.attr('data-url'));
    }

    if($(this).parent().find('input:first').is(':checked')){
        $(this).parent().find('input:last').get(0).disabled = false;
    } else {
        $(this).parent().find('input:last').get(0).checked = false;
        $(this).parent().find('input:last').get(0).disabled = true;
    }
});

$('.getCidades').on('change', function(){
    var elm = $(this)
    var options = '';
    $.getJSON(base_url+'franquias/getCidades/'+elm.val(), function(data){
        $.each(data, function(key, val){
            options += '<option value="'+val.IDCid+'">'+val.nome+'</option>';
        })
        $('[name=IDCid]').html(options);
    }); 
})
$('[name=logo]').on('change', function(){

    var elm = $('.label-logo');
    var file = this.files[0];
     console.log(file)
    var reader = new FileReader();
    reader.onload = function () {
        $('.img-logo').remove();
        elm.html('<img src="'+reader.result+'" class="img-responsive img-logo center-block" />')
    };
    if(typeof file != 'undefined'){

        reader.readAsDataURL(file);
    }
});

$('[name=imagemFundo]').on('change', function(){
    var elm = $('.label-imagemFundo');
    var file = this.files[0];

    var reader = new FileReader();
    reader.onload = function () {
        $('.img-imagemFundo').remove();
        elm.html('<img src="'+reader.result+'" class="img-responsive img-imagemFundo center-block" />')
    };
    if(typeof file != 'undefined'){
        reader.readAsDataURL(file);
    }
});

$('body').on('click', '.openModalBanner', function(e){
    e.preventDefault();
    $('#bannerModal').modal('show');
    $('.addBanner').attr('data-post_url', $(this).attr('href'));
    $('#bannerModal input').val('');
    $('#bannerModal .select2 option').each(function(key, val){
        var opt = $(val);
        $(opt).removeAttr('selected');
    })
});

$('body').on('click', '.editar_banner', function(e){
    e.preventDefault();
    var elm = $(this);

    $.getJSON(elm.attr('href'), function(data){
        $.each(data, function(key, val){
            $('[name=banner_'+key+']').val(val);
        });
        $('.select2 option').each(function(key, val){
            var opt = $(val);
            if($.inArray(opt.attr('value'), data.areas) > -1){
                opt.get(0).selected = true;
            }
            $('[name^=banner_area]').trigger('change'); 
        })
    });
})

$('.addBanner').on('click', function(e){
    e.preventDefault();
    var elm = $(this);
    var file = $('[name=banner_arquivo]').get(0).files[0];
    var formData = new FormData();
    formData.append('file', file);
    var inputs = elm.parents('.modal-content').find('input, select').serializeArray()
    $.each(inputs, function(key, val){
        formData.append(val.name.replace('banner_', ''), val.value);
    });
    formData.append('IDFranquia', $(this).attr('data-IDFranquia'));

    elm.html('<i class="fa ico-spinner3 fa-spin"></i>')
    $.ajax({
        url : elm.attr('data-post_url'),
        type : 'POST',
        data : formData,
        processData: false, 
        contentType: false,
        dataType: 'json',
        success : function(result) {
            if(result.status == 1){
                let banner = result.banner;
                $('#banner_'+banner.IDBanner).remove();
                var tbody = $('#banners table tbody');
                html = '<tr>'+
                            '<td><a href="'+base_url+'banners/remove/'+banner.IDBanner+'" class="btn btn-xs btn-danger remove_banner"><i class="fa fa-trash"></i> Deletar</a></td>' +
                            '<td><a href="'+base_url+'banners/editar/'+banner.IDBanner+'" class="btn btn-xs btn-warning editar_banner openModalBanner"><i class="fa fa-trash"></i> Editar</a></td>' +
                            '<td width="50"><img src="'+banner.file+'" class="img-responsive" /></td>' +
                            '<td>'+banner.nome+'</td>' +
                            '<td>'+banner.tipo+'</td>' +
                            '<td width="200">'+banner.area+'</td>' +
                            '<td>'+banner.data_inicio+'</td>' +
                            '<td>'+banner.data_fim+'</td>' +
                       '</tr>';
                tbody.append(html);
                $('#bannerModal').modal('hide');
            } else {
                alert(result.msg);
            }
            elm.html('Salvar');
        }
    });

})

$('body').on('click', '.remove_banner', function(e){
    e.preventDefault();
    var elm = $(this);
    if(confirm('Você tem certeza que deseja remover esse banner?')){
        $.get(elm.prop('href'));
        elm.parents('tr:first').fadeOut(function(){
            $(this).remove();
        });
    }
});
    $("[name=dataInativo]").hide();
    //$("[name=dataInativo]").change(function()
    $("[name=status]").change(function(){
    var limit = $(this).val();
    console.log(limit);
    if(limit==0){
        var today = new Date(); var dd = today.getDate(); var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear(); if(dd<10){ dd='0'+dd; } if(mm<10){ mm='0'+mm; } 
        var today = dd+'/'+mm+'/'+yyyy;
        var data = new Date();
        var dias = new Array(
         'domingo','segunda','terça','quarta','quinta','sexta','sábado'
        );
        var data = new Date();
        var data = new Date();        
            hora = data.getHours(),
            minutos = data.getMinutes(),
            segundos = data.getSeconds(); 
             
        today += ' - ' + [hora, minutos, segundos].join(':');      

        
        $("[name=dataInativo]").show().val(today).attr('readonly', 'readonly').parent().parent().find('.control-label').show();
        $("[name=dataInativo]").attr('value', + dias[data.getDay()] +today).parent().parent().find('.control-label').text('Franquia Inativada em: ');

    }else{
        $("[name=dataInativo]").hide().parent().parent().find('.control-label').hide();
    }
});





$('body').on('click', '.editar_banner', function(e){
    e.preventDefault();
})


$('body').on('click', '.remove_depoimento', function(e){
    e.preventDefault();
    var elm = $(this);
    if(confirm('Você tem certeza que deseja remover esse Depoimento?')){
        $.get(elm.prop('href'));
        elm.parents('tr:first').fadeOut(function(){
            $(this).remove();
        });
    }
})

$('body').on('click', '.openModalDepoimentos', function(e){
    e.preventDefault();
    $('#depoimentosModal').modal('show');
    $('.addDepoimento').attr('data-post_url', $(this).attr('href'));
});

$('body').on('click', '.editar_depoimento', function(e){
    e.preventDefault();
    var elm = $(this);

    $.getJSON(elm.attr('href'), function(data){
        $.each(data, function(key, val){
            $('[name=depoimentos_'+key+']').val(val);
        });
        
    });
})

$('.addDepoimento').on('click', function(e){
    e.preventDefault();
    var elm = $(this);
    var formData = new FormData();
    var inputs = elm.parents('.modal-content').find('input, select').serializeArray()
    $.each(inputs, function(key, val){
        formData.append(val.name.replace('depoimentos_', ''), val.value);
    });
    formData.append('IDFranquia', $(this).attr('data-IDFranquia'));

    elm.html('<i class="fa ico-spinner3 fa-spin"></i>')
    $.ajax({
        url : elm.attr('data-post_url'),
        type : 'POST',
        data : formData,
        processData: false, 
        contentType: false,
        dataType: 'json',
        success : function(result) {
            if(result.status == 1){
                let depoimento = result.depoimento;
                $('#depoimento_'+depoimento.IDDepoimento).remove();
                var tbody = $('#depoimentos table tbody');
                html = '<tr id="depoimento_'+depoimento.IDDepoimento+'">'+
                            '<td><a href="'+base_url+'depoimentos/remove/'+depoimento.IDDepoimento+'" class="btn btn-xs btn-danger remove_depoimento"><i class="fa fa-trash"></i> Deletar</a></td>' +
                            '<td><a href="'+base_url+'depoimentos/depoimentosEditar/'+depoimento.IDDepoimento+'" class="btn btn-xs btn-warning editar_banner openModalDepoimentos"><i class="fa fa-trash"></i> Editar</a></td>' +
                            '<td>'+depoimento.nome+'</td>' +
                            '<td>'+depoimento.email+'</td>' +
                            '<td colspan=2">'+depoimento.depoimento+'</td>' +
                            '<td>'+depoimento.status+'</td>' +
                       '</tr>';
                tbody.append(html);
                $('#depoimentosModal').modal('hide');
            } else {
                alert(result.msg);
            }
            elm.html('Salvar');
        }
    });

})