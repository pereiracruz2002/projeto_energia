<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class User_model extends MY_Model
{
    var $id_col = 'IDUser';
    var $table = 'usuario';


    var $fields = array(
        'login' => array(
            'type' => 'text',
            'label' => 'Login',
            'rules' => 'required|callback_uniqLogin',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),
        'senha' => array(
            'type' => 'password',
            'label' => 'Senha',
            'rules' => 'required',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),        
        'nome' => array(
            'type' => 'text',
            'label' => 'Nome',
            'rules' => 'required',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),        
        'email' => array(
            'type' => 'email',
            'label' => 'Email',
            'rules' => 'required|valid_email',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),


        'IDPais' => array(
            'type' => 'select',
            'label' => 'País',
            'rules' => '',
            'class' => '',
            'values' => array(),
        ),

        
        'status' => array(
            'type' => 'select',
            'label' => 'Status',
            'class' => '',
            'rules' => 'required',
            'values' => array(
                "" => "Selecione um status",
                "1" => "Ativo",
                "0" => "Inativo",
            ),
            'empty' => '--Selecine um status--',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),

        'aceitou_termo' => array(
            'type' => 'select',
            'label' => 'Aceitou o termo',
            'class' => '',
            'rules' => 'required',
            'values' => array(
                "" => "Selecione um status",
                "1" => "Sim",
                "0" => "Não",
            ),
            'empty' => '--Selecine um status--',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),
        'nivel' => array(
            'type' => 'select',
            'label' => 'Tipo de Usuário',
            'class' => '',
            'rules' => 'required',
            'values' => array(
                "" => "Selecione um nível",
                "1" => "Administrador",
                "2" => "Cliente",
                "3" => "Franqueador",
                "4" => "Colunista",
            ),
            'empty' => '--Selecine um status--',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
        ),        
    );

    public function __construct() 
    {
        parent::__construct();
    }

    public function _filter_pre_save(&$data) 
    {
        if(isset($data['senha'])){
            if ($data['senha'] == "")
                unset ($data['senha']);
            else
                $data['senha'] = md5($data['senha']);
        }
    }
    
    public function checkEmail($where)
    {
        $this->db->select("IDUser, email, nome, login");
        $user_data = $this->db->get_where($this->table, $where)->row();
        return $user_data;
    }

    public function getColunistas() 
    {
        $this->db->join('usuario_colunista', 'usuario_colunista.IDCol=usuario.IDUser');
        return $this->get_all()->result();
    }
    
    public function getUsuarioFranqueador($where)
    {
        $this->db->select("usuario.IDUser, usuario.nome, usuario.email");
        $this->db->join("usuario_franqueador", "usuario_franqueador.IDFranqueador=usuario.IDUser");
        return $this->get_where($where)->row();
    }

    public function login($where) 
    {
         $output = array('status' => 0, 'msg' => 'Login não encontrado');
         $this->db->join('usuario_cliente', 'usuario_cliente.IDCli=usuario.IDUser');
        $usuario_comum = $this->get_where($where)->row();
        if($usuario_comum){
            $this->session->set_userdata('nome_usuario', $usuario_comum->nome);
            unset($usuario_comum->senha);
            $output = array('status' => 1, 'tipo' => 'cliente', 'dados' => $usuario_comum);
        } else {
            $this->load->model('mural_model','mural');
            $this->db->join('usuario_franqueador', 'usuario_franqueador.IDFranqueador=usuario.IDUser')
                     ->join('franquia', 'franquia.IDFranqueador=usuario.IDUser');
            $franqueador = $this->get_where($where)->row();
            if($franqueador){
                if ($franqueador->status == 1) {
                    $output['tipo'] = 'franqueador';
                    unset($franqueador->senha);
                    $this->db->order_by('data', 'desc')->limit(5);
                    $this->db->join('franquia','franquia.IDFranquia=mural.IDFranquia','left');
                    $this->db->join('franquia_ramo','franquia_ramo.IDRamo=mural.IDRamo','left');
                    $this->db->join('franquia_segmento','franquia_segmento.IDSeg=mural.IDSeg','left');
                    $data['mural'] = $this->mural->get_where(array('mural.IDFranquia'=>$user->IDFranquia,'mural.IDRamo'=>$user->IDRamo,'mural.status'=>1))->result();

                    $franqueador->mural = $data['mural'];
                    $this->session->set_userdata('franqueador', $franqueador);
                    $output['dados'] = $franqueador;
                    $output = array('status' => 1, 'tipo' => 'franqueador', 'dados' => $franqueador);
                } else {
                    $output = array('status' => 0, 'msg' => 'Usuário desabilitado');
                }
            }

        }
        return $output;
    }
}
