<?php
	if (isset($_POST['token']) && isset($_POST['action'])) {
	    $captcha_token = $_POST['token'];
	    $captcha_action = $_POST['action'];
	} else {
	    die('Капча работает некорректно. Обратитесь к администратору!');
	}
	 
	$url = 'https://www.google.com/recaptcha/api/siteverify';
	$params = [
	    'secret' => '6LeFHZEUAAAAAHFwWUFiLK3uYyHGho6nv5lA_WLK',
	    'response' => $captcha_token,
	    'remoteip' => $_SERVER['REMOTE_ADDR']
	];
	 
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	 
	$response = curl_exec($ch);
	if(!empty($response)) $decoded_response = json_decode($response);
	 
	$success = false;
	 
	if ($decoded_response && $decoded_response->success && $decoded_response->action == $captcha_action && $decoded_response->score > 0) {
	    $success = $decoded_response->success;
	    require_once('/home/PHPMailLib/PHPMailLib.php');
		if(isset($_POST['submit'])) {
		    $from = $_POST['email'];
		    $name = $_POST['name'];
		    $phone = $_POST['phone'];
		    $company = $_POST['company'];
		    $tariff = $_POST['tariff'];
		    if ($from == "" || $name == "" || $phone == "" || $company == "") {
		    	echo "<script>alert('Пожалуйста, заполните всю информацию перед отправлением заявки.'); window.location = 'http://dv-link.su';</script>";
		    }
		    elseif ($tariff == "Тариф") {
		    	echo "<script>alert('Пожалуйста, выберите тариф перед отправлением заявки.'); window.location = 'http://dv-link.su';</script>";
		    } else {
				$to = 'info@dv-link.su';
		    	$subject = 'Заявка: ' . $name . '. Тариф: ' . $tariff;
		    	$message = 'Имя: ' . $name . "\nТелефон: " . $phone . "\nЭл. почта: " . $from . "\nКомпания: " . $company . "\nТариф: " . $tariff;
		    	if (PHPMailSend($to, $subject, $message)) {
		    		echo "<script>alert('Заявка успешно отправлена'); window.location = 'http://dv-link.su';</script>";
		    	} else {
		    		echo "<script>alert('Error'); window.location = 'http://dv-link.su';</script>";
		    	}
		    }
		}
	} else {
	    echo "<script>alert('Вы бот?'); window.location = 'http://dv-link.su';</script>";
	}
	echo json_encode($success);
?>