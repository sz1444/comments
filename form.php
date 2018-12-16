<?php
session_start();
 include 'class/main.class.php';
 include 'class/comments.class.php';
 include 'class/login.class.php';
 include 'class/register.class.php';

$comments = new Comments();
$login = new login();
$register = new register();

switch($_GET['action']) {
  case 'get':
    echo json_encode($comments->fetchComments()); 
    break;
  case 'post':
      echo json_encode($comments->addComment()); 
  break;
  case 'love':
      $comments->addRating();
  break; 
  case 'login':
      echo json_encode($login->chcekLogin());  
  break;        
    case 'check':   
        echo json_encode($login->catchSession());
    break;   
     case 'delete':   
         echo json_encode($comments->deleteComment());  
    break;   
    case 'edit':   
         echo json_encode($comments->editComment());  
    break; 
     case 'logout':
      $login->logout();  
  break;   
 case 'register':
      echo json_encode($register->createAccount());  
  break;
 case 'loadlove':
       echo json_encode($comments->loadRating());  
  break; 
        
        
}
?>