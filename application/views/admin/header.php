<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex, nofollow">
        <title>Administrativo <?php echo (isset($title) ? " - " . $title : "") ?></title>
        <link href="<?php echo base_url() ?>assets/admin/bs3/css/bootstrap.min.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/admin/css/bootstrap-reset.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/admin/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
        <link href="<?php echo base_url() ?>assets/admin/css/table-responsive.css" rel="stylesheet" />
        <link rel="icon" href="<?php echo base_url() ?>assets/admin/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="<?php echo base_url() ?>assets/admin/images/favicon.ico" type="image/x-icon" />
        <link href="<?php echo base_url() ?>assets/admin/css/style.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/admin/css/style-responsive.css" rel="stylesheet" />
        <link href="<?php echo base_url() ?>assets/admin/js/select2/select2.css" rel="stylesheet">
        <?php
        if (isset($cssFiles)):
            foreach ($cssFiles as $v):
                ?>
                <link rel="stylesheet" type="text/css"  href="<?php echo base_url() ?>assets/admin/css/<?php echo $v ?>">
                <?php
            endforeach;
        endif;
        ?>
        <script>var base_url = '<?php echo site_url('admin') ?>/';</script> 
        <script>var base = '<?php echo base_url() ?>';</script>

    </head>
    <body>
        <section id="container" >
            <?php if (!isset($webshot)): ?>

            <header class="header fixed-top clearfix">
                <div class="brand">
                    <a href="/admin/painel" class="logo">
                        <!--<img src="<?php echo base_url() ?>assets/admin/images/logo.png" alt="Sua Franqia" class="img-responsive">-->
                    </a>
                    <div class="sidebar-toggle-box">
                        <div class="fa fa-bars"></div>
                    </div>
                </div>

                <div class="top-nav clearfix">
                    <ul class="nav pull-right top-menu">
                        <li>
                            <form method="post" action="<?php echo site_url('admin/franquias') ?>"><input type="text" class="form-control search" name="franquias" placeholder="Procurar Franquia"></form>
                        </li>
                        <li class="dropdown">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="picture"><i class="fa fa-user"></i></span>
                                <span class="username"><?php echo $this->session->userdata('admin')->nome ?></span>
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu extended logout">
                                <?php /* <li><a href="<?php echo site_url('admin/configuracoes') ?>"><i class="fa fa-cog"></i> Configurações</a></li> */ ?>
                                <li><a href="<?php echo site_url('admin/login/logout') ?>"><i class="fa fa-key"></i> Sair</a></li>
                            </ul>
                        </li>
                        <!-- user login dropdown end -->
                    </ul>
                    <!--search & user info end-->
                </div>
            </header>
            <!--header end-->
            <aside>

                <div id="sidebar" class="nav-collapse">
                    <!-- sidebar menu start-->            
                    <div class="leftside-navigation">
                        <ul class="sidebar-menu" id="nav-accordion">
                            
                            <li>
                                <a id="painel" href="<?php echo site_url('admin/painel') ?>" class="<?php echo ($menu_active == 'painel' ? 'active' : '') ?>">
                                    <i class="fa fa-dashboard"></i>
                                    <span>Painel</span>
                                </a>
                            </li>
                            
                             <li>
                              <a id="relatorios" href="<?php echo site_url('admin/arquivos_downloads') ?>"  class="<?php echo ($menu_active == 'arquivos_downloads' ? 'active' : '') ?>">
                                <i class="ico-download"></i>
                                <span>Arquivos para Upload</span> 
                              </a>
                            </li>
                            

                            <?php /*if ($menu->acessaClassificados):  ?>
                            <li>
                                <a id="classificados" href="<?php echo site_url('admin/classificados') ?>" class="<?php echo ($menu_active == 'classificados' ? 'active' : '') ?>">
                                    <i class="fa fa-newspaper-o"></i>
                                    <span>Classificados</span>
                                </a>
                            </li>
                            <?php endif; */?>

                        </ul>
                    </div>        
                    <!-- sidebar menu end-->
                </div>
            </aside>
            <!--sidebar end-->
            <!--main content start-->
            <section id="main-content">
                <section class="wrapper">
        <?php else: ?>
            <section id="webshot-content">
                <section class="webshot-wrapper">
        <?php endif; ?>
