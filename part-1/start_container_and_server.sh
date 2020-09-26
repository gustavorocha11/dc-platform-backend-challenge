#!/bin/bash

if !(docker start redis-dc-platform); then
  printf "\nCreating docker redis image... 🚀\n\n"
  docker run --name redis-dc-platform -p 6379:6379 -d -t redis:alpine
fi

printf "\nStarting dev server... 🙌\n\n"
yarn start
