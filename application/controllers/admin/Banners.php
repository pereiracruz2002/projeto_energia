<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once(dirname(__FILE__) . '/BaseCrud.php');
class Banners extends BaseCrud 
{
    var $acl = "acessaBanners";
    var $upload_data = false;
    var $modelname = 'banner'; /* Nome do model sem o "_model" */
    var $base_url = 'admin/banners';
    var $actions = 'CRUD';
    var $titulo = 'Banners';
    var $tabela = 'nome,IDTipo,data_inicio,data_fim,status';
    var $campos_busca = 'nome,IDTipo,data_inicio,data_fim,status';
    var $order = array('nome'=>"ASC");
    var $selects = "banner.*, banner_tipo.nome as IDTipo, DATE_FORMAT(sf_banner.data_inicio, '%d/%m%Y') as data_inicio, DATE_FORMAT(sf_banner.data_fim, '%d/%m/%Y') as data_fim, IF(sf_banner.status=1, 'Ativo', 'Inativo') as status";
    var $joins = array('banner_tipo' => 'banner_tipo.IDTipo=banner.IDTipo');
    var $upload_path = 'views/sources/arquivos/';

    public function __construct() 
    {
        $this->data['menu_active'] = 'banners';
        parent::__construct();
    }

    public function _filter_pre_listar(&$where, &$like) 
    {
        if(isset($like['banner.IDTipo'])){
            $where['banner.IDTipo'] = $like['banner.IDTipo'];
            unset($like['banner.IDTipo']);
        }
        $this->load->model('banner_tipo_model','banner_tipo');
        $tipos = $this->banner_tipo->get_all()->result();
        $this->model->fields['IDTipo']['values'][''] = '--Posição--';
        foreach ($tipos as $item) {
            $this->model->fields['IDTipo']['values'][$item->IDTipo] = $item->nome;
        }
    }

    public function _pre_form(&$model) 
    {
        $this->load->model('banner_tipo_model','banner_tipo');
        $this->load->model('franquias_model','franquias');
        $this->load->model('pagina_model','paginas');
        $this->db->order_by('nome', 'asc');
        $tipos = $this->banner_tipo->get_all()->result();
        $this->model->fields['IDTipo']['values'][''] = '--Posição--';
        foreach ($tipos as $item) {
            $model->fields['IDTipo']['values'][$item->IDTipo] = $item->nome;
        }

        $this->db->order_by('nomeFantasia', 'asc');
        $franquias = $this->franquias->get_where(array('status' => 1))->result();
        foreach ($franquias as $item) {
            $model->fields['IDFranquia']['values'][$item->IDFranquia] = $item->nomeFantasia;
        }

        $this->db->order_by('id_pagina', 'asc');
        $paginas = $this->paginas->get_all()->result();
        foreach ($paginas as $pagina) {
            $model->fields['id_pagina']['values'][$pagina->id_pagina] = $pagina->pagina;
        }

    }

    public function _filter_pre_delete($IDBanner) 
    {
        $banner = $this->model->get($IDBanner)->row();
        if(file_exists(FCPATH.$banner->file)){
            unlink(FCPATH.$banner->file);
        }
        $this->model->delete($IDBanner);
        $this->db->delete('banner_click', array('IDBanner' => $IDBanner));
        $this->db->delete('banner_visualizacao_report', array('IDBanner' => $IDBanner));
        $this->db->delete('banner_visualizacao', array('IDBanner' => $IDBanner));
        return true; 
    }


    public function remove($IDBanner) 
    {
        $this->load->model('Banner_model','banners');
        $banner = $this->banners->get($IDBanner)->row();
        if(file_exists(FCPATH.$banner->file)){
            unlink(FCPATH.$banner->file);
        }
        $this->banners->delete($IDBanner);
        $this->db->delete('banner_click', array('IDBanner' => $IDBanner));
        $this->db->delete('banner_visualizacao_report', array('IDBanner' => $IDBanner));
        $this->db->delete('banner_visualizacao', array('IDBanner' => $IDBanner));
        $this->output->set_content_type('application/json')
                     ->set_output(json_encode(array('status' => 1)));
    }

    public function _filter_pre_save(&$data) 
    {
        if($this->upload_data){
            $data['file'] = $this->upload_data;
        }
    }

    public function uploadBanner() 
    {
        $this->load->library('upload');
        if(isset($_FILES['file']) and $_FILES['file']['name']){
            $config['upload_path'] = 'views/sources/images/banners/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['max_size'] = '300000';
            $config['encrypt_name'] = true;
            $this->upload->initialize($config);

            if($this->upload->do_upload('file')){
                $data = $this->upload->data();

                if($this->tipo_data){
                    $config_img['image_library'] = 'gd2';
                    $config_img['source_image'] = $data['full_path'];
                    $config_img['maintain_ratio'] = false;
                    $config_img['width']  = $this->tipo_data->width;
                    $config_img['height'] = $this->tipo_data->height;
                    $this->load->library('image_lib', $config_img);
                    $this->image_lib->resize();
                    img_compress($data['full_path']);
                }

                $this->upload_data = $config['upload_path'].$data['file_name'];
                return true;
            } else {
                $this->form_validation->set_message('uploadBanner', $this->upload->display_errors());
                return false;
            }
        }
        return true;
    }

    public function getPosicao($id_pagina){
        $this->load->model('Banner_tipo_model','banner_tipo');
        $posicoes = $this->banner_tipo->retornaPosicao($id_pagina);
        foreach ($posicoes as $posicao)
        $html.= '<option value="'.$posicao->IDTipo.'">'.$posicao->nome.'</option>';
        $this->output->set_output($html);
        
    }
}
