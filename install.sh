#!/bin/bash

PATH_MODULES="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../../"
[ ! -d $PATH_MODULES/udw/joiner ] && git clone https://github.com/udw/joiner $PATH_MODULES/udw/joiner -b master
source "$PATH_MODULES/udw/joiner/joiner.sh"


#
# ADD DEPENDENCIES
#

Joiner:add_repo "https://github.com/HW-Core" "js-kernel" "master" "hw-core"

