

<div align="center">
  <h2>Auction App 💳</h2>

  <img src="https://user-images.githubusercontent.com/28770143/227749718-6bf6ea6d-a0ff-46f5-b4d2-c14e20bafc9d.png" />
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

## 📝 Table of Contents- 
- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)

## 🧐 Problem Statement <a name = "problem_statement"></a>
The product that we are building is an online auction system
- IDEAL: We want to build a well tested online auction system that is used by users
- REALITY: We are pretty limited on the resources right, so the implementation would just be for testing purposes with the purpose of showcasing the proficiency of the developer in creating a solution for a problem.
- CONSEQUENCES: The features of the online auction system would be limited to 
  - Login and Registration
  - Deposit of virtual money
  - Adding of biddable item
  - Ability to bid on items that is created by other people.
 

## 💡 Idea / Solution <a name = "idea"></a>
Given the problem:

First, we would be building a web app, separated into 2, a front-end and a back-end. we would need to
1. Design a simple interface based on the lo-fi that we have. It should allow the users to register, log in, browser and bid for items.
  - It's important the UI is user friendly and responsive on all devices
2. We would then set up a system for user authentication and authorization. We want our users to be registered in order to bid on the items.
3. Next would be setting up the database to store all the data created in our system.


4. Once we have the basic infrastructure, we would need to implement
    - Item Listing
    - Deposit Money
    - Bidding Features (Add Bid and Completing a Bid Item)
5. On the item listing, we would have a timer to track the bidding duration, but for this project, we would have a `Force Complete Bid` button that would end the bidding process that would be used for testing the bidding functionality.

Some of the drawbacks of this auction system because it is built with an MVC-like pattern
  - We will have to implement notifications from scratch thus it doesn't have notifications for real-time update of new data, each data would be updated by another query call from the back-end caused by a user action (like Creating an item, then refetches the whole item instead of automatically feeding the data on the frontend with a message broker)
  - We would also be using MongoDB as MongoDB doesn't care about schema and since it's document-oriented it would be easier to change the model if we need to and it will also allow us to develop faster since our back-end is built with Node.js and Express while our front-end is built with Next.js (React), and since we are using Typescript, it will help with us with type safety and improved developer experience, the drawbacks with MongoDB is that the handling of data sets might be challenging because the relations are not clearly stated.
  - I also implemented a simple validation structure on the front-end and back-end, When creating a financial app, you would need a more complex validation system in place in the back-end (For example, validating if the Bid winners received the item and his money is calculated correctly based on the transaction, validating the Item owner if he received the money based from the transaction with the Bid Winners, Implementing 'micro-transactions' for transactions for security and many more). For the front-end, we could have used React Hook Form for better form handling and also yup/zod for schema validations on the client side.
 

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
You can install the app in 2 different ways. You can do it through docker or manual installation. Manual installation would need you to install different softwares in order to run the app, while with docker, you would just need docker and git. </br></br>

**Docker is the preferred method to run projects locally! This (should) avoid the _but it works on my machine_ problem.**

But if you're using Windows, I highly recommend that you should use manual installation as i didn't test this app with docker and WSL yet.

### Installing

#### Docker Installation

What things you need to install the software and how to install them.

```
docker desktop
git
```

##### 1. If you have downloaded git, clone the project. You can also download the zip if you don't want to install git.
```
git clone https://github.com/jaymendez/auction-app.git
```
![image](https://user-images.githubusercontent.com/28770143/227701654-273a6037-d25b-40af-b58a-804e33c75b73.png)


##### 2. You would need to install docker desktop based on your Operating system, you can use this guides on how to install them. 
##### Mac
https://docs.docker.com/desktop/install/mac-install/
##### Linux
https://docs.docker.com/desktop/install/linux-install/

##### 3. Rename the file sample.env to .env

##### 4. On the terminal, go to your project directory, and run these commands. It may take 2 - 5 minutes to get it running as it's installing the dependencies of the project.

```
sudo docker-compose build
sudo docker-compose up
```

##### 5. If you got the docker running, open http://localhost:3000 with your browser to see the result. This should be the app that you're seeing in your browser:
```
http://localhost:3000
```

![image](https://user-images.githubusercontent.com/28770143/227701984-c25cf085-267a-4f37-aa22-9612058b1fe1.png)

##### 6. You would have to do the same process on for this project as it needs a backend to run.
```
https://github.com/jaymendez/auction-api
```

---

#### Manual Installation

What things you need to install the software and how to install them.

On any operating system:
```
Text Editor
Node.js v16^
npm v8^
terminal
git
```


A step by step series of examples that tell you how to get your development env running.

##### 1. After installing the following softwares, run this command on your terminal
```
npm install --global yarn
```

##### 2. Clone or download the zip of the project
```
git clone https://github.com/jaymendez/auction-app.git
```
![image](https://user-images.githubusercontent.com/28770143/227701654-273a6037-d25b-40af-b58a-804e33c75b73.png)


##### 3. On your terminal, navigate to the directory of your project then run these commands, this will install the dependencies you need in order to run the project.
```
cd auction-app && yarn
```

##### 4. Rename the file sample.env to .env

##### 5. Run the development server
```
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

##### 6. You would have to do the same process on for this project as it needs a backend to run.
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
If you managed to install the frontend, backend and created your mongodb instance, you can now try and test the web app, you can skip this part and proceed to [Usage](#usage), for the general features of the app

##### 1. Start by registering an account, click the Sign In button on the upper right corner and then click Register on the modal. We are testing the register functionality here.
![image](https://user-images.githubusercontent.com/28770143/227702396-9880da0b-3514-4cc2-b826-fb066dbf6338.png)

##### 2. User your registered credentials to login in the web app. After logging in, this should be the view you're seeing. (Login Feature)
![image](https://user-images.githubusercontent.com/28770143/227702508-2fdf9346-1dfa-4c55-b016-68cf2f011148.png)


##### 3. On the upper right corner, click the user icon and it would show you your email, and balance

##### a. You have 2 actions as a user, which are Deposit Money and Add Item, depositing money would increase your balance and adding an Item, would add an item to your listing, let's try and add some money. Try clicking the Deposit Money
![image](https://user-images.githubusercontent.com/28770143/227702652-be47094d-025b-4e95-9b03-17c957b7514d.png)

##### b. Right now, you can input any amount of money, after inputting the desired amount, click Add Balance
![image](https://user-images.githubusercontent.com/28770143/227702779-951bdcb7-6b11-4938-a47f-2dac909e9e36.png)

##### c. Click the user icon again and see the amount you have now.
![image](https://user-images.githubusercontent.com/28770143/227702817-9e3d78c0-f2be-47c3-820b-cc3f49df15f5.png)

##### d. Try repeating the same step just to verify if the balance you have typed has added to your current balance.
![image](https://user-images.githubusercontent.com/28770143/227702862-253565f0-723c-460d-bb02-4a3810335996.png)
![image](https://user-images.githubusercontent.com/28770143/227702879-b7da1947-5846-45ef-809f-2ddb0eea526e.png)


##### 4. Next would be creating an Item, on the same dropdown, click Add Item, a modal would pop up and you would need to fill up these fields. 
![image](https://user-images.githubusercontent.com/28770143/227706133-85ded695-bbfe-46fc-9a84-cd77809f87b5.png)

##### 5. After creating an item, you can go change the filter on the table to My Listing so that you could see your item, newly created items are in the draft status so you would need to publish them in order for other people to see your listings.
![image](https://user-images.githubusercontent.com/28770143/227749820-8b9acccd-a30d-4f6a-be3a-c067ff338885.png)

##### 6. You can click on Publish Item in order to show them to other people, you would just have to fill up these fields. Currently, start date is defaulted to the time of publication, but you can manipulate End Date to determine on how long the item would be for Bidding.
![image](https://user-images.githubusercontent.com/28770143/227749860-1f458045-c71d-49a4-97c1-2c263d61953c.png)

##### 7. After publishing your item, other people can bid on your items. You would need to *create another account* in order to place your bid.
![image](https://user-images.githubusercontent.com/28770143/227749879-ee7cb33b-b58a-4a00-af9b-a5e1e6ad6c84.png)

##### 8. After you have Sign in on a different account, deposit money enough to bid on the item of your choosing, then click add bid on that item.
![image](https://user-images.githubusercontent.com/28770143/227750116-0cea2b83-54d3-40fc-9c61-dbf03d88aafd.png)

##### 9. The current price of the item would be updated based on the highest bidder.
![image](https://user-images.githubusercontent.com/28770143/227750146-955f302f-68be-4012-a71d-3bcf64f8edea.png)

##### 10. You can go back to your original account on where you created the item, and complete the bid. In doing so, the item would be transferred to the Bid Winner and you would have the Current Price value of the item on your account.
![image](https://user-images.githubusercontent.com/28770143/227750178-96beed60-8338-47ea-acfe-0a997fe7ba3a.png)

See the updated balance </br>
![image](https://user-images.githubusercontent.com/28770143/227750190-4ad07b06-6d38-4d17-a8a1-63dff8dc304b.png)


## 🎈 Usage <a name="usage"></a>
I will describe the basic feature of the app in this section.

#### When you access the page unauthenticated, you would be able to see
  1. a **Table** for the listing of items, it can be filtered by Status and Listing, **My Listing** is disabled as you are not logged in, it also has pagination implemented.
  2. On the top right corner, you have **Sign In** button and a toggle between dark mode and light mode
![image](https://user-images.githubusercontent.com/28770143/227750211-9abacd40-39d3-4e75-ba32-91f244e36efe.png)

#### When you logged in the auction app, you would be able to see
  1. Your own listing is now enabled on the filter, you would be able to Publish Items and Complete Bids on this section
  2. On the top right corner, you can **Deposit Money** and **Add Item**, the **Sign Out** button is also in this section
  
![image](https://user-images.githubusercontent.com/28770143/227750321-9f812f50-8ebd-4e15-a7a7-aeb134ac205a.png)


## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NextJs](https://nextjs.org/) - React Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [TypeScript](https://www.typescriptlang.org/) - Programming Language

## ✍️ Authors <a name = "authors"></a>
- [@jaymendez](https://github.com/jaymendez) - Idea & Coding work


