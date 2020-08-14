#!/bin/sh

# Decrypt the file
mkdir $HOME/secure
# --batch to prevent interactive command
# --yes to assume "yes" for questions

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
--output $HOME/secure/my_secret.json my_secret.json.gpg

echo "commands:"
pwd
cd home/runner/work/PlusBuddy_backend/PlusBuddy_backend
pwd
ls -al