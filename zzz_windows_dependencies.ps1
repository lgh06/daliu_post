Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

$ProgressPreference = 'SilentlyContinue'

# 声明变量，存储当前日期时间，格式为 年月日_时分秒  

$CurrentDateTime = Get-Date -Format "yyyyMMdd_HHmmss"


$ReqHeaders = @{
    'User-Agent' = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
}
$Uri1 = "https://cnb.cool/lgh06/daliu_post/-/git/archive/main.zip"
Invoke-WebRequest -Uri $Uri1 -Headers $ReqHeaders -OutFile "daliu_post_$CurrentDateTime.zip"

Write-Host "daliu_post_$CurrentDateTime.zip 下载完成"

Expand-Archive -Path "daliu_post_$CurrentDateTime.zip" -DestinationPath ".\daliu_post_$CurrentDateTime" -Force
Write-Host "daliu_post_$CurrentDateTime 解压完成"  

Write-Host "正在下载依赖包，大概160M 请耐心等待 ... ..." 
Write-Host "如果中途出现错误，请关闭本窗口，重新在 zzz_windows_dependencies.ps1 点击右键 使用PowerShell运行" 

$Uri2 = "https://cnb.cool/lgh06/daliu_post_dependencies/-/git/archive/main.zip"
Invoke-WebRequest -Uri $Uri2 -Headers $ReqHeaders -OutFile "daliu_post_dependencies_$CurrentDateTime.zip"  
Write-Host "daliu_post_dependencies_$CurrentDateTime.zip 下载完成"

Expand-Archive -Path "daliu_post_dependencies_$CurrentDateTime.zip" -DestinationPath ".\daliu_post_dependencies_$CurrentDateTime" -Force
Write-Host "daliu_post_dependencies_$CurrentDateTime 解压完成" 


cd  "daliu_post_dependencies_$CurrentDateTime"

# 静默安装 Node.js
$msiPath = "node-v22.17.1-x64.msi"
Write-Host "正在安装 Node.js..."
Start-Process msiexec.exe -ArgumentList "/i `"$msiPath`" /quiet /norestart" -Wait
Write-Host "Node.js 安装完成"
Start-Sleep -Seconds 6


# 静默安装 ChromeBetaStandaloneSetup64.exe
Write-Host "正在安装 Chrome Beta..."
Start-Process -FilePath ".\ChromeBetaStandaloneSetup64.exe" -Args "/silent /install"
Write-Host "Chrome Beta 安装完成"
Start-Sleep -Seconds 6
Write-Host "执行完毕 请去 daliu_post_$CurrentDateTime 执行run.bat"


# .\"Git-2.50.1-64-bit.exe" /SILENT /VERYSILENT --silent --install
# Start-Sleep -Seconds 15

# Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post_dependencies.git"
# Start-Process -FilePath "C:\Program Files\Git\cmd\git.exe" -ArgumentList " clone https://cnb.cool/lgh06/daliu_post.git"