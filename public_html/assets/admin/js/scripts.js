(function ($) {
    "use strict";
    $(document).ready(function () {
        $('body').on('click', '.confirm', function (e) {
            e.preventDefault();
            var _self = $(this);
            var decisao = confirm("Tem certeza que deseja "+_self.text()+'?');
            if (decisao) {
                $.get(_self.attr('href'));
                if ($('.alert-success').length == 0)
                    $('.m-top-md').after('<div class="alert alert-success"><p>Removido com sucesso!</p></div>');
                _self.parents('tr').fadeOut();
            }
        });
        $('body').on('click', '.basecrud-sort', function(e){
            e.preventDefault();
            var href = $('.filtro').attr('action').replace('listar', '');
            $.post(href+'order_by', {campo: $(this).data('order_by')}, function(){
                location.reload();
            });
        });


        $(".btn-spinner").click(function () {
            toggleButton($(this));
        });

        $('.datetime').mask('00/00/0000 00:00:00')

        $('.tel').mask(function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            // }, {
            //     onKeyPress: function(val, e, field, options) {
            //         field.mask(maskBehavior.apply({}, arguments), options);
            //     }
        });
        $('.cnpj').mask('99.999.999/9999-99');
        /*==Left Navigation Accordion ==*/
        if ($.fn.dcAccordion) {
            $('#nav-accordion').dcAccordion({
                eventType: 'click',
                autoClose: true,
                saveState: true,
                disableLink: true,
                speed: 'slow',
                showCount: false,
                autoExpand: true,
                classExpand: 'dcjq-current-parent'
            });
        }
        /*==Slim Scroll ==*/
        if ($.fn.slimScroll) {
            $('.event-list').slimscroll({
                height: '305px',
                wheelStep: 20
            });
            $('.conversation-list').slimscroll({
                height: '360px',
                wheelStep: 35
            });
            $('.to-do-list').slimscroll({
                height: '300px',
                wheelStep: 35
            });
        }
        /*==Nice Scroll ==*/
        if ($.fn.niceScroll) {


            $(".leftside-navigation").niceScroll({
                cursorcolor: "#1FB5AD",
                cursorborder: "0px solid #fff",
                cursorborderradius: "0px",
                cursorwidth: "3px"
            });

            $(".leftside-navigation").getNiceScroll().resize();
            if ($('#sidebar').hasClass('hide-left-bar')) {
                $(".leftside-navigation").getNiceScroll().hide();
            }
            $(".leftside-navigation").getNiceScroll().show();

            $(".right-stat-bar").niceScroll({
                cursorcolor: "#1FB5AD",
                cursorborder: "0px solid #fff",
                cursorborderradius: "0px",
                cursorwidth: "3px"
            });

        }

        /*==Easy Pie chart ==*/
        if ($.fn.easyPieChart) {

            $('.notification-pie-chart').easyPieChart({
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: "#39b6ac",
                lineWidth: 3,
                size: 50,
                trackColor: "#efefef",
                scaleColor: "#cccccc"

            });

            $('.pc-epie-chart').easyPieChart({
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: "#5bc6f0",
                lineWidth: 3,
                size: 50,
                trackColor: "#32323a",
                scaleColor: "#cccccc"

            });

        }

        /*== SPARKLINE==*/
        if ($.fn.sparkline) {

            $(".d-pending").sparkline([3, 1], {
                type: 'pie',
                width: '40',
                height: '40',
                sliceColors: ['#e1e1e1', '#8175c9']
            });



            var sparkLine = function () {
                $(".sparkline").each(function () {
                    var $data = $(this).data();
                    ($data.type == 'pie') && $data.sliceColors && ($data.sliceColors = eval($data.sliceColors));
                    ($data.type == 'bar') && $data.stackedBarColor && ($data.stackedBarColor = eval($data.stackedBarColor));

                    $data.valueSpots = {
                        '0:': $data.spotColor
                    };
                    $(this).sparkline($data.data || "html", $data);


                    if ($(this).data("compositeData")) {
                        $spdata.composite = true;
                        $spdata.minSpotColor = false;
                        $spdata.maxSpotColor = false;
                        $spdata.valueSpots = {
                            '0:': $spdata.spotColor
                        };
                        $(this).sparkline($(this).data("compositeData"), $spdata);
                    }
                    ;
                });
            };

            var sparkResize;
            $(window).resize(function (e) {
                clearTimeout(sparkResize);
                sparkResize = setTimeout(function () {
                    sparkLine(true)
                }, 500);
            });
            sparkLine(false);



        }



        if ($.fn.plot) {
            var datatPie = [30, 50];
            // DONUT
            $.plot($(".target-sell"), datatPie, {
                series: {
                    pie: {
                        innerRadius: 0.6,
                        show: true,
                        label: {
                            show: false

                        },
                        stroke: {
                            width: .01,
                            color: '#fff'

                        }
                    }




                },

                legend: {
                    show: true
                },
                grid: {
                    hoverable: true,
                    clickable: true
                },

                colors: ["#ff6d60", "#cbcdd9"]
            });
        }



        /*==Collapsible==*/
        $('.widget-head').click(function (e) {
            var widgetElem = $(this).children('.widget-collapse').children('i');

            $(this)
                    .next('.widget-container')
                    .slideToggle('slow');
            if ($(widgetElem).hasClass('ico-minus')) {
                $(widgetElem).removeClass('ico-minus');
                $(widgetElem).addClass('ico-plus');
            } else {
                $(widgetElem).removeClass('ico-plus');
                $(widgetElem).addClass('ico-minus');
            }
            e.preventDefault();
        });




        /*==Sidebar Toggle==*/

        $(".leftside-navigation .sub-menu > a").click(function () {
            var o = ($(this).offset());
            var diff = 80 - o.top;
            if (diff > 0)
                $(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
            else
                $(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
        });



        $('.sidebar-toggle-box .fa-bars').click(function (e) {

            $(".leftside-navigation").niceScroll({
                cursorcolor: "#1FB5AD",
                cursorborder: "0px solid #fff",
                cursorborderradius: "0px",
                cursorwidth: "3px"
            });

            $('#sidebar').toggleClass('hide-left-bar');
            if ($('#sidebar').hasClass('hide-left-bar')) {
                $(".leftside-navigation").getNiceScroll().hide();
            }
            $(".leftside-navigation").getNiceScroll().show();
            $('#main-content').toggleClass('merge-left');
            e.stopPropagation();
            if ($('#container').hasClass('open-right-panel')) {
                $('#container').removeClass('open-right-panel')
            }
            if ($('.right-sidebar').hasClass('open-right-bar')) {
                $('.right-sidebar').removeClass('open-right-bar')
            }

            if ($('.header').hasClass('merge-header')) {
                $('.header').removeClass('merge-header')
            }


        });
        $('.toggle-right-box .fa-bars').click(function (e) {
            $('#container').toggleClass('open-right-panel');
            $('.right-sidebar').toggleClass('open-right-bar');
            $('.header').toggleClass('merge-header');

            e.stopPropagation();
        });

        $('.header,#main-content,#sidebar').click(function () {
            if ($('#container').hasClass('open-right-panel')) {
                $('#container').removeClass('open-right-panel')
            }
            if ($('.right-sidebar').hasClass('open-right-bar')) {
                $('.right-sidebar').removeClass('open-right-bar')
            }

            if ($('.header').hasClass('merge-header')) {
                $('.header').removeClass('merge-header')
            }
        });


        $('.panel .tools .fa').click(function () {
            var el = $(this).parents(".panel").children(".panel-body");
            if ($(this).hasClass("fa-chevron-down")) {
                $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
                el.slideUp(200);
            }
        });

//        $('.panel .tools .fa-times').click(function () {
//            $(this).parents(".panel").parent().remove();
//        });

        // tool tips

        $('.tooltips').tooltip();

        // popovers

        $('.popovers').popover();

        $.getJSON(base_url + 'aprovarLeads/get_total', function (result) {
            $('#aprovarLeads_total').text(result.total);
        });

        
        $.getJSON(base_url + 'sugestao_redacao/redacao_total', function (result) {
            $('#sugestoesRedacao_total').text(result.total);
        });
        
        $.getJSON(base_url + 'sugestao_reclamacao/sugestao_reclamacao_total', function (result) {
            $('#sugestoesReclamacoes_total').text(result.total);
        });
        
        $('.delete').popover({
            trigger: 'manual',
            html: true,
            placement: 'left',
            title: 'Remover esse registro?',
            content: '<a class="btn btn-danger cancelar" href="#">Cancelar</a> <a class="btn btn-primary confirmar_remover" href="#">Deletar</a>'
        }).on('click', function (e) {
            e.preventDefault();
            $(this).popover('toggle');
        });

        $('body').on('click', '.cancelar', function (e) {
            e.preventDefault();
            $('.remover, .remover_field, .remover_imagem').popover('hide');
            $(this).parents('.popover').fadeOut(function () {
                $(this).remove();
            });
        });

        $('body').on('click', '.confirmar_remover', function (e) {
            e.preventDefault();
            var tr = $(this).parents('tr:first');
            var href = $(this).parents('td:first').find('.delete').attr('href');
            $.get(href, function (data) {
                if (data == 'ok')
                    tr.fadeOut(function () {
                        $(this).remove();
                    });
                else
                    alert(data);
            });
        });

    });


})(jQuery);

function toggleButton(button)
{
    var new_text = button.attr("data-text");
    var old_text = button.html();

    button.attr("data-text", old_text).html(new_text);
    button.hasClass('disabled') ? button.removeClass("disabled") : button.addClass("disabled");
}
