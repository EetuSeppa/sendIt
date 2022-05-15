# sendIT 

App for taking your climbing training to the next level  

## Installation

### * Windows  
[Download node.js](https://nodejs.org/en/download/) 
 
[Download mongodb](https://www.mongodb.com/try/download/community)

Configure mongodb

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

Install brew using the official [Homebrew installation instructions](https://brew.sh/#install) 

Install and launch mongodb:
```bash
brew tap mongodb/brew \
brew update \
brew install mongodb-community@5.0 \
brew services start mongodb-community@5.0
``` 

Configure mongodb  

Clone this repository and launch frontend:
```bash
git clone https://github.com/EetuSeppa/sendIt \ # Clone this repository
cd sendIt\frontend \ # Navigate to frontend
npm install \ # Install dependencies
npm start # Launch frontend
``` 

Open a new terminal window and navigate to the project source  

Then install and launch backend:
```bash
cd backend \
npm install \
node server.js mongodb://localhost:27017
```

Now you can navigate to [localhost:3000](http://localhost:3000) and try out the app! 



