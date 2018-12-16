<?php

class Main {

  private $host = 'localhost';
  private $user = 'root';
  private $pass = '';
  private $db = 'comments';
  protected $mysqli;

  public function __construct() {
    $this->mysqli = new mysqli($this->host, $this->user, $this->pass, $this->db);
  }
    
  public function __destructor() {
    $this->mysqli->close;
  }

}

?>

