:: --- Configure your repo name ---
set REPO_NAME=skyblock-npc-prices

:: --- Initialize Git and GitHub repo ---
git init
git add .
git commit -m "Initial commit: SkyBlock NPC price loader scripts"
gh repo create %REPO_NAME% --public --source=. --remote=origin --push

:: --- Verify repo URL ---
git remote -v
