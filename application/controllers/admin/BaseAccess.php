<?php

/**
 * Class BaseAccess
 * Version 0.1
 **/
class BaseAccess extends CI_Controller
{
    var $acl = "";
    function __construct()
    {
        parent::__construct();
        
        if (!$this->session->userdata('admin')) {
            redirect('admin/login');
        }
        
        $this->makeMenu();
        $this->access_check($this->acl);
    }
    
    protected function access_check($acl)
    {
        if (array_key_exists($this->acl, $this->session->userdata('user_access')) && !$this->session->userdata('user_access')->$acl) {
            echo $this->load->view("admin/acesso_negado", $this->data, true);
            exit();
        }
    }
    
    protected function makeMenu()
    {
        $this->data['menu'] = $this->session->userdata('user_access');
        unset($this->data['menu']->IDAdm);
        unset($this->data['menu']->telefone);
        unset($this->data['menu']->cargo);
        unset($this->data['menu']->subnivel);
        unset($this->data['menu']->somente_slns);
    }

}
