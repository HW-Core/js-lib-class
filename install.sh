#!/bin/bash

PATH_MODULES="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../../"
[ ! -d $PATH_MODULES/uwd/joiner ] && git clone https://github.com/uw-dev/joiner $PATH_MODULES/uwd/joiner -b master
source "$PATH_MODULES/uwd/joiner/joiner.sh"


#
# ADD DEPENDENCIES
#

Joiner:add_repo "https://github.com/HW-Core" "js-kernel" "master" "../"

