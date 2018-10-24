<?php

header("Access-Control-Allow-Origin:*");   

#print_r($_FILES); //this will print out the received name, temp name, type, size, etc.
$size = $_FILES['audio_data']['size']; //the size in bytes
$input = $_FILES['audio_data']['tmp_name']; //temporary name that PHP gave to the uploaded file
$output = $_FILES['audio_data']['name'].".wav"; //letting the client control the filename is a rather bad idea

#if(is_uploaded_file($input)){
#    echo("file is uploaded via HTTP POST\n");
#}else{
#    echo("file is not uploaded via HTTP POST");
#}

//move the file from temp name to local folder using $output name
move_uploaded_file($input, "./upload/".$output);

$old_path = getcwd();
chdir('/home/suyu/github/voicenet/');
$shell_cmd = './run-online.sh' . ' ' . '/var/www/html/upload/'.$output; 
$bash_output = shell_exec($shell_cmd);
chdir($old_path);

echo($bash_output);
?>
