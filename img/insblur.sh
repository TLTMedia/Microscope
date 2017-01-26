#!/bin/bash
# Usage: ./insblur.sh $1
sed -i '' '5i\
<filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>
' $1
