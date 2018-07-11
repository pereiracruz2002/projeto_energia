<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
require_once(dirname(__FILE__)."/BaseAccess.php");

class Painel extends BaseAccess
{
    var $acl = "acessaDashboard";
    var $data = array();
    
    public function __construct()
    {
        $this->data['menu_active'] = 'painel';
        parent::__construct();
    }
    
    public function index($de = null, $ate = null)
    {
        // $this->load->model('franquia_contato_model','franquia_contato');
        // $this->load->model('franquia_contato_dadoscandidato_model','franquia_contato_dadoscandidato');
        // $this->load->model('franquias_model','franquias');
        // $this->load->library('lib_analytics');
        
        // if ($de && $ate) {
        //     $this->data['where']['de'] = $de;
        //     $this->data['where']['ate'] = $ate;
        //     $this->data['statsAnalytics'] = $this->lib_analytics->getStatsSite(date("Y-m-d", strtotime($de)), date("Y-m-d", strtotime($ate)));
        // } else {
        //     $this->data['statsAnalytics'] = $this->lib_analytics->getStatsSite();
        // }
        
        // $this->data['chartVisitas_data'] = array();
        // $this->data['chartPageViews_data'] = array();
        // foreach ($this->data['statsAnalytics']['secoes'] as $key => $item) {
        //     $this->data['chartVisitas_data'][ucfirst($key)] = (int) $item['total_sessions'];
        //     $this->data['chartPageViews_data'][ucfirst($key)] = (int) $item['total_pageviews'];
        // }
        // $this->data['statsAnalytics']['secoes'] = order_array_num($this->data['statsAnalytics']['secoes'], 'total_sessions', 'DESC');

        // $where_contato = array(
        //     'data >=' => isset($de)? date('Y-m-d', strtotime($de)) : date('Y-m-d', strtotime('-30 days')),
        //     'data <=' => isset($ate)? date('Y-m-d', strtotime($ate)) : date('Y-m-d'),
        //     'status' => 1
        // );
        // $where_contato_dados = array(
        //     'franquia_contato.data >=' => isset($de)? date('Y-m-d', strtotime($de)) : date('Y-m-d', strtotime('-30 days')),
        //     'franquia_contato.data <=' => isset($ate)? date('Y-m-d', strtotime($ate)) : date('Y-m-d'),
        //     'franquia_contato.status' => 1
        // );

        // $where_contato_dadoscandidato = array(
        //     'franquia_contato_dadoscandidato.data >=' => isset($de)? date('Y-m-d', strtotime($de)) : date('Y-m-d', strtotime('-30 days')),
        //     'franquia_contato_dadoscandidato.data <=' => isset($ate)? date('Y-m-d', strtotime($ate)) : date('Y-m-d')
        // );



        // // $this->db->join('franquia_contato', 'franquia_contato.IDDados=franquia_contato_dadoscandidato.IDDados');

        // $this->data['total_leads_unicos'] = $this->franquia_contato_dadoscandidato->count_where($where_contato_dadoscandidato);
        

        // $this->data['total_leads'] = $this->franquia_contato->count_where($where_contato);

 
        // $this->data['ranking'] = $this->franquias->rankingAll($where_contato);

        // $this->db->select("IF(status = 1, 'Ativos', 'Inativos') as Status, count(*) as total")->group_by('Status');
        // $franquias_result = $this->franquias->get_all()->result();
        // $this->data['chartFranquias_data'] = array();
        // foreach ($franquias_result as $item) {
        //     $this->data['chartFranquias_data'][$item->Status] = $item->total;
        // }

        

        $this->data['title'] = "Painel";
        $this->data['jsFiles'] = array('palette.js', 'Chart.bundle.min.js', 'moment.min.js', 'daterangepicker.js', 'daterange-pt-BR.js', 'painel_relatorio.js' );
        $this->data['cssFiles'] = array('daterangepicker.css');
        
//        echo "<pre>";
//        print_r($this->data);
        $this->load->view("admin/painel", $this->data);
    }

    public function getBanners($de = null, $ate = null) 
    {
        $this->load->model('banner_model','banners');
        $where = array(
            'data >=' => isset($de)? date('Y-m-d', strtotime($de)) : date('Y-m-d', strtotime('-30 days')),
            'data <=' => isset($ate)? date('Y-m-d', strtotime($ate)) : date('Y-m-d')
        );

        $this->db->select("IDBanner as mID, 
                           banner.nome, 
                           banner_tipo.nome as posicao")
                 ->select("(SELECT COUNT(*) FROM sf_banner_click WHERE IDBanner = mID AND data >= '".$where['data >=']."' AND data <= '".$where['data <=']."') as clicks")
                 ->select("(SELECT SUM(views) FROM sf_banner_visualizacao_report WHERE IDBanner = mID AND data >= '".$where['data >=']."' AND data <= '".$where['data <=']."') as views")
                 ->join('banner_tipo', 'banner_tipo.IDTipo=banner.IDTipo')
                 ->order_by('clicks', 'desc');
        $banners = $this->banners->get_where(array('status' => 1))->result();
        $this->output->set_content_type('application/json')
                     ->set_output(json_encode($banners));
    }

}
