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
                        <img src="<?php echo base_url() ?>assets/admin/images/logo.png" alt="Sua Franqia" class="img-responsive">
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
                            <?php if ($menu->acessaDashboard): ?>
                            <li>
                                <a id="painel" href="<?php echo site_url('admin/painel') ?>" class="<?php echo ($menu_active == 'painel' ? 'active' : '') ?>">
                                    <i class="fa fa-dashboard"></i>
                                    <span>Painel</span>
                                </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaFranquias): ?>
                            <li>
                                <a id="franquias" href="<?php echo site_url('admin/franquias') ?>" class="<?php echo ($menu_active == 'franquias' ? 'active' : '') ?>">
                                    <i class="ico-office"></i>
                                    <span>Franquias</span>
                                </a>
                            </li>
                            <?php endif; ?>

                            <?php if ($menu->acessaClassificados): ?>
                            <li>
                                <a id="classificados" href="<?php echo site_url('admin/classificados') ?>" class="<?php echo ($menu_active == 'classificados' ? 'active' : '') ?>">
                                    <i class="fa fa-newspaper-o"></i>
                                    <span>Classificados</span>
                                </a>
                            </li>
                            <?php endif; ?>

                            <?php if ($menu->acessaLiberarCadastros): ?>
                            <li>
                              <a id="relatorios" href="<?php echo site_url('admin/leads') ?>"  class="<?php echo ($menu_active == 'leads' ? 'active' : '') ?>">
                                <i class="fa fa-users"></i>
                                <span>Cadastros</span>
                              </a>
                            </li>
                            <li>
                              <a id="relatorios" href="<?php echo site_url('admin/aprovarLeads') ?>"  class="<?php echo ($menu_active == 'aprovar_leads' ? 'active' : '') ?>">
                                <i class="fa fa-user-plus"></i>
                                <span>Aprovar Cadastros</span> <span class="badge bg-important" id="aprovarLeads_total"></span>
                              </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaBanners): ?>
                            <li>
                              <a id="relatorios" href="<?php echo site_url('admin/banners') ?>"  class="<?php echo ($menu_active == 'banners' ? 'active' : '') ?>">
                                <i class="ico-images"></i>
                                <span>Banners</span> 
                              </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaUsuarios): ?>
                            <li>
                              <a id="relatorios" href="<?php echo site_url('admin/usuarios') ?>"  class="<?php echo ($menu_active == 'usuarios' ? 'active' : '') ?>">
                                <i class="fa fa-user"></i>
                                <span>Usuários</span> <span class="badge bg-important" id="usuarios"></span>
                              </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaSegmentos): ?>
                            <li class="sub-menu">
                                <a href="javascript:;" class="<?php echo ($menu_active == 'ramos' || $menu_active=='segmentos' ? 'active' : '')?>">
                                    <i class="fa fa-th"></i>
                                    <span>Segmentos e Ramos</span>
                                </a>
                                <ul class="sub">
                                    <li class="<?php echo ($menu_active == 'segmentos' ? 'active' : '') ?>" ><a href="<?php echo site_url('admin/segmentos') ?>">Segmentos</a></li>
                                    <li class="<?php echo ($menu_active == 'ramos' ? 'active' : '') ?>"><a href="<?php echo site_url('admin/ramos') ?>">Ramos</a></li>
                                </ul>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaConteudo): ?>
                            <li class="sub-menu">
                                <a href="javascript:;" class="<?php echo ($menu_active == 'conteudo' ? 'active' : '')?>">
                                    <i class="fa fa-pencil-square-o"></i>
                                    <span>Conteúdo</span>
                                </a>
                                <ul class="sub">
                                    <li>
                                    <a href="<?php echo site_url('admin/conteudo') ?>"  class="">
                                        <span>Todos</span>
                                      </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo site_url('admin/categorias') ?>"  class="">
                                            <span>Categorias</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="<?php echo site_url('admin/subcategorias') ?>"  class="">
                                            <span>Subcategorias</span>
                                        </a>
                                    </li>

                                    <?php 
                                        $lista_menu = $this->menu->montaMenu();
                                        foreach($lista_menu as $item_menu =>$array_sub):?>
                                        <li>
                                          <a id="relatorios" href="#"  class="">
                                            <span><?php echo $item_menu;?></span>
                                          </a>
                                          <ul class="sub">
                                            <?php foreach($array_sub as $sub_chave => $sub_valor):?>
                                                <li class="" ><a href="<?php echo site_url("admin/conteudo/listar/{$sub_chave}") ?>"><?php echo $sub_valor;?></a></li>
                                            <?php endforeach;?>
                                          </ul>
                                        </li>
                                    <?php endforeach;?>
                                    <li><a href="<?php echo site_url('admin/paginasEstaticas') ?>"><span>Páginas Estáticas</span></a></li>
                                </ul>
                            </li>
                            <?php endif; ?>

                            <?php if ($menu->acessaConteudo): ?>
                            <li class="sub-menu">
                                <a href="javascript:;" class="<?php echo ($menu_active == 'conteudo_shopping' ? 'active' : '')?>">
                                    <i class="fa fa-pencil-square-o"></i>
                                    <span>Conteúdo Shopping</span>
                                </a>
                                <ul class="sub">
                                    <?php 
                                        $lista_menu = $this->menu->montaMenuShopping();
                                        foreach($lista_menu as $item_menu =>$array_sub):?>
                                        <li>
                                          <a id="relatorios" href="#"  class="">
                                            <span><?php echo $item_menu;?></span>
                                          </a>
                                          <ul class="sub">
                                            <?php foreach($array_sub as $sub_chave => $sub_valor):?>
                                                <li class="" ><a href="<?php echo site_url("admin/conteudo_shopping/listar/{$sub_chave}") ?>"><?php echo $sub_valor;?></a></li>
                                            <?php endforeach;?>
                                          </ul>
                                        </li>
                                    <?php endforeach;?>
                                    <li><a href="<?php echo site_url('admin/paginasEstaticas') ?>"><span>Páginas Estáticas</span></a></li>
                                </ul>
                            </li>
                            <?php endif; ?>

                            <?php if ($menu->acessaEstatisticas): ?>
                           <li class="sub-menu">
                                <a href="javascript:;" class="<?php echo ($menu_active == 'relatorios' ? 'active' : '')?>">
                                    <i class="fa fa-bar-chart"></i>
                                    <span>Relatórios</span>
                                </a>
                                <ul class="sub">
                                    <li><a href="<?php echo site_url('admin/relatorios/visitas') ?>">Visitas</a></li>
                                    <li><a href="<?php echo site_url('admin/relatorios/leads/') ?>">Leads</a></li>
                                    <li><a href="<?php echo site_url('admin/relatorios/banners') ?>">Banner</a></li>
                                    <li><a href="<?php echo site_url('admin/relatorios/franquias') ?>">Franquias Ativas/Inativas</a></li>
                                </ul>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaConteudo): ?>
                            <li>
                              <a id="relatorios" href="<?php echo site_url('admin/arquivos_downloads') ?>"  class="<?php echo ($menu_active == 'arquivos_downloads' ? 'active' : '') ?>">
                                <i class="ico-download"></i>
                                <span>Arquivos para Download</span> 
                              </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaSac): ?>
                            <li>
                              <a id="suporte" href="<?php echo site_url('admin/suporte') ?>"  class="<?php echo ($menu_active == 'suporte' ? 'active' : '') ?>">
                                <i class="fa fa-envelope"></i>
                                <span>Contatos</span> 
                                <span class="badge bg-important" id="suporte_total"></span>
                              </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaConteudo): ?>
                            <li>
                              <a id="suporte" href="<?php echo site_url('admin/mural') ?>"  class="<?php echo ($menu_active == 'mural' ? 'active' : '') ?>">
                                <i class="fa fa-warning"></i>
                                <span>Mural</span> 
                              </a>
                            </li>
                            <?php endif; ?>

                            <?php if ($menu->acessaConteudo): ?>
                            <li>
                              <a  href="<?php echo site_url('admin/termos') ?>"  class="<?php echo ($menu_active == 'termos' ? 'active' : '') ?>">
                                <i class="fa fa-pencil-square-o"></i>
                                <span>Termos de Uso do Portal</span> 
                              </a>
                            </li>
                            <?php endif; ?>


                            <?php if ($menu->acessaTv): ?>
                            <li>
                                <a href="<?php echo site_url('admin/tv') ?>" class="<?php echo ($menu_active == 'tv' ? 'active' : '') ?>">
                                    <i class="fa fa-tv"></i>
                                    <span>Sua Franquia TV</span>
                                </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaMinutoConhecimento): ?>
                            <li>
                                <a href="<?php echo site_url('admin/minuto') ?>" class="<?php echo ($menu_active == 'minuto' ? 'active' : '') ?>">
                                    <i class="ico-tv"></i>
                                    <span>Minuto do Conhecimento</span>
                                </a>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaLoja): ?>
                           <li class="sub-menu">
                                <a href="javascript:;" class="<?php echo ($menu_active == 'loja' ? 'active' : '')?>">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span>Loja</span>
                                </a>
                                <ul class="sub">
                                    <li><a href="<?php echo site_url('admin/loja_categorias') ?>">Categorias</a></li>
                                    <li><a href="<?php echo site_url('admin/loja_produtos') ?>">Produtos</a></li>
                                    <li><a href="<?php echo site_url('admin/loja_slides') ?>">Slide Show</a></li>
                                    <li><a href="<?php echo site_url('admin/loja_pedidos') ?>">Pedidos</a></li>
                                </ul>
                            </li>
                            <?php endif; ?>
                            <?php if ($menu->acessaEmpresas): ?>
                            <li>
                                <a href="<?php echo site_url('admin/fornecedores') ?>" class="<?php echo ($menu_active == 'fornecedores' ? 'active' : '') ?>">
                                    <i class="fa fa-building"></i>
                                    <span>Fornecedores / Parceiros</span>
                                </a>
                            </li>
                            <?php endif; ?>
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
