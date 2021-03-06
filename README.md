# sendIT 

App for taking your climbing training to the next level  

## Installation

### * Windows  
[Download node.js](https://nodejs.org/en/download/) 
 
Download and launch mongodb using the official [Mongodb instructions](https://www.mongodb.com/try/download/community)

Clone this repository and launch frontend:
```bash
git clone https://github.com/EetuSeppa/sendIt # Clone this repository
cd sendIt\frontend # Navigate to frontend
npm install # Install dependencies
npm start # Launch frontend
``` 

Open a new terminal window and navigate to the project source  

Then install and launch backend:
```bash
cd backend
npm install
node server.js mongodb://localhost:27017
```

Now you can navigate to [localhost:3000](http://localhost:3000) and try out the app! 

### * macOS 

```bash
xcode-select --install # Required for brew, also usefull for developers
```

Install brew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
``` 

Install and launch mongodb:
```bash
brew tap mongodb/brew
brew update
brew install mongodb-community@5.0
brew services start mongodb-community@5.0
``` 

Install nodejs:
```bash
brew install node
``` 

Clone this repository and launch frontend:
```bash
git clone https://github.com/EetuSeppa/sendIt
cd sendIt/frontend
npm install 
npm start
``` 

Open a new terminal window and navigate to the project source  

Then install and launch backend:
```bash
cd backend
npm install
node server.js mongodb://localhost:27017
```

Now you can navigate to [localhost:3000](http://localhost:3000) and try out the app! 



