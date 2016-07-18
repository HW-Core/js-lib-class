#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
params="$@"

function add_repo() {
    url=$1
    name=$2
    branch=$3
    basedir=$4
    path=$DIR/$basedir/$name
    
    ([ -e $path/.git/ ] && git --git-dir=$path/.git/ rev-parse && git --git-dir=$path/.git/ pull origin $branch) || git clone $url/$name.git -b $branch $path 
	[ -f $path/install.sh ] && bash $path/install.sh $params
}

function add_file() {
    mkdir -p $2
    wget -nc $1 -P $DIR/$2
}

#
# ADD DEPENDENCIES
#

add_repo "https://github.com/HW-Core" "js-kernel" "master" "../"

