Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

$ReqHeaders = @{
    'User-Agent' = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
}
$Uri = "https://cnb.cool/lgh06/daliu_post_dependencies/-/lfs/47fe1d46dbb7111f6693b04a8bd95fc869ce2062df7b4822b52849548fb457e4?name=Git-2.50.1-64-bit.exe"
Invoke-WebRequest -Uri $Uri -Headers $ReqHeaders -OutFile "Git-2.50.1-64-bit.exe"  

.\"Git-2.50.1-64-bit.exe" /SILENT /VERYSILENT --silent --install
Start-Sleep -Seconds 15

Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post_dependencies.git"
# Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post.git"