Invoke-WebRequest -Uri "https://cnb.cool/lgh06/daliu_post_dependencies/-/lfs/47fe1d46dbb7111f6693b04a8bd95fc869ce2062df7b4822b52849548fb457e4?name=Git-2.50.1-64-bit.exe" -OutFile "Git-2.50.1-64-bit.exe"  
.\"Git-2.50.1-64-bit.exe" /SILENT /VERYSILENT --silent --install
Start-Sleep -Seconds 30
git clone https://cnb.cool/lgh06/daliu_post_dependencies.git  
cd daliu_post_dependencies
.\install.ps1