Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

# 声明变量，存储当前日期时间，格式为 年月日_时分秒  

$CurrentDateTime = Get-Date -Format "yyyyMMdd_HHmmss"


$ReqHeaders = @{
    'User-Agent' = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
}
$Uri1 = "https://cnb.cool/lgh06/daliu_post/-/git/archive/main.zip"
Invoke-WebRequest -Uri $Uri1 -Headers $ReqHeaders -OutFile "daliu_post_$CurrentDateTime.zip"

Expand-Archive -Path "daliu_post_$CurrentDateTime.zip" -DestinationPath ".\daliu_post_$CurrentDateTime" -Force



$Uri2 = "https://cnb.cool/lgh06/daliu_post_dependencies/-/git/archive/main.zip"
Invoke-WebRequest -Uri $Uri2 -Headers $ReqHeaders -OutFile "daliu_post_dependencies_$CurrentDateTime.zip"  

Expand-Archive -Path "daliu_post_dependencies_$CurrentDateTime.zip" -DestinationPath ".\daliu_post_dependencies_$CurrentDateTime" -Force


# 静默安装 Node.js
$msiPath = "node-v22.17.1-x64.msi"

if (Test-Path $msiPath) {
    Write-Host "正在安装 Node.js..."
    Start-Process msiexec.exe -ArgumentList "/i `".\daliu_post_dependencies_$CurrentDateTime\$msiPath`" /quiet /norestart" -Wait
    Write-Host "Node.js 安装完成"
	Start-Sleep -Seconds 6
} else {
    Write-Host "错误：找不到 $msiPath 文件"
    exit 1
}

# 静默安装 ChromeBetaStandaloneSetup64.exe
.\daliu_post_dependencies_$CurrentDateTime\ChromeBetaStandaloneSetup64.exe --silent --install
Write-Host "Chrome Beta 安装完成"
Start-Sleep -Seconds 6



# .\"Git-2.50.1-64-bit.exe" /SILENT /VERYSILENT --silent --install
# Start-Sleep -Seconds 15

# Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post_dependencies.git"
# Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post.git"