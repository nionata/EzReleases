#!/bin/bash

# Get the action name from package.json
ACTION_NAME=`node -pe 'JSON.parse(process.argv[1]).name' "$(cat package.json)"`
echo "----- Building $ACTION_NAME -----"

# Ensure there are action and handler files
if [ -f "action.yml" ] && [ -f "src/handler.js" ];
then
    ncc build src/handler.js -o src/build
else
    echo "Error: no action.yml or src/handler.js file(s)!"
    exit 1
fi