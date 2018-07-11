$(function () {
    $("#e1").select2();
    $("#search_ramos").select2();
    $('.select2').select2();

    $('.changePagamentoStatus').on('change', function(){
        var elm = $(this);
        $.post(base_url+'financeiro/updateStatus/'+elm.attr('data-idPagamento'), {status: elm.val()}, function(result){
            
        })
    });


    function get_crescimento_franquias(){
        var ids = 'id=';
        $('.leads').each(function(key, val){
            ids += '&idFranquia[]='+$(this).attr('data-idFranquia')
        });
        $.post(base_url+'franquias/getCrescimentoFranquias', ids, function(result){
            $.each(result, function(key, val){
                $('#leads_'+key).html(val.leads);
                $('#leads_exclusivo_'+key).html(val.leads_exclusivo);
                $('#visitas_'+key).html(val.visitas);
            
            })
        }, 'json')
    }
    if($('td.leads').get(0)){
        get_crescimento_franquias();
    }

    $('select[name=segmentos]').on('change', function () {
        var elm = $(this)
        var select = $('select[name=ramos]')
        select.attr('disabled', 'disabled').html('<option value="">Carregando...</option>')
        $.get(base_url + 'franquias/getAllRamos/' + elm.val(), function (data) {

            select.removeAttr('disabled').html(data)
        })
    })

    $('#remove_anexo').on('click', function (e) {
        e.preventDefault();
        $("input[name='arquivo_rel']").val('');
        $("#warnig-anexo span").text('');
        $('#warnig-anexo').hide()
    })

    $('#send').on('submit', function (e) {
        e.preventDefault()

        var button = $('#btn_send');
        buttonBusy(button);
        busyIndicator("visible", "");
        
        setTimeout(function () {
            html2canvas($("#reports").get(0), {
                background: "#ffffff",
                onrendered: function (canvas) {
                    $.ajax({
                        url: base_url + "franquias/saveDataURL",
                        method: "POST",
                        data: {base64: canvas.toDataURL()},
                        success: function (data) {
                         
                            if(data.success){
                                $("input[name='arquivo_rel']").val(data.file);
                                envioEmail(); 
                            }else{
                                $('#myModal').modal('show');
                                $( ".modal-body div#aviso" ).empty();
                                $( ".modal-body div#aviso" ).append(data.error);
                                $('#btn_send').text('Enviar')

                            }
                            
                        },
                        error: function (data) {
                            $('#myModal').modal('show');
                            $( ".modal-body div#aviso" ).empty();
                            $('#btn_send').text('Enviar')
                            $(".modal-body div#aviso").append(data.error);
                        }
                    });

                }
            });
            busyIndicator("hide", button);
        }, 500);
    });

    $("a i.fa.fa-times").click(function (ev) {
        var div_parent = $(this).attr("data-id");
        var div_col = $(this).attr("data-comp");
        $(this).parent().parent().parent().parent().remove();
        
        var classes = [];
        $("#" + div_parent + " .reportContent").children().each(function () {
            var col = $(this).attr("class");
            classes.push(col);
            if (div_col == col) {
                if ($(this).find("div.panel").length == 0) {
                    $(this).remove();
                    classes.remove(col);
                }
            }
        });

        if (classes.length == 1) {
            $("#" + div_parent + " ." + classes[0]).addClass("col-sm-12").removeClass(classes[0]);
        }
        ev.preventDefault();
    });
    
    $("a i.fa.fa-expand").click(function (ev) {
        var div_parent = $(this).attr("data-id");
        $("#" + div_parent + " .reportContent").children().each(function () {
            var old_class = $(this).attr("class");
            $(this).removeClass(old_class).addClass("col-sm-12").attr("data-class", old_class);
            
            $("#" + div_parent + " a i.fa.fa-expand").addClass("hide");
            $("#" + div_parent + " a i.fa.fa-compress").removeClass("hide");
        });
        ev.preventDefault();
    });
    
    $("a i.fa.fa-compress").click(function (ev) {
        var div_parent = $(this).attr("data-id");
        $("#" + div_parent + " .reportContent").children().each(function () {
            var old_class = $(this).attr("data-class");
            $(this).removeClass("col-sm-12").removeAttr("data-class").addClass(old_class);

            $("#" + div_parent + " a i.fa.fa-compress").addClass("hide");
            $("#" + div_parent + " a i.fa.fa-expand").removeClass("hide");
        });
        ev.preventDefault();
    });

    function envioEmail() {
        var form = $('#send')
        tinyMCE.triggerSave(true, true);
        $.ajax({
            url: form.attr('action'),
            method: 'post',
            data: form.serialize(),
            dataType: 'json',
            beforeSend: function () {
                form.find('input, button').addClass('disabled')
                //form.find('#btn_send').text('Enviando Email...')
            },
            success: function (data) {

                if (data.status == "erro") {
                    $(".modal-body div#aviso").removeClass('alert-success');
                    $(".modal-body div#aviso").addClass('alert-danger');
                } else {
                    $(".modal-body div#aviso").removeClass('alert-danger');
                    $(".modal-body div#aviso").addClass('alert-success');

                }
                $(".modal-body div#aviso").empty();
                $(".modal-body div#aviso").append(data.msg);
                $('#msg').empty();

                $('#myModal').modal('show');
                //form.find('#btn_send').text('Enviar')
                buttonBusy($('#btn_send'));
                form.find('input, button').removeClass('disabled')
            }
        })

    }

    function buttonBusy(button) {
        var text = button.html();
        var nText = button.attr("data-text");

        button.html(nText).attr("data-text", text);
    }

    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    $('.enviar_relatorio').on('click', function(e){
        e.preventDefault();
        var elm = $(this);
        var franquias = $('#IDFranquia_relatorio').val();
        var dados = $('#filtroRelatorio').find('input, textarea').serialize();
        if(!franquias){
            franquias = all_franquias;
        }
        $.each(franquias, function(key, IDFranquia){
            dados += '&IDFranquia[]='+IDFranquia;
        });

        elm.addClass('disabled').html('<i class="fa fa-refresh fa-spin"></i>');
        $.post(base_url+'franquias/envioRelatorioMass', dados, function(data){
            elm.parents('.modal-footer').prepend('<div class="alert alert-info text-center">'+data+'</div>');
            elm.remove()
        });
    });

    $('.form-horizontal [name=nomeFantasia]').on('blur', function(e){
        var slug_elm = $('[name=url]');
        var data = {
            nome: $(this).val()
        };
        if(location.href.search('editar') > -1){
            var paths = location.href.split('/');
            data['IDFranquia'] = paths[paths.length-1];
        }
        if(slug_elm.val() == ""){
            $.post(base_url+'franquias/suggestUrl', data, function(slug){
                slug_elm.val(slug);
            });
        }
    });

    $('.form-horizontal [name=url]').on('blur', function(e){
        var slug_elm = $('[name=url]');
        var data = {
            nome: $(this).val()
        };
        if(location.href.search('editar') > -1){
            var paths = location.href.split('/');
            data['IDFranquia'] = paths[paths.length-1];
        }
        $.post(base_url+'franquias/suggestUrl', data, function(slug){
            slug_elm.val(slug);
        });
    });

});

function busyIndicator(action = 'visible', object)
{
    if (action == 'visible') {
        $("body").prepend("<div class='busy-indicator'><div style='margin-left: 45%;margin-top: 20%;'><i class=\"fa fa-spinner fa-pulse fa-5x fa-fw\"></i></div></div>");
        $("span.tools.pull-right").hide();
        $("#reports").attr("style", "padding: 5px;");
        $("#main-content").attr("style", "margin: 0px;");
        $('html, body').animate({
            scrollTop: $("#reports").offset().top - 100
        }, 0);
    } else if (action == "hide") {
        $('html, body').animate({
            scrollTop: object.offset().top - 150
        }, 0);
        $("#reports").removeAttr("style");
        $("#main-content").removeAttr("style");

        setTimeout(function () {
            $("span.tools.pull-right").show();
            $("div.busy-indicator").remove();

        }, 500);
    }
}

$('body').on('click','.delete', function(e){
    e.preventDefault();
    var _self = $(this);
    var decisao = confirm("Tem certeza que deseja excluir!");
    if (decisao) {
        $.get(_self.attr('href'));
        _self.parents('tr').fadeOut();
    }
});

