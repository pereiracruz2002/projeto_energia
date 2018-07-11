(function ($) {
    "use strict";

    $(document).ready(function(){
        $('.checksToggle').on('click', function(){
            $('[name^=id]').prop('checked', $(this).is(':checked'));
        });

        $('.status_lead').on('click', function(e){
            e.preventDefault();
            var elm = $(this);
            if(elm.hasClass('btn-danger')){
                if(confirm('Você tem certeza que deseja reprovar esse lead?')){
                    elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                    $.getJSON(elm.prop('href'), function(result){
                        elm.parents('tr').fadeOut();
                        var total_leads = $('#aprovarLeads_total');
                        total_leads.text(parseInt(total_leads.text()) - 1);

                    });
                }
            } else {
                elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                $.getJSON(elm.prop('href'), function(result){
                    elm.parents('tr').fadeOut();
                    var total_leads = $('#aprovarLeads_total');
                    total_leads.text(parseInt(total_leads.text()) - 1);
                });
            }
        });

        $('.status_lead_modal').on('click', function(e){
            e.preventDefault();
            var elm = $(this);
            var arr_lead = elm.attr('href').split('/')
            var id_lead = arr_lead[arr_lead.length-1];
            console.log(id_lead)
            if(elm.hasClass('btn-danger')){
                if(confirm('Você tem certeza que deseja reprovar esse lead?')){
                    elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                    $.getJSON(elm.prop('href'), function(result){
                        $('.modal').modal('hide');
                        $('#lead_'+id_lead).fadeOut();
                        var total_leads = $('#aprovarLeads_total');
                        total_leads.text(parseInt(total_leads.text()) - 1);
                    });
                }
            } else {
                elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                $.getJSON(elm.prop('href'), function(result){
                    $('.modal').modal('hide');
                    $('#lead_'+id_lead).fadeOut();
                    var total_leads = $('#aprovarLeads_total');
                    total_leads.text(parseInt(total_leads.text()) - 1);
                });
            }
        })
        $('.show_info').on('click', function(e){
            e.preventDefault();
            var elm_modal = $(this).attr('href');
            $(elm_modal).modal();
        })
        $('.novos_leads tbody td').on('click', function(e){
            if($(e.target).is('td')){
                let elm_check = $(this).parent().find('[name^=id]');
                    elm_check.prop('checked', !elm_check.prop('checked'));
            }
        });

        $('.aprovar_selected').on('click', function(e){
            e.preventDefault();
            var elm = $(this);
            var checks = $('[name^=id]:checked');
            if(checks.length == 0){
                alert('Você precisa selecionar os leads que deseja aprovar primeiro');
            } else {
                var dados = checks.serialize();
                elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                $.post(base_url+'aprovarLeads/aprovarMass', dados, function(result){
                    if(result.status == 1){
                        var total_leads = $('#aprovarLeads_total');
                        total_leads.text(parseInt(total_leads.text()) - result.ids.length);
                        $.each(result.ids, function(key, val){
                            $('#lead_'+val).fadeOut();
                            elm.removeClass('disabled').html('<i class="fa fa-check"></i> Aprovar');
                        });
                        location.reload(); 
                    } else {
                        alert(result.msg);
                    }
                }, 'json');
            }
        });

        $('.reprovar_selected').on('click', function(e){
            e.preventDefault();
            var elm = $(this);
            var checks = $('[name^=id]:checked');
            var dados = checks.serialize();
            if(checks.length == 0){
                alert('Você precisa selecionar os leads que deseja reprovar primeiro');
            } else {
                if(confirm('Você tem certeza que deseja reprovar '+checks.length+' lead'+(checks.length > 1 ? 's' : '')+'?')){
                    elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                    $.post(base_url+'aprovarLeads/reprovarMass', dados, function(result){
                        if(result.status == 1){
                            var total_leads = $('#aprovarLeads_total');
                            total_leads.text(parseInt(total_leads.text()) - result.ids.length);
                            $.each(result.ids, function(key, val){
                                $('#lead_'+val).fadeOut();
                                elm.removeClass('disabled').html('<i class="fa fa-check"></i> Aprovar');
                            });
                            location.reload(); 
                        } else {
                            alert(result.msg);
                        }

                    }, 'json')
                }
            }
        });

        $('.aprovar_all').on('click', function(e){
            e.preventDefault();
            var elm = $(this);
                if(confirm('Você tem certeza que deseja aprovar todas as leads?')){
                    elm.addClass('disabled').html('<i class="fa fa-spin ico-spinner3"></i>');
                    $.post(base_url+'aprovarLeads/aprovar_all', {aprovar_all: true}, function(result){
                        if(result.status == 1){
                            console.log(result);
                            var total_leads = $('#aprovarLeads_total');
                            total_leads.text(parseInt(total_leads.text()) - result.ids.length);
                            $.each(result.ids, function(key, val){
                                $('#lead_'+val).fadeOut();
                                elm.removeClass('disabled').html('<i class="fa fa-check"></i> Aprovar Todas');
                            });
                            location.reload(); 
                        } else {
                            alert(result.msg);
                        }

                    }, 'json')
                }
            
        });
    });
})(jQuery);

