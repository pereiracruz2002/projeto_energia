$('[name=IDEst]').on('change', function(){

    var elm = $(this)
    var options = '';
    $.getJSON(base_url+'franquias/getCidades/'+elm.val(), function(data){
        $.each(data, function(key, val){
            options += '<option value="'+val.IDCid+'">'+val.nome+'</option>';
        })
        $('[name=IDCid]').html(options);
    }); 
})
$('.form-horizontal [name=url]').on('blur', function(e){
    var slug_elm = $(this);
    var data = {
        url: slug_elm.val()
    };
    if(location.href.search('editar') > -1){
        var paths = location.href.split('/');
        data['id'] = paths[paths.length-1];
    }
    $.post(base_url+'fornecedores/suggestUrl', data, function(slug){
        slug_elm.val(slug);
    });
});
