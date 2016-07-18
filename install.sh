#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function add_repo() {
    (git --git-dir=$DIR/$3/$1/.git/ rev-parse && git --git-dir=$DIR/$3/$1/.git/ pull origin $2) || git clone git@github.com:HW-Core/$1.git -b $2 $DIR/$3/$1 
}

function add_file() {
    mkdir -p $2
    wget $1 -P $2
}

add "js-kernel" "master" "../"

