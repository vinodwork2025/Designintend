#!/usr/bin/env bash
# verify-site.sh — Design Intend site integrity checks
# Exit non-zero on any failure.

set -euo pipefail
SITE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FAIL=0

pass() { echo "PASS: $*"; }
fail() { echo "FAIL: $*"; FAIL=1; }

# --- Check 1: Dead files must not exist ---
for dead in "index-1.html" "_zoho_crm_panel.html"; do
  if [ -e "$SITE_ROOT/$dead" ]; then
    fail "Dead file still exists: $dead"
  else
    pass "Dead file absent: $dead"
  fi
done

# --- Check 2: No folders under projects/ ---
if find "$SITE_ROOT/projects" -mindepth 1 -maxdepth 1 -type d | grep -q .; then
  fail "Folders found under projects/ — all project pages must be flat files"
  find "$SITE_ROOT/projects" -mindepth 1 -maxdepth 1 -type d
else
  pass "No folders under projects/ (all flat files)"
fi

# --- Check 3: Every .html page (except 404.html) has exactly one <h1> and one self-referencing canonical (no trailing slash) ---
H1_FAIL=0
CANONICAL_FAIL=0
while IFS= read -r -d '' f; do
  name="$(basename "$f")"
  [ "$name" = "404.html" ] && continue

  # H1 count
  h1count=$(grep -ic '<h1' "$f" || true)
  if [ "$h1count" -ne 1 ]; then
    fail "H1 count=$h1count in $f"
    H1_FAIL=1
  fi

  # Canonical: must exist, href must not end in / (except homepage) and must not contain .html
  canonical=$(grep -oi 'rel="canonical"[^>]*href="[^"]*"' "$f" | grep -oi 'href="[^"]*"' | head -1 | sed 's/href="//;s/"//')
  if [ -z "$canonical" ]; then
    fail "No canonical in $f"
    CANONICAL_FAIL=1
  else
    # Must not end with trailing slash (except root / is allowed)
    if echo "$canonical" | grep -qE './$' && [ "$canonical" != "https://designintend.com/" ]; then
      fail "Canonical has trailing slash: $canonical in $f"
      CANONICAL_FAIL=1
    fi
    # Must not contain .html
    if echo "$canonical" | grep -q '\.html'; then
      fail "Canonical contains .html: $canonical in $f"
      CANONICAL_FAIL=1
    fi
  fi
done < <(find "$SITE_ROOT" -name "*.html" \
  -not -path "$SITE_ROOT/projects/*/index.html" \
  -print0)

[ "$H1_FAIL" -eq 0 ] && pass "All pages have exactly one <h1>"
[ "$CANONICAL_FAIL" -eq 0 ] && pass "All canonicals present, no trailing slash, no .html"

# --- Check 4: No _redirects target is also a source (no chains) ---
REDIRECTS="$SITE_ROOT/_redirects"
CHAIN_FAIL=0
while IFS= read -r line; do
  # Skip comments and blank lines
  [[ "$line" =~ ^#.*$ || -z "${line// }" ]] && continue
  # Extract source and target (first two tokens)
  src=$(echo "$line" | awk '{print $1}')
  tgt=$(echo "$line" | awk '{print $2}')
  # Skip pattern/splat targets
  [[ "$tgt" == *":splat"* || "$tgt" == *"*"* ]] && continue
  # Check if target appears as a source in another rule
  if grep -qE "^[[:space:]]*${tgt}[[:space:]]" "$REDIRECTS" 2>/dev/null; then
    fail "Redirect chain: $src -> $tgt -> (another target)"
    CHAIN_FAIL=1
  fi
done < "$REDIRECTS"
[ "$CHAIN_FAIL" -eq 0 ] && pass "No redirect chains in _redirects"

# --- Check 5: sitemap.xml <loc> entries — no trailing slash, no .html ---
SITEMAP="$SITE_ROOT/sitemap.xml"
SITEMAP_FAIL=0
while IFS= read -r loc; do
  if echo "$loc" | grep -q '\.html'; then
    fail "sitemap <loc> contains .html: $loc"
    SITEMAP_FAIL=1
  fi
  # Trailing slash check (allow root https://designintend.com/)
  if echo "$loc" | grep -qE '/$' && [ "$loc" != "https://designintend.com/" ]; then
    fail "sitemap <loc> has trailing slash: $loc"
    SITEMAP_FAIL=1
  fi
done < <(grep -oP '(?<=<loc>)[^<]+' "$SITEMAP")
[ "$SITEMAP_FAIL" -eq 0 ] && pass "All sitemap <loc> entries clean (no .html, no trailing slash)"

# --- Check 6: No page references index-1 or _zoho ---
REF_FAIL=0
if grep -rl 'index-1\|_zoho' "$SITE_ROOT" --include="*.html" --include="*.txt" --include="*.xml" 2>/dev/null | grep -qv "^Binary"; then
  fail "Pages still reference index-1 or _zoho:"
  grep -rl 'index-1\|_zoho' "$SITE_ROOT" --include="*.html" --include="*.txt" --include="*.xml" 2>/dev/null
  REF_FAIL=1
fi
[ "$REF_FAIL" -eq 0 ] && pass "No references to index-1 or _zoho in HTML/txt/xml"

echo ""
if [ "$FAIL" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  echo "SOME CHECKS FAILED — fix before deploying"
  exit 1
fi
