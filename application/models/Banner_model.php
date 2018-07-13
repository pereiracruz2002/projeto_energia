<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Banner_model extends MY_Model
{
    var $id_col = 'IDBanner';
    var $fields = array(
        'IDFranquia' => array(
            'type' => 'select',
            'label' => 'Franquia',
            'rules' => 'required',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
            'values' => array('' => '--Nenhuma--') 
        ),

        'id_pagina' => array(
            'type' => 'select',
            'label' => 'Página',
            'rules' => '',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
            'values' => array('0' => '--Geral--'),
        ), 

        'IDTipo' => array(
            'type' => 'select',
            'label' => 'Tipo',
            'rules' => 'required',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
            'values' => array() 
        ),

        'nome' => array(
            'type' => 'text',
            'label' => 'Nome',
            'rules' => 'required',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),
        'link' => array(
            'type' => 'text',
            'label' => 'Link',
            'rules' => '',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),
        'file' => array(
            'type' => 'file',
            'label' => 'Arquivo',
            'rules' => 'callback_uploadBanner',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),
        'status' => array(
            'type' => 'select',
            'label' => 'Status',
            'rules' => '',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-4">',
            'append' => '</div>',
            'values' => array('Inativo', 'Ativo'),
        ), 
        'data_inicio' => array(
            'type' => 'date',
            'label' => 'Início da Publicação',
            'rules' => '',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),        
        'data_fim' => array(
            'type' => 'date',
            'label' => 'Fim da Publicação',
            'rules' => '',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),
    );

    public function getStats($where) 
    {

        $this->db->select('banner.IDBanner as mId, banner.nome, banner_tipo.nome as posicao')
                 ->select("(SELECT COUNT(*) FROM sf_banner_click WHERE IDBanner = mId AND data BETWEEN '".$where['de']."' AND '".$where['ate']."') as clicks")
                 ->select("(SELECT SUM(views) FROM sf_banner_visualizacao_report WHERE IDBanner = mId AND data BETWEEN '".$where['de']."' AND '".$where['ate']."') as views")
                 ->join('banner_tipo', 'banner_tipo.IDTipo=banner.IDTipo')
                 ->like('banner.nome', $where['nome']);
        $banners = $this->get_where(array('status' => 1))->result();
        return $banners;
    }

    public function getBannerFront($IDTipo) 
    {
        $url = '/';
        if(!empty($this->uri->segment(1))){
            $url = $this->uri->segment(1);
        }
        
        if(!empty($this->uri->segment(2))){
            if($url=="franquias"){
                if($this->uri->segment(2)=="segmento"){
                   $url.= "franquias/segmento";  
                }elseif ($this->uri->segment(2)=="investimento") {
                    $url.= "franquias/investimento"; 
                }elseif($this->uri->segment(2)=="area-interesse"){
                    $url.= "franquias/area-interesse";   
                }elseif($this->uri->segment(2)=="baratas"){
                    $url.= "franquias/baratas";
                }else{
                   $url.= "/detalhes"; 
                }
            }elseif($url=="loja"){
                if($this->uri->segment(2)=="livros"){
                    $url.="loja/livros";
                }elseif($this->uri->segment(2)=="cursos"){
                    $url.="loja/cursos";
                }
            }elseif($url=="perfil"){
                if($this->uri->segment(2)=="mercado"){
                    $url.="perfil/mercado";
                }elseif($this->uri->segment(2)=="franquia"){
                    $url.="perfil/franquia";
                }elseif($this->uri->segment(2)=="conhecimento"){
                    $url.="perfil/conhecimento";
                }elseif($this->uri->segment(2)=="diversificar"){
                    $url.="perfil/diversificar";
                }
            }else{
                $url.= "/detalhes";
            }
            
        }


        $this->db->select('sf_banner.id_pagina')
                 ->join('sf_pagina','sf_pagina.id_pagina = sf_banner.id_pagina')
                 ->order_by('sf_banner.id_pagina', 'asc')
                 ->limit(1);
        $where = array('sf_pagina.url=' => $url);
        
        $result_banner = $this->get_where($where)->row();



        if($result_banner){
            $this->db->select('*, banner.IDFranquia as id_franquia')
                 ->select("IF(ISNULL(IDFranquia), 1, (SELECT status FROM sf_franquia WHERE IDFranquia = id_franquia)) as franquia_ativa")
                 ->group_start()
                     ->group_start()
                         ->where('data_inicio <=', date('Y-m-d'))
                         ->where('data_fim >=', date('Y-m-d'))
                     ->group_end()
                     ->or_group_start()
                         ->where('data_inicio', NULL)
                         ->where('data_fim', NULL)
                     ->group_end()
                 ->group_end()
                 ->not_like('file', '.swf', 'before')
                 ->order_by('rendered', 'asc')
                 ->limit(1);
            $where = array('IDTipo' => $IDTipo, 'status' => 1, 'id_pagina'=>$result_banner->id_pagina);
            $result = $this->get_where($where)->row();

            if(!$result){

                $this->db->select('*, banner.IDFranquia as id_franquia')
                        ->select("IF(ISNULL(IDFranquia), 1, (SELECT status FROM sf_franquia WHERE IDFranquia = id_franquia)) as franquia_ativa")
                        ->group_start()
                        ->group_start()
                            ->where('data_inicio <=', date('Y-m-d'))
                            ->where('data_fim >=', date('Y-m-d'))
                        ->group_end()
                        ->or_group_start()
                            ->where('data_inicio', NULL)
                            ->where('data_fim', NULL)
                        ->group_end()
                ->group_end()
                 ->not_like('file', '.swf', 'before')
                 ->order_by('rendered', 'asc')
                 ->limit(1);
                $where = array('IDTipo' => $IDTipo, 'status' => 1,'id_pagina'=> 0 );
                $result = $this->get_where($where)->row();

            }

        }else{

            $this->db->select('*, banner.IDFranquia as id_franquia')
                 ->select("IF(ISNULL(IDFranquia), 1, (SELECT status FROM sf_franquia WHERE IDFranquia = id_franquia)) as franquia_ativa")
                 ->group_start()
                     ->group_start()
                         ->where('data_inicio <=', date('Y-m-d'))
                         ->where('data_fim >=', date('Y-m-d'))
                     ->group_end()
                     ->or_group_start()
                         ->where('data_inicio', NULL)
                         ->where('data_fim', NULL)
                     ->group_end()
                 ->group_end()
                 ->not_like('file', '.swf', 'before')
                 ->order_by('rendered', 'asc')
                 ->limit(1);
            $where = array('IDTipo' => $IDTipo, 'status' => 1,'id_pagina'=> 0);
            $result = $this->get_where($where)->row();
        }

        if($result and $result->franquia_ativa == 0){
            $this->update(array('status' => 0), $result->IDBanner);
            return $this->getBannerFront($IDTipo);
        } else {
            return $result;
        }
    }

    public function click($IDBanner) 
    {
        $save = array(
            'IDBanner' => $IDBanner,
            'ip' => $this->input->ip_address(),
            'data' => date('Y-m-d'),
            'hora' => date('H:i:s')
            );
        $this->db->insert('banner_click', $save);
    }
}
