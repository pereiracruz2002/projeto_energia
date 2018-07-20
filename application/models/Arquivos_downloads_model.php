<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Arquivos_downloads_model extends MY_Model
{
    var $id_col = 'arquivos_downloads_id';

    var $fields = array(
         'nome' => array(
            'type' => 'text',
            'label' => 'Nome',
            'rules' => 'required',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),
        'arquivo' => array(
            'type' => 'file',
            'label' => 'Arquivo',
            'rules' => 'callback_uploadArquivo',
            'class' => '',
            'label_class' => 'col-sm-3',
            'prepend' => '<div class="col-sm-6">',
            'append' => '</div>',
        ),   
    );
}
