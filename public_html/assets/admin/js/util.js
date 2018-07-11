$(document).ready(function () {
    tinymce.init({
        selector: '.tinymce',
        language: 'pt_BR',
        plugins: [
            "advlist autolink autosave link image lists charmap preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount code fullscreen media nonbreaking",
            "table contextmenu directionality textcolor paste textcolor colorpicker textpattern"
        ],
        toolbar1: " bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontsizeselect | table | cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image | preview | forecolor backcolor | subscript superscript charmap spellchecker pagebreak hr removeformat code",
        height: 300,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        branding: false,
        menubar: false,
        relative_urls: false,
        remove_script_host: false,
        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function () {
                var file = this.files[0];
                var formData = new FormData();
                formData.append('file', file);
                $.ajax({
                    url : base_url+'conteudo/uploadImgContent',
                    type : 'POST',
                    data : formData,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,  // tell jQuery not to set contentType
                    dataType: 'json',
                    success : function(result) {
                        if(result.status == 1){
                            cb(result.url, {title: file.name});
                        } else {
                            alert(result.msg);
                        }
                    }
                });
            };

            input.click();
        }
    });

    $('body').on('click', '.delete', function (e) {
        e.preventDefault();
        var _self = $(this);
        var decisao = confirm("Tem certeza que deseja excluir?");
        if (decisao) {
            $.get(_self.attr('href'));
            if ($('.alert-success').length == 0)
                $('.m-top-md').after('<div class="alert alert-success"><p>Removido com sucesso!</p></div>');
            _self.parents('tr').fadeOut();
        }
    });


    $("div.panel-show-hide").click(function () {
        var heading = $(this);
        var caret = heading.find("i");

        heading.next().fadeToggle();
        if (caret.hasClass('caret-down'))
            caret.removeClass('caret-down').removeClass('fa-caret-down').addClass('fa-caret-up').addClass('caret-up');
        else
            caret.removeClass('caret-up').removeClass('fa-caret-up').addClass('fa-caret-down').addClass('caret-down');
    });
});
