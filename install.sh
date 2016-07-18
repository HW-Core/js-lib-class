#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function add_repo() {
    (git --git-dir=$DIR/$3/$1/.git/ rev-parse && git --git-dir=$DIR/$3/$1/.git/ pull origin $2) || git clone git@github.com:HW-Core/$1.git -b $2 $DIR/$3/$1 
	[ -f $DIR/$3/$1/install.sh ] && bash $DIR/$3/$1/install.sh
}

function add_file() {
    mkdir -p $2
    wget $1 -P $2
}


#
# ADD DEPENDENCIES
#

add "js-kernel" "master" "../"

