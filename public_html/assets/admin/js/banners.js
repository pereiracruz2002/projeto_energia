$(document).ready(function() {
  $('select[name=id_pagina]').on('change', function () {
    var elm = $(this)
    var select = $('select[name=IDTipo]')
    select.attr('disabled', 'disabled').html('<option value="">Carregando...</option>')
    $.get(base_url + 'banners/getPosicao/' + elm.val(), function (data) {

        select.removeAttr('disabled').html(data)        
        select.prepend('<option selected value="0">Todos</option>');
    })
  })
});