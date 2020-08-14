#!/bin/sh

# Decrypt the file
mkdir secure
# --batch to prevent interactive command
# --yes to assume "yes" for questions

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
--output secure/my_secret.json my_secret.json.gpg