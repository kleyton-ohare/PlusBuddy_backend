#!/bin/sh

# Decrypt the file

# create a folder in the VM to store the file
mkdir secure

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
--output secure/my_secret.json secure/my_secret.json.gpg
#        to temporary          from original folder > file storage

# Tutorial
# https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#limits-for-secrets