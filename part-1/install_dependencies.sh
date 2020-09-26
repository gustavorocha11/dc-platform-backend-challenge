#!/bin/bash

if node -v && npm -v; then

  if yarn -v; then
    printf "\nInstalling yarn dependencies... 🚀\n\n"
    yarn
  else
    printf "\nERROR: You need to install yarn first 🆘\n\n"
    exit 1
  fi

  if docker -v; then
    printf "\nInstalling docker redis image... 🚀\n\n"
    docker pull redis:alpine
  else
    printf "\nERROR: You need to install docker first 🆘\n\n"
    exit 1
  fi

else
  printf "\nERROR: You need to install node and npm first 🆘\n\n"
  exit 1
fi

printf "\nSUCCESS! 🎉"
printf "\nNow run the command: bash start_container_and_server.sh 😎\n\n"
