#!/bin/sh

# Decrypt the file
#mkdir $HOME/secure
# --batch to prevent interactive command
# --yes to assume "yes" for questions

echo "hello from decrypt_secret.sh"
echo "passphrase: $SECRET_PASSPHRASE"
#gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" \
#--output $HOME/secure/my_secret.json my_secret.json.gpg