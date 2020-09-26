#!/bin/bash

  printf "\nRemoving duplicates... 👬\n"
  node src/remove_duplicates.js

  printf "\nFormatting the data... 🔥\n"
  node src/format.js

  printf "\nSaving on file... 📓\n"
  node src/save.js

  printf "\nDONE! 😎\n\n"
