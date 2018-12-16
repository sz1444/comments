<?php

class login extends Main {
  public function __construct() {
    parent::__construct();
  }

  public function chcekLogin() {
      $prepared = $this->mysqli->prepare("SELECT * FROM datauser WHERE login = ? AND password = ?");
      $prepared->bind_param("ss", $_POST['login'], sha1($_POST['password']));
      $prepared->execute(); 
      $result = $prepared->get_result();
      $y=$result->fetch_assoc();
      $_SESSION['idUser']= $y["idUser"];
      $_SESSION['name']= $y["login"];
      $_SESSION['email']= $y["email"];
      $prepared->close();
      
      
      
      if($result->num_rows>0){
          $_SESSION['login']= true;            
       }else{
          $_SESSION['login']= false;  
      }
  
    return $_SESSION; 
       }  
    public function catchSession(){
    return $_SESSION;   
    } 
     public function logout() {
         session_destroy();
     }
    
}



?>