# To start up this website
## IOTA modules
- You need to downgrade your Node.js version to 16 
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 16
npm use 16
```
- Type ```yarn``` in terminal to build up modules

## Frontend
```
cd frontend
yarn
yarn start
```

## Backend
```
cd backend
yarn
yarn server
```