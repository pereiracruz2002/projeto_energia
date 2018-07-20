<?php

/*
 * Maxima Cielo Module - payment method module for Magento, integrating
 * the billing forms with a Cielo's gateway Web Service.
 * Copyright (C) 2012  Fillipe Almeida Dutra
 * Belo Horizonte, Minas Gerais - Brazil
 * 
 * Contact: lawsann@gmail.com
 * Project link: http://code.google.com/p/magento-maxima-cielo/
 * Group discussion: http://groups.google.com/group/cielo-magento
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
	
class Maxima_Cielo_Model_WebServiceOrder
{
	public $ccType;								// bandeira do cartao de credito
	public $paymentType;						// forma de pagameto (debito, credito - a vista ou parcelado)
	public $paymentParcels;						// numero de parcelas
	
	public $clientOrderNumber;					// clientOrderNumber
	public $clientOrderValue;					// clientOrderValue
	public $clientOrderCurrency = "986";		// numero de indice da moeda utilizada (R$)
	public $clientOrderDate;					// data da operacao
	public $clientOrderDescription;				// descricao
	public $clientOrderLocale = "PT";			// idioma
	public $clientSoftDesc;						// identificador que aparece na fatura do cliente
	
	public $cieloNumber;						// identificador da loja na cielo
	public $cieloKey;							// chave da loja a cielo
	
	public $capture;							// flag indicando quando pedido deve ser capturado
	public $autorize;							// flag indicando quando pedido deve ser autorizado
	public $postbackURL;						// url para qual o pagamento retornara o resultado da operacao
	public $tid;								// id da transacao
	public $status;								// status da transacao
	private $_xmlResponse;						// texto xml vindo da resposta da transacao
	private $_transactionError;					// erro ocorrido na transicao
	
	private $_webServiceURL;					// url do webservice da cielo
	private $_SSLCertificatePath;				// caminho no sistema de arquivos do certificado SSL
	private $_URLAuthTag = "url-autenticacao";	// tag que armazena a url de autenticacao da transacao
	
	const ENCODING = "ISO-8859-1";				// codificacao do xml
	const VERSION = "1.2.0";					// versao do webservice da cielo
	
	
	function __construct($params)
	{
		$baseURL 			= (isset($params['enderecoBase']))		? $params['enderecoBase'] 			: "https://qasecommerce.cielo.com.br";
		$certificatePath 	= (isset($params['caminhoCertificado']) && 
							   $params['caminhoCertificado'] != "")	? $params['caminhoCertificado'] 	: Mage::getModuleDir('', 'Maxima_Cielo') . "/ssl/VeriSignClass3PublicPrimaryCertificationAuthority-G5.crt";
		
		$this->_webServiceURL = $baseURL . "/servicos/ecommwsec.do";
		$this->_SSLCertificatePath = $certificatePath;
	}
	
	
	/**
	 *
	 * funcao utilizada para atribuir os valores base
	 * do pedido da cielo
	 * 
	 * @param string $index
	 * @param string $value
	 * 
	 * ou
	 * 
	 * @param array $index
	 */
	
	public function setData($index, $value = null)
	{
		if(is_array($index))
		{
			foreach($index as $i => $v)
			{
				$this->$i = $v;
			}
		}
		else
		{
			$this->$index = $value;
		}




      
        $arrayConta[1][1] = 1;
        $arrayConta[1][2] = 1;
        $arrayConta[1][3] = 2;
        $arrayConta[1][4] = 1;
        $arrayConta[1][5] = 1;
        $arrayConta[1][6] = 2;
        $arrayConta[1][0] = 1;

	$arrayConta[2][1] = 1;
        $arrayConta[2][2] = 2;
        $arrayConta[2][3] = 1;
        $arrayConta[2][4] = 1;
        $arrayConta[2][5] = 2;
        $arrayConta[2][6] = 1;
        $arrayConta[2][0] = 1;

	$arrayConta[3][1] = 2;
	$arrayConta[3][2] = 1;
	$arrayConta[3][3] = 1;
	$arrayConta[3][4] = 2;
	$arrayConta[3][5] = 1;
	$arrayConta[3][6] = 1;
	$arrayConta[3][0] = 2;

	$arrayConta[4][1] = 1;
	$arrayConta[4][2] = 1;
	$arrayConta[4][3] = 2;
	$arrayConta[4][4] = 1;
	$arrayConta[4][5] = 1;
	$arrayConta[4][6] = 2;
	$arrayConta[4][0] = 1;

        $arrayConta[5][1] = 1;
	$arrayConta[5][2] = 2;
	$arrayConta[5][3] = 1;
	$arrayConta[5][4] = 1;
	$arrayConta[5][5] = 2;
	$arrayConta[5][6] = 1;
	$arrayConta[5][0] = 1;
	
	$arrayConta[6][1] = 2;
        $arrayConta[6][2] = 1;
        $arrayConta[6][3] = 1;
        $arrayConta[6][4] = 2;
        $arrayConta[6][5] = 1;
        $arrayConta[6][6] = 1;
        $arrayConta[6][0] = 2;
	
	$arrayConta[7][1] = 1;
    	$arrayConta[7][2] = 1;
    	$arrayConta[7][3] = 2;
    	$arrayConta[7][4] = 1;
    	$arrayConta[7][5] = 1;
    	$arrayConta[7][6] = 2;
   	$arrayConta[7][0] = 1;

    	$arrayConta[8][1] = 1;
    	$arrayConta[8][2] = 2;
    	$arrayConta[8][3] = 1;
    	$arrayConta[8][4] = 1;
    	$arrayConta[8][5] = 2;
    	$arrayConta[8][6] = 1;
    	$arrayConta[8][0] = 1;

	$arrayConta[9][1] = 2;
   	$arrayConta[9][2] = 1;
   	$arrayConta[9][3] = 1;
    	$arrayConta[9][4] = 2;
    	$arrayConta[9][5] = 1;
    	$arrayConta[9][6] = 1;
    	$arrayConta[9][0] = 2;

	$arrayConta[10][1] = 1;
    	$arrayConta[10][2] = 1;
    	$arrayConta[10][3] = 2;
    	$arrayConta[10][4] = 1;
    	$arrayConta[10][5] = 1;
    	$arrayConta[10][6] = 2;
    	$arrayConta[10][0] = 1;

	$arrayConta[11][1] = 1;
    	$arrayConta[11][2] = 2;
    	$arrayConta[11][3] = 1;
    	$arrayConta[11][4] = 1;
    	$arrayConta[11][5] = 2;
    	$arrayConta[11][6] = 1;
    	$arrayConta[11][0] = 1;

	$arrayConta[12][1] = 2;
    	$arrayConta[12][2] = 1;
    	$arrayConta[12][3] = 1;
    	$arrayConta[12][4] = 2;
    	$arrayConta[12][5] = 1;
    	$arrayConta[12][6] = 1;
    	$arrayConta[12][0] = 2;

	$arrayConta[13][1] = 1;
    	$arrayConta[13][2] = 1;
    	$arrayConta[13][3] = 2;
    	$arrayConta[13][4] = 1;
    	$arrayConta[13][5] = 1;
    	$arrayConta[13][6] = 2;
    	$arrayConta[13][0] = 1;

	$arrayConta[14][1] = 1;
   	$arrayConta[14][2] = 2;
    	$arrayConta[14][3] = 1;
    	$arrayConta[14][4] = 1;
    	$arrayConta[14][5] = 2;
    	$arrayConta[14][6] = 1;
    	$arrayConta[14][0] = 1;

	$arrayConta[15][1] = 2;
    	$arrayConta[15][2] = 1;
   	$arrayConta[15][3] = 1;
    	$arrayConta[15][4] = 2;
    	$arrayConta[15][5] = 1;
    	$arrayConta[15][6] = 1;
    	$arrayConta[15][0] = 2;

	$arrayConta[16][1] = 1;
    	$arrayConta[16][2] = 1;
   	$arrayConta[16][3] = 2;
   	$arrayConta[16][4] = 1;
    	$arrayConta[16][5] = 1;
    	$arrayConta[16][6] = 2;
    	$arrayConta[16][0] = 1;

	$arrayConta[17][1] = 1;
    	$arrayConta[17][2] = 2;
   	$arrayConta[17][3] = 1;
    	$arrayConta[17][4] = 1;
    	$arrayConta[17][5] = 2;
    	$arrayConta[17][6] = 1;
    	$arrayConta[17][0] = 1;

	$arrayConta[18][1] = 2;
	$arrayConta[18][2] = 1;
	$arrayConta[18][3] = 1;
	$arrayConta[18][4] = 2;
	$arrayConta[18][5] = 1;
	$arrayConta[18][6] = 1;
	$arrayConta[18][0] = 2;

	$arrayConta[19][1] = 1;
	$arrayConta[19][2] = 1;
	$arrayConta[19][3] = 2;
	$arrayConta[19][4] = 1;
	$arrayConta[19][5] = 1;
	$arrayConta[19][6] = 2;
	$arrayConta[19][0] = 1;

	$arrayConta[20][1] = 1;
	$arrayConta[20][2] = 2;
	$arrayConta[20][3] = 1;
	$arrayConta[20][4] = 1;
	$arrayConta[20][5] = 2;
	$arrayConta[20][6] = 1;
	$arrayConta[20][0] = 1;

	$arrayConta[21][1] = 2;
	$arrayConta[21][2] = 1;
	$arrayConta[21][3] = 1;
	$arrayConta[21][4] = 2;
	$arrayConta[21][5] = 1;
	$arrayConta[21][6] = 1;
	$arrayConta[21][0] = 2;


	$arrayConta[22][1] = 1;
	$arrayConta[22][2] = 1;
	$arrayConta[22][3] = 2;
	$arrayConta[22][4] = 1;
	$arrayConta[22][5] = 1;
	$arrayConta[22][6] = 2;
	$arrayConta[22][0] = 1;

	$arrayConta[23][1] = 1;
	$arrayConta[23][2] = 2;
	$arrayConta[23][3] = 1;
	$arrayConta[23][4] = 1;
	$arrayConta[23][5] = 2;
	$arrayConta[23][6] = 1;
	$arrayConta[23][0] = 1;

	$arrayConta[24][1] = 2;
	$arrayConta[24][2] = 1;
	$arrayConta[24][3] = 1;
	$arrayConta[24][4] = 2;
	$arrayConta[24][5] = 1;
	$arrayConta[24][6] = 1;
	$arrayConta[24][0] = 2;
	
	$arrayConta[25][1] = 1;
	$arrayConta[25][2] = 1;
	$arrayConta[25][3] = 2;
	$arrayConta[25][4] = 1;
	$arrayConta[25][5] = 1;
	$arrayConta[25][6] = 2;
	$arrayConta[25][0] = 1;

	$arrayConta[26][1] = 1;
	$arrayConta[26][2] = 2;
	$arrayConta[26][3] = 1;
	$arrayConta[26][4] = 1;
	$arrayConta[26][5] = 2;
	$arrayConta[26][6] = 1;
	$arrayConta[26][0] = 1;

	$arrayConta[27][1] = 2;
	$arrayConta[27][2] = 1;
	$arrayConta[27][3] = 1;
	$arrayConta[27][4] = 2;
	$arrayConta[27][5] = 1;
	$arrayConta[27][6] = 1;
	$arrayConta[27][0] = 2;

	$arrayConta[28][1] = 1;
	$arrayConta[28][2] = 1;
	$arrayConta[28][3] = 2;
	$arrayConta[28][4] = 1;
	$arrayConta[28][5] = 1;
	$arrayConta[28][6] = 2;
	$arrayConta[28][0] = 1;

	$arrayConta[29][1] = 1;
	$arrayConta[29][2] = 2;
	$arrayConta[29][3] = 1;
	$arrayConta[29][4] = 1;
	$arrayConta[29][5] = 2;
	$arrayConta[29][6] = 1;
	$arrayConta[29][0] = 1;

               // $diaSemana = date('w');
		$diaSemana = date('w', time()-10800);
		$numeroSemana = date('W', time()-10800);

		$diaSemana = (int)$diaSemana;
        $numeroSemana = (int)$numeroSemana;
        
                if(Mage::getSingleton('customer/session')->isLoggedIn()) {
                         $customerData = Mage::getSingleton('customer/session')->getCustomer();
                         $customerId = $customerData->getId();
                      //echo $customerData->getId();
                        //exit();
                 }
               // if($customerId==20245){
                       if($arrayConta[$numeroSemana][$diaSemana]==2){
                              $this->cieloNumber              = '1035451678';
                              $this->cieloKey             = '067053a4b1d1cf3a4e405a967c7c8a6cc6ebe401f2e229aceb8ef73aef59853f';
                        }
               // }

	

	}
	
	
	
	/**
	 *
	 * funcao responsavel por montar o xml de requisicao e 
	 * realizar a criacao da transacao na cielo
	 * 
	 * @param boolean $ownerIncluded
	 * @return boolean
	 * 
	 */
	
	public function requestTransaction($ownerData)
	{
		$msg  = $this->_getXMLHeader() . "\n";
		
		$msg .= '<requisicao-transacao id="' . md5(date("YmdHisu")) . '" versao="' . self::VERSION . '">' . "\n   ";
		$msg .= $this->_getXMLCieloData() . "\n   ";
		$msg .= $this->_getXMLOwnerData($ownerData) . "\n   ";
		$msg .= $this->_getXMLOrderData() . "\n   ";
		$msg .= $this->_getXMLPaymentData() . "\n   ";
		$msg .= $this->_getXMLPostbackURL() . "\n   ";
		$msg .= $this->_getXMLAutorize() . "\n   ";
		$msg .= $this->_getXMLCapture() . "\n   ";
		$msg .= '</requisicao-transacao>';
		
		$maxAttempts = 3;
		
		while($maxAttempts > 0)
		{
			if($this->_sendRequest("mensagem=" . $msg, "Transacao"))
			{
				if($this->_hasConsultationError())
				{
					Mage::log($this->_transactionError);
					return false;
				}
				
				$xml = simplexml_load_string($this->_xmlResponse);
				
				// pega dados do xml
				$this->tid = (string) $xml->tid;
				$URLAuthTag = $this->_URLAuthTag;
				
				return ((string) $xml->$URLAuthTag);
			}
			
			$maxAttempts--;
		}
		
		if($maxAttempts == 0)
		{
			Mage::log("[CIELO] Não conseguiu consultar o servidor.")
		}
		
		return false;
	}
	
	
	/**
	 *
	 * funcao responsavel por montar o xml de requisicao e 
	 * realizar a consulta do status da transacao
	 * 
	 * @return boolean | string
	 * 
	 */
	 
	public function requestConsultation()
	{
		$msg  = $this->_getXMLHeader() . "\n";
		$msg .= '<requisicao-consulta id="' . md5(date("YmdHisu")) . '" versao="' . self::VERSION . '">' . "\n   ";
		$msg .= '<tid>' . $this->tid . '</tid>' . "\n   ";
		$msg .= $this->_getXMLCieloData() . "\n   ";
		$msg .= '</requisicao-consulta>';
		
		$maxAttempts = 3;
		
		while($maxAttempts > 0)
		{
			if($this->_sendRequest("mensagem=" . $msg, "Consulta"))
			{
				if($this->_hasConsultationError())
				{
					Mage::log($this->_transactionError);
					return false;
				}
				
				$xml = simplexml_load_string($this->_xmlResponse);
				$this->status = (string) $xml->status;
				
				return $this->status;
			}
			
			$maxAttempts--;
		}
		
		if($maxAttempts == 0)
		{
			Mage::log("[CIELO] Não conseguiu consultar o servidor.");
		}
		
		return false;
	}
	
	
	
	/**
	 *
	 * funcao responsavel por montar o xml de requisicao e 
	 * realizar a captura da transacao
	 * 
	 * @return boolean | string
	 * 
	 */
	 
	public function requestCapture($value)
	{
		$msg  = $this->_getXMLHeader() . "\n";
		$msg .= '<requisicao-captura id="' . md5(date("YmdHisu")) . '" versao="' . self::VERSION . '">' . "\n   ";
		$msg .= '<tid>' . $this->tid . '</tid>' . "\n   ";
		$msg .= $this->_getXMLCieloData() . "\n   ";
		$msg .= '<valor>' . $value . '</valor>' . "\n   ";
		$msg .= '</requisicao-captura>';
		
		$maxAttempts = 3;
		
		while($maxAttempts > 0)
		{
			if($this->_sendRequest("mensagem=" . $msg, "Captura"))
			{
				if($this->_hasConsultationError())
				{
					Mage::log($this->_transactionError);
					return false;
				}
				
				$xml = simplexml_load_string($this->_xmlResponse);
				$this->status = (string) $xml->status;
				
				return $this->status;
			}
			
			$maxAttempts--;
		}
		
		if($maxAttempts == 0)
		{
			Mage::log("[CIELO] Não conseguiu consultar o servidor.");
		}
		
		return false;
	}
	
	
	
	/**
	 *
	 * funcao responsavel por montar o xml de requisicao e 
	 * realizar o cancelamento da transacao
	 * 
	 * @return boolean | string
	 * 
	 */
	 
	public function requestCancellation()
	{
		$msg  = $this->_getXMLHeader() . "\n";
		$msg .= '<requisicao-cancelamento id="' . md5(date("YmdHisu")) . '" versao="' . self::VERSION . '">' . "\n   ";
		$msg .= '<tid>' . $this->tid . '</tid>' . "\n   ";
		$msg .= $this->_getXMLCieloData() . "\n   ";
		$msg .= '</requisicao-cancelamento>';
		
		$maxAttempts = 3;
		
		while($maxAttempts > 0)
		{
			if($this->_sendRequest("mensagem=" . $msg, "Cancelamento"))
			{
				if($this->_hasConsultationError())
				{
					Mage::log($this->_transactionError);
					return false;
				}
				
				$xml = simplexml_load_string($this->_xmlResponse);
				$this->status = (string) $xml->status;
				
				return $this->status;
			}
			
			$maxAttempts--;
		}
		
		if($maxAttempts == 0)
		{
			Mage::log("[CIELO] Não conseguiu consultar o servidor.");
		}
		
		return false;
	}
	
	
	
	/**
	 *
	 * funcao responsavel por conferir se houve erro na requisicao
	 * 
	 * @return boolean
	 * 
	 */
	
	private function _hasConsultationError()
	{
		// certificao SSL invalido
		if(stripos($this->_xmlResponse, "SSL certificate problem") !== false)
		{
			$this->_transactionError = "Certificado SSL inválido.";
			return true;
		}
		
		$xml = simplexml_load_string($this->_xmlResponse);
		
		// tempo de requisicao expirou
		if($xml == null)
		{
			$this->_transactionError = "Tempo de espera na requisição expirou.";
			return true;
		}
		
		// retorno de erro da cielo
		if($xml->getName() == "erro")
		{
			$this->_transactionError = "[CIELO: " . $xml->codigo . "] " . utf8_decode($xml->mensagem);
			return true;
		}
		
		return false;
	}
	
	
	/**
	 *
	 * retorna a msg de erro da requisicao
	 * 
	 * @return string
	 * 
	 */
	
	public function getError()
	{
		return $this->_transactionError;
	}
	
	
	/**
	 *
	 * funcao que realiza a requisicao
	 * 
	 * @param string $postMsg
	 * @param string $transacao
	 * 
	 * @return string | boolean
	 * 
	 */
	
	private function _sendRequest($postMsg, $transacao)
	{
		$curl_session = curl_init();
		
		curl_setopt($curl_session, CURLOPT_URL, $this->_webServiceURL);
		curl_setopt($curl_session, CURLOPT_FAILONERROR, true);
		curl_setopt($curl_session, CURLOPT_SSL_VERIFYPEER, true);
		curl_setopt($curl_session, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($curl_session, CURLOPT_CAINFO, $this->_SSLCertificatePath);
		//curl_setopt($curl_session, CURLOPT_SSLVERSION, 1);
		curl_setopt($curl_session, CURLOPT_SSLVERSION, 'CURL_SSLVERSION_TLSv1_2');
		curl_setopt($curl_session, CURLOPT_CONNECTTIMEOUT, 10);
		curl_setopt($curl_session, CURLOPT_TIMEOUT, 40);
		curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl_session, CURLOPT_POST, true);
		curl_setopt($curl_session, CURLOPT_POSTFIELDS, $postMsg );
		
		$this->_xmlResponse = curl_exec($curl_session);
		
		if(!$this->_xmlResponse)
		{
			return false;
		}
		
		curl_close($curl_session);
		
		return true;
	}		
	
	/**
	 *
	 * funcao que que consulta o retorno xml
	 * 
	 * @return string | boolean
	 * 
	 */
	
	public function getXmlResponse()
	{
		try
		{
			return simplexml_load_string($this->_xmlResponse);
		}
		catch(Exception $e)
		{
			return false;
		}
	}
	
	/**
	 *
	 * funcoes que montam o conteudo xml da requisicao
	 * 
	 * @return string
	 * 
	 */
	
	private function _getXMLHeader()
	{
		return '<?xml version="1.0" encoding="' . self::ENCODING . '" ?>'; 
	}
	
	private function _getXMLCieloData()
	{
		$msg = '<dados-ec>' . "\n      " .
					'<numero>'
						. $this->cieloNumber . 
					'</numero>' . "\n      " .
					'<chave>'
						. $this->cieloKey .
					'</chave>' . "\n   " .
				'</dados-ec>';
						
		return $msg;
	}
	
	private function _getXMLOwnerData($ownerData)
	{
		if(!$ownerData)
		{
			return "";
		}
		
		
		$msg = '<dados-portador>' . "\n      " . 
					'<numero>' 
						. $ownerData['number'] .
					'</numero>' . "\n      " .
					'<validade>'
						. $ownerData['exp_date'] .
					'</validade>' . "\n      " .
					'<indicador>'
						. "1" .
					'</indicador>' . "\n      " .
					'<codigo-seguranca>'
						. $ownerData['sec_code'] .
					'</codigo-seguranca>' . "\n      " . 
					'<nome-portador>'
						. $ownerData['name'] .
					'</nome-portador>' . "\n   " .
				'</dados-portador>';
		
		return $msg;
	}
	
	private function _getXMLOrderData()
	{
		$this->clientOrderDate = date("Y-m-d") . "T" . date("H:i:s");
		
		$msg = '<dados-pedido>' . "\n      " .
					'<numero>'
						. $this->clientOrderNumber . 
					'</numero>' . "\n      " .
					'<valor>'
						. $this->clientOrderValue.
					'</valor>' . "\n      " .
					'<moeda>'
						. $this->clientOrderCurrency .
					'</moeda>' . "\n      " .
					'<data-hora>'
						. $this->clientOrderDate .
					'</data-hora>' . "\n      ";
		
		if($this->clientOrderDescription != null && $this->clientOrderDescription != "")
		{
			$msg .= '<descricao>'
				. $this->clientOrderDescription .
				'</descricao>' . "\n      ";
		}
		
		$msg .= '<idioma>'
					. $this->clientOrderLocale .
				'</idioma>' . "\n      ";
		
		if($this->clientSoftDesc != null && $this->clientSoftDesc != "")
		{
			'<softDescriptor>'
				. $this->clientSoftDesc .
			'</softDescriptor>' . "\n   ";
		}
		
		$msg .= '</dados-pedido>';
						
		return $msg;
	}
	
	private function _getXMLPaymentData()
	{
		$msg = '<forma-pagamento>' . "\n      " .
					'<bandeira>' 
						. $this->ccType .
					'</bandeira>' . "\n      " .
					'<produto>'
						. $this->paymentType .
					'</produto>' . "\n      " .
					'<parcelas>'
						. $this->paymentParcels .
					'</parcelas>' . "\n   " .
				'</forma-pagamento>';
						
		return $msg;
	}
	
	private function _getXMLPostbackURL()
	{
		$msg = '<url-retorno>' . $this->postbackURL . '</url-retorno>';
		
		return $msg;
	}
	
	private function _getXMLAutorize()
	{
		$msg = '<autorizar>' . $this->autorize . '</autorizar>';
		
		return $msg;
	}
	
	private function _getXMLCapture()
	{
		$msg = '<capturar>' . $this->capture . '</capturar>';
		
		return $msg;
	}
}
