$(document).ready(function () {
    $("a.btn-show-img").click(function () {
        var id = $(this).attr("data-id-img");
        var img = $(this).attr("data-img");
        var source = $(this).attr("data-source-img");
        var legenda = $(this).attr("data-legenda-img");

        $(".modal-body .area-img").html("<img src='" + img + "' class='img-rounded' />");
        $(".modal-body .area-data #legenda").val(legenda);
        $("input[name=idimg]").val(id);
        $("input[name=source]").val(source);
    });

    $(".btn.btn-remover-foto").click(function () {
        var dados = {};
        dados.IDImg = $('input[name=idimg]').val();
        dados.source = $('input[name=source]').val();

        $.ajax({
            url: base_url + "galeria/remove_imagem",
            type: 'POST',
            dataType: 'json',
            data: dados,
            complete: function (xhr, textStatus) {},
            success: function (data, textStatus, xhr) {
                if (data.status === true)
                    location.href = location.href;
                else
                    alert(data.status);
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Error ", xhr)
            }
        });
    });

    $(".btn.btn-salvar-foto").click(function () {
        var button = $(this);
        var dados = {};
        dados.IDImg = $('input[name=idimg]').val();
        dados.legenda = $("input#legenda").val();
        
        if (dados.legenda === "") {
            $(".alert-legenda").toggleClass("hide");
            $("input#legenda").focus();
            toggleButton(button);
        } else {
            $.ajax({
                url: base_url + "galeria/update_imagem",
                type: 'POST',
                dataType: 'json',
                data: dados,
                success: function (data) {
                    if (data.status === true)
                        location.href = location.href;
                    else {
                        alert("Nenhuma alteração foi feita");
                        toggleButton(button);
                    }
                },
                error: function (data) {
                    alert("Error ", data);
                    toggleButton(button);
                }
            });
        }
    });

    var ajaxUploadFoto;

    $("button.btn-cancel-upload").click(function () {
        if (ajaxUploadFoto)
            ajaxUploadFoto.abort();
        cleanAdjustphoto();
    });

    $("body").on('change', '#photo', function (e) {
        $(".message-upload").html("");
        var form = new FormData();
        form.append('image', e.target.files[0]);

        ajaxUploadFoto = $.ajax({
            url: base_url + "galeria/upload_imagem",
            type: "POST",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data.error) {
                    alert(data.error);
                    cleanAdjustphoto();
                } else {
                    cropImage(data.upload_data.file_name);
                }
            }
        });
    });

    function cropImage(img) {
        if ($("#enviarCrop").hasClass('hide'))
            $("#enviarCrop").removeClass('hide');
        var area_image = "<img id='image_crop' src='" + source_image + galeria_nome + img + "' class='img-responsive img-align-center' />";
        $("#adjustPhoto .modal-dialog").width($(document).width() * 0.80);
        $(".area-img").parent().height($(window).height() * 0.70);
        $(".area-img").html(area_image).removeClass('hide').fadeIn();
        $(".area-img").append("<input type='hidden' value='" + img + "' name='formPhoto' />");
        $(".area-spinner").fadeOut();

        var crop = $("#image_crop");
        crop.croppie({
            viewport: {
                width: 640,
                height: 420
            }, boundary: {
                width: ($(".area-img").parent().width() > 640) ? $(".area-img").parent().width() : 640,
                height: ($(".area-img").parent().height() > 420) ? $(".area-img").parent().height() * 0.93 : 420
            }, enforceBoundary: false
        });

        return false;
    }

    $("#enviarCrop").on('click', function () {
        var crop = $("#image_crop");
        crop.croppie('result', {
            type: 'base64'
        }).then(function (resp) {
            var img = $("input[name=formPhoto]").val();
            var dados = {img: resp, output: img};

            $.ajax({
                url: base_url + "galeria/upload_base64",
                dataType: 'json',
                type: 'POST',
                data: dados,
                async: false,
                success: function (data) {
                    if (data.status === "Ok") {
                        var dados = {url: img, IDGal: $('input[name=IDGalImg]').val()};
                        $.ajax({
                            url: base_url + "galeria/salvar_imagem",
                            dataType: 'json',
                            type: 'POST',
                            data: dados,
                            async: false,
                            success: function (data) {
                                if (data.status === true)
                                    location.href = location.href;
                            }, error: function (data) {
                                alert(data.error);
                                cleanAdjustphoto();
                            }
                        });
                    } else if (data.status === "Error") {
                        alert(data.error);
                        cleanAdjustphoto();
                    }
                }, error: function (error) {
                    alert(error);
                    cleanAdjustphoto();
                }
            });
        });
    });

    function cleanAdjustphoto()
    {
        var dados = {};
        dados.source = $("input[name=formPhoto]").val();

        $.ajax({
            url: base_url + "galeria/unlink_imagem",
            dataType: 'json',
            type: 'POST',
            data: dados,
            async: false,
            success: function (data) {
                if (data.file === "Ok")
                    location.href = location.href;
            }, error: function (data) {
                alert(data.file);
            }
        });

        $("#adjustPhoto .modal-dialog").width("600px");
        $(".area-img").parent().height("auto");
        $(".area-img").fadeOut().html("");
        $(".area-spinner").fadeIn();
        if (!$("#enviarCrop").hasClass('hide'))
            $("#enviarCrop").addClass('hide');
    }

    $("button.edit-video").click(function () {
        $(".modal-body .area-data input[name=idvideo]").val($(this).attr("data-id-video"));
        $("textarea.textarea-url-video-edit").html(($(this).parent().parent().parent().children(".galeria-videos").html()).trim());
        $(".modal-body .area-data input[name=legenda-edit]").val($(this).attr("data-legenda-img"));
    });

    $("form[name=upload_video]").on('submit', function (ev) {
        ev.preventDefault();
        var button = $(this);
        
        var errors = 0;
        var message = [];
        if ($("form[name=upload_video] textarea[name=embed]").val() === "") {
            ++errors;
            message.push("*O Embed do Vídeo é obrigatório.");
        }
        if ($("form[name=upload_video] input[name=legenda]").val() === "") {
            ++errors;
            message.push("*A Legenda é obrigatória");
        }
        
        if (errors > 0) {
            $("form[name=upload_video] div.alert").html(message.join("<br/>")).removeClass("hide");
            toggleButton(button);
            return;
        }
        var url = $(this).attr("action");
        $.ajax({
            type: 'POST',
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                if (data.status === true)
                    location.href = location.href;
                else if (data.status === false)
                    alert("Não foi possível salvar o vídeo.<br/>Tente de novo.");
                toggleButton(button);
            },
            error: function (data) {
                alert("Error ", data);
                toggleButton(button);
            }
        });
    });

    $("button.btn-salvar-video").click(function () {
        var button = $(this);
        var dados = {};
        dados.IDVd = $("input[name=idvideo]").val();
        dados.url = $(".textarea-url-video-edit").val();
        dados.legenda = $("input[name=legenda-edit]").val();
        
        if (dados.legenda === "") {
            $(".alert-legenda").toggleClass("hide");
            $("input#legenda").focus();
            toggleButton(button);
        } else {
            $.ajax({
            url: base_url + "galeria/update_video",
            type: 'POST',
            data: dados,
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.status === true)
                    location.href = location.href;
                else if (data.status === false)
                    alert("Não foi possível salvar o vídeo.<br/>Tente de novo.");
                toggleButton(button);
            }, error: function (data) {
                alert("Error ", data);
            }
        });
        }
    });

    $(".btn.btn-remover-video").click(function () {
        var button = $(this);
        var dados = {};
        dados.IDVd = $('input[name=idvideo]').val();

        $.ajax({
            url: base_url + "galeria/remove_video",
            type: 'POST',
            dataType: 'json',
            data: dados,
            success: function (data) {
                if (data.status === true)
                    location.href = location.href;
                else if (data.status === false)
                    alert("Não foi possível remover o vídeo.<br/>Tente de novo.");
                toggleButton(button);
            },
            error: function (data) {
                alert("Error ", data);
                toggleButton(button);
            }
        });
    });

});