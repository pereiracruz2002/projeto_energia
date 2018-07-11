<?php include_once(dirname(__FILE__) . '/header.php'); ?>

<header class="page-header">
    <div class="panel">
        <div class="input-group">
            <input type="text" class="input-sm form-control" name="date-range-picker" />
            <span class="input-group-addon">
                <i class="fa fa-calendar"></i>
            </span>
            <input type="hidden" name="IDFranquia" value="<?php echo $this->uri->segment(4) ?>" />
            <input type="hidden" name="de" value="<?php echo isset($where['de'])? date('d-m-Y', strtotime($where['de'])) : date('d-m-Y', strtotime('-1 month')) ?>" />
            <input type="hidden" name="ate" value="<?php echo isset($where['ate'])? date('d-m-Y', strtotime($where['ate'])) :date('d-m-Y') ?>" />
        </div>
    </div>
    <div class="pull-right col-sm-8">
        <div class="col-sm-4">
            <span class="mini-stat-icon pink"><i class="ico-users"></i></span>
            <div class="mini-stat-info">
                <span><?php echo number_format($total_leads_unicos, 0, '', '.') ?></span>
                Cadastros Únicos 
            </div>
        </div>
        <div class="col-sm-4">
            <span class="mini-stat-icon orange"><i class="fa fa-users"></i></span>
            <div class="mini-stat-info">
                <span><?php echo number_format($statsAnalytics['total']['sessions'], 0, '', '.') ?></span>
                Visitas
            </div>
        </div>
        <div class="col-sm-4">
            <span class="mini-stat-icon tar"><i class="fa fa-eye"></i></span>
            <div class="mini-stat-info">
                <span><?php echo number_format($statsAnalytics['total']['pageviews'], 0, '', '.') ?></span>
                PageViews
            </div>
        </div>
    </div>
    <h2>Sua Franquia</h2>
    <?php /*<small class="mute">Dados do dia <?php echo date('d/m/Y', strtotime('-30 days')) ?> até hoje</small> */ ?>
</header>

<div class="panel">
    <div class="panel-heading"><i class="fa fa-pie-chart"></i> Acessos por conteúdos</div>
    <div class="panel-body">
        <div class="col-sm-4">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Seção</th>
                        <th>Visitas</th>
                        <th>PageViews</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($statsAnalytics['secoes'] as $key => $item): ?>
                        <tr>
                            <td><?php echo ucfirst($key) ?></td>
                            <td><?php echo number_format($item['total_sessions'], 0, '', '.') ?></td>
                            <td><?php echo number_format($item['total_pageviews'], 0, '', '.') ?></td>
                            <td><a href="#modal_<?php echo $key ?>" class="detalhes_visitas"><i class="fa fa-external-link"></i></a></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php foreach ($statsAnalytics['secoes'] as $key => $item): ?>
                <div class="modal fade" tabindex="-1" role="dialog" id ="modal_<?php echo $key ?>">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title"><?php echo ucfirst($key) ?></h4>
                            </div>
                            <div class="modal-body">
                                <div class="overflow-modal">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>URL</th>
                                                <th>Visitas</th>
                                                <th>PageViews</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($item as $path => $total): ?>
                                                <?php if (!in_array($path, array('total_pageviews', 'total_sessions'))): ?>
                                                    <tr>
                                                        <td><?php echo $path ?></td>
                                                        <td><?php echo number_format($total['sessions'], 0, '', '.') ?></td>
                                                        <td><?php echo number_format($total['pageviews'], 0, '', '.') ?></td>
                                                    </tr>
                                                <?php endif; ?>
                                            <?php endforeach; ?>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>Total:</td>
                                                <td><?php echo number_format($item['total_sessions'], 0, '', '.') ?></td>
                                                <td><?php echo number_format($item['total_pageviews'], 0, '', '.') ?></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
            <?php endforeach; ?>
        </div> 

        <div class="col-sm-8">
            <div class="col-sm-6">
                <div class="chart-container" style="position: relative; height:300px;">
                    <script>
                        var chartVisitas_data = <?php echo json_encode($chartVisitas_data); ?>;
                    </script>
                    <canvas id="chartVisitas"></canvas>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="chart-container" style="position: relative; height:300px;">
                    <script>
                        var chartPageViews_data = <?php echo json_encode($chartPageViews_data); ?>;
                    </script>
                    <canvas id="chartPageViews"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-3">
        <div class="panel">
            <div class="panel-heading">
                <i class="ico-user-plus"></i> Total de Cadastros
            </div>
            <div class="panel-body">
                <h1 class="text-center"><?php echo number_format($total_leads, 0, '', '.') ?></h1>
            </div>
        </div>
        <div class="panel">
            <div class="panel-heading">
                <i class="fa fa-facebook"></i> Fãs no Facebook 
            </div>
            <div class="panel-body">
                <h3 class="text-center"><?php echo number_format($fan_count, 0, '', '.') ?></h3>
            </div>
        </div>
    </div>

    <div class="col-sm-6">
        <div class="panel">
            <div class="panel-heading"><i class="ico-podium"></i> Ranking das franquias</div>
            <div class="panel-body">
                <div class="overflow-widget">
                    <table class="table table-stripped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Franquia</th>
                                <th>Leads</th>
                                <th>Seg</th>
                                <th>Comp</th>
                                <th>Exc</th>
                                <th>Not</th>
                                <th>Ramo</th>
                                <th>Reg</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($ranking as $key => $item): ?>
                                <tr>
                                    <td><?php echo $key + 1 ?></td>
                                    <td><?php echo $item->nomeFantasia ?></td>
                                    <td><?php echo $item->cadastros ?></td>
                                    <td><?php echo $item->segmento ?></td>
                                    <td><?php echo $item->comparativo ?></td>
                                    <td><?php echo $item->pagina_exclusiva ?></td>
                                    <td><?php echo $item->noticias ?></td>
                                    <td><?php echo $item->ramo ?></td>
                                    <td><?php echo $item->regiao ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="col-sm-3">
        <div class="panel">
            <div class="panel-heading">
                <i class="ico-office"></i> Franquias
            </div>
            <div class="panel panel-body">
                <div class="chart-container" style="position: relative; height:225px;">
                    <script>
                        var chartFranquias_data = <?php echo json_encode($chartFranquias_data); ?>;
                    </script>
                    <canvas id="chartFranquias"></canvas>
                </div>           
            </div>
        </div>
    </div>
</div>


<?php include_once(dirname(__FILE__) . '/footer.php'); ?>
