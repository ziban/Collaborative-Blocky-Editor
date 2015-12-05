# A shell script which when run will execute all the install 
# and setup functions. It also runs the program for the first time


#!/bin/bash

#Checks if a program is installed 
prog_exists() {
	type "$1" &> /dev/null;
}


#Check the type of operating system to perform the relevant install
op_num

if [[ "$OSTYPE" == "linux-gnu" ]]; then
        $op_num = 1;
        printf "Linux-gnu\n" 
elif [[ "$OSTYPE" == "darwin"* ]]; then
        $op_num = 2; 
        printf "Mac OS\n"
elif [[ "$OSTYPE" == "cygwin" ]]; then
        $op_num = 3;
        printf "Install not covered at the moment\n"
elif [[ "$OSTYPE" == "msys" ]]; then
        $op_num = 3;
        printf "Install not covered at the moment\n"
elif [[ "$OSTYPE" == "win32" ]]; then
        $op_num = 3;
        printf "Install not covered at the moment\n"
elif [[ "$OSTYPE" == "freebsd"* ]]; then
        $op_num = 4;
        printf "freebsd\n"
    fi
        
printf  "%d\n" $op_num
#Check if there is an error with the installations too

if prog_exists brew; then 
	printf "Homebrew installed on this computer\n"
else 
	printf "Homebrew not installed in this computer\n**Installing**\n"
fi


if prog_exists node; then 
	printf "Node.js installed on this computer\n"
else 
	printf "Node.js  not installed on this computer\n**Installing**\node"
fi

if prog_exists npm; then 
	printf "npm installed on this computer\n"
else 
	printf "npm  not installed on this computer\n**Installing**\node"
fi

#initialize a new git repo 
git init
#Make sure that the git
git pull https://github.com/ziban/Collaborative-Blocky-Editor.git

#Install all the dependecies 
npm install

#Execute the program
npm start



