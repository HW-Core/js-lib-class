#!/bin/bash

PATH_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../../"
[ ! -d $PATH_ROOT ] && git clone https://github.com/udw/joiner $PATH_ROOT/udw/joiner -b master
source "$PATH_ROOT/udw/joiner/joiner.sh"


#
# ADD DEPENDENCIES
#

add_repo "https://github.com/HW-Core" "js-kernel" "master" "../"

