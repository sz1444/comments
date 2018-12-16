<?php
error_reporting(E_ALL ^ E_NOTICE);
class register extends Main {
  public function __construct() {
    parent::__construct();
  }

  public function createAccount() {
          $shaPassword = sha1($_POST['passwordRegister']);
          $error = [];
          $success = true;
          $check = $this->mysqli->prepare("SELECT * FROM datauser WHERE login = ? OR email = ?");
          $check->bind_param("ss",$_POST['loginRegister'], $_POST['emailRegister']);
          $check->execute();
          $result=$check->get_result();
    
          if($result->num_rows!==0){
            $error[] = 'Taki login lub email już isnieje.';
            $success = false;
          }elseif((strlen($_POST['loginRegister'])<=4)){
            $error[] = 'Login musi mieć co najmniej 5 znaków.';
            $success = false;
          }
      
          if(($_POST['passwordRegister']!==$_POST['passwordReturn'])){
            $error[] = 'Hasła są różne.';
            $success = false;
          }
         
          if(strlen($_POST['passwordRegister'])<=7){
              $error[] = 'Hasło musi mieć conajmniej 8 znaków.';
              $success = false;
          }
      
          if(!filter_var($_POST['emailRegister'], FILTER_VALIDATE_EMAIL)){
            $error[] = 'Nieprawidłowy adres e-mail.';
            $success = false;
          }
          if(!$_POST['checkbox']){
             $error[] = 'Musisz zaakceptować regulamin.';
             $success = false;
          }

          if($success = true){
          $prepared = $this->mysqli->prepare("INSERT INTO datauser(login, password, email) VALUES(?, ?, ?)"); 
          $prepared->bind_param("sss", $_POST['loginRegister'],$shaPassword ,$_POST['emailRegister']);
          $prepared->execute(); 
          }
          
        return $error;
      }
}



?>