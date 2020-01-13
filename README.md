# ews-inflation
EWS Inflation

How to deploy The Early Warning System Inflation

1. Installing NodeJS 
   https://nodejs.org/en/download/
2. Installing PM2 
   npm install pm2@latest -g
3. Installing GIT and cloning project ews-landingpage. 
   git clone https://github.com/hendrik49/ews-landingpage
4. cd to directory ews-landing page execute 
   pm2 start npm --name=inflation -- start
5. Check the web is running by execute
   pm2 status
6. Access the web on http://IP:33333
