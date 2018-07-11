<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class User_admin_model extends MY_Model
{
    var $table = 'usuario_admin';
    public function __construct() 
    {
        parent::__construct();
    }
}
