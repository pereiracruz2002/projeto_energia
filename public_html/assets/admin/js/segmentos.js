$('.img-icone .btn').on('click', function(e) {
    e.preventDefault();
    var elm = $(this);
    if(confirm('Você tem certeza que deseja deletar essa imagem?')){
        $.get(elm.attr('href'));
        elm.parent().fadeOut();
    }
})

$('.form-horizontal [name=nomeUrl]').on('blur', function(e){
    var slug_elm = $(this);
    var data = {
        nomeUrl: slug_elm.val()
    };
    if(location.href.search('editar') > -1){
        var paths = location.href.split('/');
        data['IDSeg'] = paths[paths.length-1];
    }
    $.post(base_url+'segmentos/suggestUrl', data, function(slug){
        slug_elm.val(slug);
    });
});

