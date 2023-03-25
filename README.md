# Auction App

<div align="center">
  <h2>🔥 nextjs-auction-app </h2>
  <p> LIVE DEMO: https://auction-app-jaymendez.vercel.app/ </p>
  <p>an Auction App made with Next.js, Typescript and Tailwind</p>
  <p>Backend was made with Node.js, Express, Typescript and MongoDB</p>
  <p>Made by Jay Mendez</p>
</div>
<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
Purpose of this project is to build an online auction system where user can create and bid on items.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install the software and how to install them.

On any operating system:
```
Text Editor
Node.js v16^
npm v8^
terminal
git
```

### Installing
A step by step series of examples that tell you how to get your development env running.

#### 1. After installing the following softwares, run this command on your terminal
```
npm install --global yarn
```

#### 2. Clone or download the zip of the project
```
git clone https://github.com/jaymendez/auction-app.git
```
![image](https://user-images.githubusercontent.com/28770143/227701654-273a6037-d25b-40af-b58a-804e33c75b73.png)


#### 3. On your terminal, navigate to the directory of your project then run these commands, this will install the dependencies you need in order to run the project.
```
cd auction-app && yarn
```

#### 4. Rename the file sample.env to .env

#### 5. Run the development server
```
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

#### 6. You would have to do the same process on for this project as it needs a backend to run.
```
https://github.com/jaymendez/auction-api
```
This should be the app that you're seeing in your browser:
![image](https://user-images.githubusercontent.com/28770143/227701984-c25cf085-267a-4f37-aa22-9612058b1fe1.png)


## 🔧 Running the tests <a name = "tests"></a>
The test for the frontend was made with React testing library and Jest

#### Run this command in order to run the tests.
```
yarn test
```

### End to end test for user
If you managed to install the frontend, backend and created your mongodb instance, you can now try and test the web app.

#### 1. Start by registering an account, click the Sign In button on the upper right corner and then click Register on the modal. We are testing the register functionality here.
![image](https://user-images.githubusercontent.com/28770143/227702396-9880da0b-3514-4cc2-b826-fb066dbf6338.png)

#### 2. User your registered credentials to login in the web app. After logging in, this should be the view you're seeing. (Login Feature)
![image](https://user-images.githubusercontent.com/28770143/227702508-2fdf9346-1dfa-4c55-b016-68cf2f011148.png)


#### 3. On the upper right corner, click the user icon and it would show you your email, and balance

##### a. You have 2 actions as a user, which are Deposit Money and Add Item, depositing money would increase your balance and adding an Item, would add an item to your listing, let's try and add some money. Try clicking the Deposit Money
![image](https://user-images.githubusercontent.com/28770143/227702652-be47094d-025b-4e95-9b03-17c957b7514d.png)

##### b. Right now, you can input any amount of money, after inputting the desired amount, click Add Balance
![image](https://user-images.githubusercontent.com/28770143/227702779-951bdcb7-6b11-4938-a47f-2dac909e9e36.png)

##### c. Click the user icon again and see the amount you have now.
![image](https://user-images.githubusercontent.com/28770143/227702817-9e3d78c0-f2be-47c3-820b-cc3f49df15f5.png)

##### d. Try repeating the same step just to verify if the balance you have typed has added to your current balance.
![image](https://user-images.githubusercontent.com/28770143/227702862-253565f0-723c-460d-bb02-4a3810335996.png)
![image](https://user-images.githubusercontent.com/28770143/227702879-b7da1947-5846-45ef-809f-2ddb0eea526e.png)











### And coding style tests
Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>
Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>
Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>
- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Hat tip to anyone whose code was used
- Inspiration
- References

