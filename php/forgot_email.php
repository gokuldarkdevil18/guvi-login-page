<?php
    $useremail=isset($_POST['email'])?$_POST['email']:'';
    $ok=true;
    $message=array();
    
    if($ok){
        if($useremail==='chandru6501@gmail.com')
        {
            $ok=true;
            $message[]="Correct";
        }else{
            $ok=false;
            $message[]="Incorrect Email / Password combination";
        }
    }
    echo json_encode(
        array(
            'ok' => $ok,
            'message' =>$message
        )
    );

?>