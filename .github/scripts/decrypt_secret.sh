#!/bin/sh

# Decrypt the file
mkdir $HOME/runners/secure
# --batch to prevent interactive command
# --yes to assume "yes" for questions

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
--output $HOME/runners/secure/my_secret.json my_secret.json.gpg

echo "pwd"
pwd
echo "cd home/runners"
cd home/runners
echo "pwd"
pwd
ls -al
echo "cd ~/runners"
cd ~/runners
ls -al