<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Administrar</title>
        <link href="<?php echo base_url() ?>assets/admin/bs3/css/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/admin/css/bootstrap-reset.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/admin/font-awesome/css/font-awesome.css" rel="stylesheet" />
        <link href="<?php echo base_url() ?>assets/admin/css/style.css" rel="stylesheet">

        <script src="<?php echo base_url() ?>assets/admin/js/jquery.js"></script>
        <script src="<?php echo base_url() ?>assets/admin/bs3/js/bootstrap.min.js"></script>

        <script>
            $(document).ready(function () {
                <?php if (isset($error_forgot) || isset($success_forgot)): ?>
                    $("#modalForgot").trigger("click");
                <?php endif; ?>
                    
                $("form").on("submit", function () {
                    $(this).find("button").each(function () {
                        $(this).attr("disabled", "disabled").html('<i class="fa ico-spinner3 fa-spin"></i>');
                    });
                });
            });
        </script>
    </head>
    <body class="login-body">
        <div class="container"> 
            <form class="form-signin" action="/admin/login" method="post">
                <h2 class="form-signin-heading"><!--<img src="<?php echo base_url() ?>assets/admin/images/logo.png" class="img-responsive" />--></h2> 
                <div class="login-wrap">
                    <div class="user-login-info">
                        <input type="text" class="form-control" name="login" placeholder="Login" required autofocus="" />
                        <input type="password" name="password" class="form-control" placeholder="Senha" required />
                    </div>
                    <div class="alert alert-block alert-danger <?php echo (!isset($error) ? 'hide' : 'fade in'); ?>">
                        <?php if (isset($error)) echo $error; ?>
                    </div>
                    <a id="modalForgot" data-toggle="modal" href="#forgotPassword">Esqueceu a senha?</a>
                    <button class="btn btn-lg btn-login btn-block" type="submit">Entrar</button>
                </div>  
            </form>
        </div> <!-- /container -->

        <div aria-hidden="true" aria-labelledby="forgotPassword" role="dialog" tabindex="-1" id="forgotPassword" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form class="form-forgot" id="forgot" action="/admin/login/forgotPassword" method="post">
                        <div class="modal-header">
                            <a href="#" class="close" data-dismiss="modal" aria-hidden="true">&times;</a>
                            <h4 class="modal-title">Recuperar a senha</h4>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-block alert-danger <?php echo (!isset($error_forgot) ? 'hide' : 'fade in'); ?>">
                                <?php if (isset($error_forgot)) echo $error_forgot; ?>
                            </div>
                            <div class="alert alert-block alert-success <?php echo (!isset($success_forgot) ? 'hide' : 'fade in'); ?>">
                                <?php if (isset($success_forgot)) echo $success_forgot; ?>
                            </div>
                            <div>
                                <p>Digite o seu email para receber um link de recuperação de senha.</p>
                                <input type="email" name="email" placeholder="Email" autocomplete="on" class="form-control placeholder-no-fix" autofocus="" required="" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>

