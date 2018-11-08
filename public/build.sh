#!/bin/bash

config=`cat config.json`
script=`cat booking-poc.js`
script="${script/__config__/$config}"
dir=`pwd`
echo $script > "$dir/booking-poc.js"
