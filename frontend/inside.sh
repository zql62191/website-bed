#!/bin/bash

# Setting correct time zone
sudo echo 'America/New_York' | sudo tee /etc/timezone
sudo dpkg-reconfigure -f noninteractive tzdata

# No docs for gems
echo "gem: --no-rdoc --no-ri" > /home/vagrant/.gemrc
echo "install: --no-rdoc --no-ri" >> /home/vagrant/.gemrc
echo "update: --no-rdoc --no-ri " >> /home/vagrant/.gemrc

# Install bundler
gem install bundler

# Reload source
source ~/.rvm/scripts/rvm

# Go to shared directory
cd /vagrant

# Install gems
bundle install --verbose

# Install node modules
npm install --verbose

# Kick to /vagrant upon sshing in
if ! grep -q "cd /vagrant" "/home/vagrant/.bashrc"; then
  echo "cd /vagrant" >> /home/vagrant/.bashrc
fi

