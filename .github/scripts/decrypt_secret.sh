#!/bin/sh

# Decrypt the file
mkdir $HOME/runner/secure
mkdir testing1234
# --batch to prevent interactive command
# --yes to assume "yes" for questions

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
--output $HOME/runner/secure/my_secret.json my_secret.json.gpg

echo "pwd"
pwd
ls -al
echo "cd home/runner"
cd home/runner
echo "pwd"
pwd
ls -al

echo "cd ~/runner"
cd ~/runner
ls -al