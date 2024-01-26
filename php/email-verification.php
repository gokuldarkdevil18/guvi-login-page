<?php
    include 'dbconn.php';
    if(isset($_GET['token'])){
        $token=$_GET['token'];
        $status=1;
        $stmt = $conn->prepare("UPDATE register SET status=? where token=?");
        $stmt->bind_param("is", $status, $token);
        $result=$stmt->execute();
        $msg='';
        if($result){
            $msg='Email Verified Successfully';
        }else{
            $msg='Email Not Verified please register again';
        }
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <style>
        html,body{
            display: grid;
            width:100%;
            height:100%;
            place-items:center;
        }
        .col-md-6{
            padding: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 bg-success text-white text-center">
                <h1 class="text-white text-center">
                    <?php echo $msg; ?>
                </h1>
                <a href="../index.html" class="text-white">Go back to Home</a>
            </div>
        </div>
    </div>
</body>
</html>