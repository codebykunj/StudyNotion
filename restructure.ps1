Move-Item -Path "my-app\server" -Destination "server"
Rename-Item -Path "my-app" -NewName "frontend"

Remove-Item -Recurse -Force "frontend\mini-project"

New-Item -ItemType Directory -Force -Path "frontend\scripts"
Move-Item -Path "frontend\reset.js", "frontend\test_signup.js", "frontend\test_signup2.js", "frontend\test_signup3.js" -Destination "frontend\scripts" -ErrorAction SilentlyContinue

New-Item -ItemType Directory -Force -Path "server\scripts"
Move-Item -Path "server\reset_pwd.js", "server\seedAdmin.js", "server\seedCategories.js", "server\seed_courses.js", "server\setup_user.js", "server\test_full_auth.js" -Destination "server\scripts" -ErrorAction SilentlyContinue
