# A shell script which when run updates git

#!/bin/bash

git add -A
printf "Please enter the commit message:\n "
read commit_message 
git commit -m commit_message
