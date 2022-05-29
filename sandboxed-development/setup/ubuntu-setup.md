# Ubuntu Setup

## Install

To install all the local tools we will need you can run the following commands.

This is optional but will allow for `sudo` access without entering a password.

```bash
 echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo EDITOR='tee -a' visudo
```

This script is in the [lzysh/local-development-setup](https://github.com/lzysh/local-development-setup/blob/main/ubuntu/setup.sh) repo.

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/lzysh/local-development-setup/main/ubuntu/setup.sh)"
```

Change your default shell to Zsh and exit.

```
chsh -s /home/linuxbrew/.linuxbrew/bin/zsh; exit
```

When you start the terminal you will be prompted to set up [Powerlevel10k](https://github.com/romkatv/powerlevel10k). Choose the options you like and go!

Once complete you can stay up to date by running the generated update script.

```
~/bin/update.sh
```
