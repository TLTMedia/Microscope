#!/bin/bash
sed -i '' '4i\
<filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>
' $1

