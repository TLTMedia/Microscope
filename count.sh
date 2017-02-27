#!/bin/bash
# Count lines of file type
# args(dir, filetype)
find $1 -name "*$2" | xargs wc -l
