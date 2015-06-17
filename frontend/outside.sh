#!/bin/bash

# Setting correct time zone
sudo echo 'America/New_York' | sudo tee /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata

# Kick to /vagrant upon sshing in
if ! grep -q "cd /vagrant" "/home/vagrant/.bashrc"; then
  echo "cd /vagrant" >> /home/vagrant/.bashrc
fi

