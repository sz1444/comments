<?php
class Comments extends Main {
  public function __construct() {
    parent::__construct();
  }

  public function fetchComments() {
    $data = $this->mysqli->query('SELECT comments.id ,comments.comment,comments.date, comments.rating,datauser.idUser, datauser.login, datauser.email FROM comments LEFT JOIN datauser ON comments.idUser = datauser.idUser');
    return $data->fetch_all(MYSQLI_ASSOC);
      
  }

  public function addComment(){    
    $locked = true;
    if(strlen($_POST['contetns'])<1){
        $locked = false;
    }  
      if($locked==true){
           $prepared = $this->mysqli->prepare("INSERT INTO comments(comment, idUser,date) VALUES(?, ?, NOW())"); 
          $prepared->bind_param("si", $_POST['contetns'], $_SESSION['idUser']);
          $prepared->execute();    
      }
    if($locked==true) {
     $locked =true;
    } else{
        $locked = false;
    }
      return $locked;
        
  }
     public function addRating(){ 
        $z = array_keys($_POST);
         $intUser = (int)$_SESSION['idUser'];
         $intComment = (int)$z[0];
         $data = $this->mysqli->prepare("SELECT idUser, id FROM love WHERE idUser=? AND id=?");
         $data->bind_param("ii",$intUser, $intComment);
         $data->execute();
         $result=$data->get_result();
         if($result->num_rows==0){
         $prepared = $this->mysqli->prepare("INSERT INTO love(idUser,id) VALUES(?, ?) ");
         $prepared->bind_param("ii",$intUser, $intComment);
         $prepared->execute();
         $addLike=  $this->mysqli->prepare("UPDATE comments SET rating=rating+1 WHERE id=?"); 
         $addLike->bind_param("i", $intComment);
         $addLike->execute();
         }else{
         $prepared = $this->mysqli->prepare("DELETE FROM love WHERE idUser=? AND id=?"); 
         $prepared->bind_param("ii",$intUser, $intComment);
         $prepared->execute();
         $delLike=  $this->mysqli->prepare("UPDATE comments SET rating=rating-1 WHERE id=?"); 
         $delLike->bind_param("i", $intComment);
         $delLike->execute();
         }
     }
    
         public function loadRating(){
             $intUser = (int)$_SESSION['idUser'];
              $prepared = $this->mysqli->prepare("SELECT id FROM love WHERE idUser=?");
              $prepared -> bind_param("i", $intUser);
              $prepared -> execute();
              $result=$prepared->get_result();
              return $result->fetch_all();
         }
    
     public function deleteComment(){ 
         $idComment = array_keys($_POST);
         $idUser = $_SESSION['idUser'];
         $prepared = $this->mysqli->prepare("DELETE FROM comments WHERE id=? AND idUser=?");
         $prepared->bind_param("ii",$idComment[0], $idUser);
         $prepared->execute();
         if($prepared->execute()){
          $delComment = $this->mysqli->prepare("DELETE FROM love WHERE id=?");
          $delComment->bind_param("i",$idComment[0]);
          $delComment->execute();
         }
         return $delComment->execute();
     }
    public function editComment(){ 
         $dataComment = array_keys($_POST);
         $int = (int)$_POST['id']; 
         $prepared = $this->mysqli->prepare("UPDATE comments SET comment = ? WHERE id=?"); 
         $prepared->bind_param("si",$_POST['content'], $int);
         $prepared->execute();
         return $prepared->execute();
    }
}

      
?>