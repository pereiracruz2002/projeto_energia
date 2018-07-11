$('.form-horizontal [name=nomeUrl]').on('blur', function(e){
    var slug_elm = $(this);
    var data = {
        nomeUrl: slug_elm.val()
    };
    if(location.href.search('editar') > -1){
        var paths = location.href.split('/');
        data['IDRamo'] = paths[paths.length-1];
    }
    $.post(base_url+'ramos/suggestUrl', data, function(slug){
        slug_elm.val(slug);
    });
});

