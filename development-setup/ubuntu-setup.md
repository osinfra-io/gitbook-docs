# Ubuntu

<figure><img src="../.gitbook/assets/ubuntu-logo.png" alt=""><figcaption></figcaption></figure>

## Install

To install all the local tools we will need you can run the following commands.

This is optional but will allow for `sudo` access without entering a password.

```bash
 echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo EDITOR='tee -a' visudo
```

This script is in the [osinfra-io/local-development-setup](https://github.com/osinfra-io/local-development-setup) repo.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/osinfra-io/local-development-setup/main/ubuntu/setup.sh)"
```

Change your default shell to Zsh and exit.

```bash
chsh -s /home/linuxbrew/.linuxbrew/bin/zsh; exit
```

When you start the terminal you will be prompted to set up [Powerlevel10k](https://github.com/romkatv/powerlevel10k). Choose the options you like and go!

Once complete you can stay up to date by running the generated update script.

```bash
~/bin/update.sh
```
