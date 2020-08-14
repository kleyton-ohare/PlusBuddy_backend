#!/bin/sh

# Decrypt the file

# create a temporary folder in the VM to store the file
mkdir secure

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
#        to temporary          from original folder
--output secure/my_secret.json secure/my_secret.json.gpg

# Tutorial
# https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#limits-for-secrets