<?php
    include 'dbconn.php';
    $ok=true;
    $empty=true;
    $message=array();
    $name=$_POST['name'];
    $mobile=$_POST['mobile'];
    $email=$_POST['useremail'];
    $age=$_POST['age'];
    $dob=$_POST['date'];
    $pass=$_POST['password'];
    $cpass=$_POST['cpassword'];
    $token = openssl_random_pseudo_bytes(16);
    $token = bin2hex($token);
    $password=md5($pass);
    $cpassword=md5($cpass);
    $status=0;
    if($name==='' || $pass==='' ||$mobile==='' || $email==='' || $age==='' || $dob==='' || $cpass===''){
        $empty=false;
    }else{
        $empty=true;
    }
    if($empty){
        $stmt = $conn->prepare("INSERT INTO register (Name,Mobile,Email,Age,DOB,Password,cpassword,token,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sisisssss", $name, $mobile, $email, $age, $dob, $password,$cpassword,$token,$status);
        $result=$stmt->execute();
        if($result===true){
            $ok=true;
            $to       = $email;
            $subject  = 'Email Verification';
            $link = '<a href="http://localhost/guvi/php/email-verification.php?token='.$token.'">Click here</a>';
            $messages  = $link.' to activate your account';
            $headers  = 'From: chandru6501@gmail.com' . "\r\n" .
                'MIME-Version: 1.0' . "\r\n" .
                'Content-type: text/html; charset=utf-8';
            if(mail($to, $subject, $messages, $headers))
                $message[]='We have send the Activation link,Please check it out';
            else
                $message[]='Invalid email';
        }
        $stmt->close();
    }else{
        $ok=false;
        $message[]="error";
    }
    echo json_encode(
        array(
            'ok' => $ok,
            'message' =>$message
        )
    );


    $conn->close();
?>