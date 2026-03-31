param(
  [Parameter(Mandatory = $true)]
  [string]$Name,

  [string]$BaseBranch = "main",

  [switch]$NoWorktree
)

$ErrorActionPreference = "Stop"

function Get-Slug {
  param([string]$Text)
  $slug = $Text.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
  $slug = $slug.Trim('-')
  if ([string]::IsNullOrWhiteSpace($slug)) {
    throw "Could not derive a usable slug from name: $Text"
  }
  return $slug
}

$repoRoot = (git rev-parse --show-toplevel).Trim()
$slug = Get-Slug $Name
$branchName = "idea/$slug"

if ($NoWorktree) {
  $existing = git branch --list $branchName
  if ([string]::IsNullOrWhiteSpace($existing)) {
    git switch -c $branchName $BaseBranch
  } else {
    git switch $branchName
  }
  Write-Host "Ready on branch $branchName in $repoRoot"
  exit 0
}

$worktreeRoot = Join-Path $repoRoot ".worktrees"
$worktreePath = Join-Path $worktreeRoot $slug
New-Item -ItemType Directory -Force -Path $worktreeRoot | Out-Null

$existing = git branch --list $branchName
if ([string]::IsNullOrWhiteSpace($existing)) {
  git worktree add $worktreePath -b $branchName $BaseBranch
} else {
  git worktree add $worktreePath $branchName
}

Write-Host "Created worktree: $worktreePath"
Write-Host "Branch: $branchName"
Write-Host "Use that path for speculative agent work."
