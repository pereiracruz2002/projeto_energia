<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
include_once(dirname(__FILE__) . '/BaseCrud.php');

class Arquivos_downloads extends BaseCrud
{
    var $acl = "acessaConteudo";
    var $modelname = 'arquivos_downloads'; /* Nome do model sem o "_model" */
    var $base_url = 'admin/arquivos_downloads';
    var $actions = 'CRUD';
    var $titulo = 'Arquivos para Download';
    var $tabela = 'nome,arquivo';
    var $campos_busca = 'nome';
    var $order = array('nome'=>"ASC");
    var $upload_path = 'arquivos/';

   
    public function __construct() {
        $this->data['menu_active'] = 'arquivos_downloads';
        parent::__construct();
    }

    public function _filter_pre_save(&$data) 
    {
        if($this->upload_data){
            $data['arquivo'] = $this->upload_data;
        }
    }

    public function _filter_pre_read($data) 
    {
        if($data){
            foreach ($data as $item) {
                $item->arquivo = '<a href="'.base_url().$item->arquivo.'" class="btn btn-xs btn-primary" target="_blank">Download</a>';
            }
        }
    }

    public function uploadArquivo() 
    {
        $this->load->library('upload');
        if($_FILES['arquivo']['name']){
            $config['upload_path'] = $this->upload_path;
            $config['allowed_types'] = 'gif|jpg|png|doc|docx|pdf|xls|xlsx|ppt|zip';
            $config['max_size'] = '300000';
            $config['encrypt_name'] = true;
            $this->upload->initialize($config);

            if($this->upload->do_upload('arquivo')){
                $data = $this->upload->data();
                $this->upload_data = $config['upload_path'].$data['file_name'];
                return true;
            } else {
                $this->form_validation->set_message('uploadArquivo', $this->upload->display_errors());
                return false;
            }
        }
        return true;
    }

    public function _filter_pre_delete($id) 
    {
        $arquivo = $this->model->get($id)->row();
        if(file_exists(FCPATH.$arquivo->arquivo)){
            unlink(FCPATH.$arquivo->arquivo);
        }
        return true;
    }
}
