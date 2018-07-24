#!/usr/bin/env bash

NODE_MODULES_FOLDER=node_modules

check_command_success () {
    if [ $? -ne 0 ];then
       echo "Build fail."
       exit
    fi
}

remove_folder () {
    if [ -d $1 ]; then
        rm -rf $1
        check_command_success
    fi;
}

remove_folder ${NODE_MODULES_FOLDER}

npm install
check_command_success
npm run build
check_command_success

echo "Build success!"
