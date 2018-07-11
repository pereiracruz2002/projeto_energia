$(document).ready(function () {
    $("body").on('change', '#upload_doc', function (e) {
        var form_group = $(this).parent().parent();
        var form = new FormData();
        form.append('doc', e.target.files[0]);
        
        var alert = $(".alert.alert-danger.alert-file");
        alert.html("").addClass("hide");

        ajaxUploadFoto = $.ajax({
            url: base_url + "sugestao/upload_doc",
            type: "POST",
            data: form,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data.error) {
                    form_group.removeClass("has-success").addClass("has-error");
                    form_group.find('span.glyphicon-ok').each(function () {
                        $(this).addClass("hide");
                    });
                    form_group.find('span.glyphicon-remove').each(function () {
                        $(this).removeClass("hide");
                    });
                    alert.html(data.error).removeClass("hide");
                } else {
                    form_group.removeClass("has-error").addClass("has-success");
                    form_group.find('span.glyphicon-ok').each(function () {
                        $(this).removeClass("hide");
                    });
                    form_group.find('span.glyphicon-remove').each(function () {
                        $(this).addClass("hide");
                    });
                    $("input[name=document]").val(data.upload_data.file_name);
                    alert.html("").addClass("hide");
                }
            }
        });
    });
});