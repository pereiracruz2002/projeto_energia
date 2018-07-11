$('.form-horizontal [name=url]').on('blur', function(e){
    var slug_elm = $(this);
    var data = {
        url: slug_elm.val()
    };
    if(location.href.search('editar') > -1){
        var paths = location.href.split('/');
        data['id'] = paths[paths.length-1];
    }
    $.post(base_url+'classificados/suggestUrl', data, function(slug){
        slug_elm.val(slug);
    });
});
