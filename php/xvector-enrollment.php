<?php
header("Access-Control-Allow-Origin:*");

$handle = fopen("dataset.txt", "a+");
$spks = array();
if ($handle){
    while (($line = fgets($handle)) !== false){
        array_push($spks, (int)$line);
    }
    if (sizeof($spks) == 0){
        $spk_id = 1;
    }else{
        $spk_id = max($spks) + 1;
    }
    fwrite($handle, $spk_id."\n");
    fclose($handle);
}
mkdir("./enrollment/".$spk_id."/");
chmod("./enrollment/".$spk_id."/", 0777);

foreach ($_FILES as $data){
    //print_r($data);
    $size = $data['size']; //the size in bytes
    $input = $data['tmp_name']; //temporary name that PHP gave to the uploaded file
    $output = $data['name'].".wav"; //letting the client control the filename is a rather bad idea

    //move the file from temp name to local folder using $output name
    move_uploaded_file($input, "./enrollment/".$spk_id."/".$output);
}

$old_path = getcwd();
chdir('/home/suyu/kaldi/egs/sre16/kaldi-online-SV');
$shell_cmd = './online-enroll.sh' . ' ' . '/var/www/html/enrollment/'.$spk_id; 
$bash_output = shell_exec($shell_cmd);
chdir($old_path);

echo("SUCCESSFULLY ENROLLED!");
?>
