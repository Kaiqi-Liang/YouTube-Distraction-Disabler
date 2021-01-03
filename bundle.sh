#!/bin/sh
version=`ls deployment | egrep "\d\.\d\.\d\.zip" | tail -1 | sed 's/\.zip//' | sed 's/\.//g' | awk '{printf "%3d", $1 + 1}' | sed 's/ /0/g' | sed -E 's/([0-9])/\1./g'`
version+=zip
zip -r deployment/$version dist