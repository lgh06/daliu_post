Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

$ReqHeaders = @{
    'User-Agent' = 'daliu_post'
}
$Uri = "https://doge-ahuan-cd-0-big.onlinetool.cc/daliu_post_related/Git-2.50.1-64-bit.exe"
Invoke-WebRequest -Uri $Uri -Headers $ReqHeaders -OutFile "Git-2.50.1-64-bit.exe"  

.\"Git-2.50.1-64-bit.exe" /SILENT /VERYSILENT --silent --install
Start-Sleep -Seconds 30

Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post_dependencies.git"
# Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post.git"