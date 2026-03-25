param(
  [Parameter(Mandatory = $true)]
  [string]$ScriptPath,

  [string]$Database,

  [string]$DbHost = 'localhost',

  [int]$Port = 5432,

  [string]$User = 'postgres',

  [string]$Password
)

$ErrorActionPreference = 'Stop'

$resolvedScriptPath = (Resolve-Path $ScriptPath).Path
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

[Console]::InputEncoding = $utf8NoBom
[Console]::OutputEncoding = $utf8NoBom
$OutputEncoding = $utf8NoBom

$env:PGCLIENTENCODING = 'UTF8'

if ($PSBoundParameters.ContainsKey('Password') -and $null -ne $Password -and $Password -ne '') {
  $env:PGPASSWORD = $Password
}

$psqlArgs = @(
  '-v', 'ON_ERROR_STOP=1',
  '-h', $DbHost,
  '-p', $Port,
  '-U', $User
)

if ($Database) {
  $psqlArgs += @('-d', $Database)
}

$psqlArgs += @('-f', $resolvedScriptPath)

try {
  & psql @psqlArgs
}
finally {
  Remove-Item Env:PGCLIENTENCODING -ErrorAction SilentlyContinue

  if ($PSBoundParameters.ContainsKey('Password')) {
    Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
  }
}