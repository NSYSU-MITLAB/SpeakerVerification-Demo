<?php

header("Access-Control-Allow-Origin:*");   


foreach ($_FILES as $data){
    print_r($data);
    $size = $data['size']; //the size in bytes
    $input = $data['tmp_name']; //temporary name that PHP gave to the uploaded file
    $output = $data['name'].".wav"; //letting the client control the filename is a rather bad idea

    //move the file from temp name to local folder using $output name
    move_uploaded_file($input, "./enrollment/".$output);
}

echo "[successes upload audio files.]"

#$old_path = getcwd();
#chdir('/home/suyu/github/voicenet/');
#$shell_cmd = './run-online.sh' . ' ' . '/var/www/html/upload/'.$output; 
#$bash_output = shell_exec($shell_cmd);
#chdir($old_path);

#echo($bash_output);
?>
