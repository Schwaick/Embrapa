<?php
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

//Classe contendo configurações do servidor
class config {
	static $urlServidor = "http://site.com";

	//Headers necessários pro app conseguir se comunicar com o servidor
	static function setHeaders() {
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
		header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
	}
	//Retorna uma conexão com o BD
	static function getConn() {
		$host = "host";
		$db = "db";
		$usuario = "usuario";
		$senha = "senha";

		return new PDO("mysql:host=$host;dbname=$db;charset=utf8", $usuario, $senha);
	}
	//Retorna um objeto do PHPMailer
	static function getMail() {
		$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->Host = 'Host';
		$mail->SMTPAuth = true;
		$mail->Username = 'Username';
		$mail->Password = 'Password';
		$mail->SMTPSecure = 'tls';
		$mail->Port = 587;

		return $mail;
	}
}
?>