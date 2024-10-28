# IOTIX
Scalping is a major problem in concert ticket sales. Organizers often require buyers to use their real names to combat this issue. However, in today's privacy-focused world, collecting personal information like ID numbers, birthdays, and phone numbers raises concerns about data breaches, which worries consumers.
To address these concerns, we have created a new ticketing website using IOTA technology. IOTA's secure and transparent nature protects personal information and prevents scalping.

## Features
- Using decentralized identities with limited personal information disclosed
- Using smart contracts for trust and transparency to prevent scalper tickets
- Using face recognition for identity verification at the entrance of concerts 

## IOTA modules
- You need to downgrade your Node.js version to 16 
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 16
nvm use 16
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
