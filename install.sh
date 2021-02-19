#!/bin/bash

# Any installation related commands
sudo apt install -y postgresql
sudo apt install -y postgresql-client
sudo apt-get install -y nodejs
sudo apt-get install -y npm

# Any configuration related commands
sudo -u postgres psql -U postgres -c "alter user postgres with password 'password';"
sudo -u postgres psql -U postgres -f meme-backend/init.sql
