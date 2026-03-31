param(
  [Parameter(Mandatory = $true)]
  [string]$Name,

  [switch]$DeleteBranch
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
$worktreePath = Join-Path (Join-Path $repoRoot ".worktrees") $slug

if (Test-Path $worktreePath) {
  git worktree remove $worktreePath
  Write-Host "Removed worktree: $worktreePath"
} else {
  Write-Host "No worktree found at: $worktreePath"
}

git worktree prune | Out-Null

if ($DeleteBranch) {
  $existing = git branch --list $branchName
  if (-not [string]::IsNullOrWhiteSpace($existing)) {
    git branch -D $branchName
    Write-Host "Deleted branch: $branchName"
  } else {
    Write-Host "No branch found: $branchName"
  }
}
