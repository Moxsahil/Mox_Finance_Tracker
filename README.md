
###

<h1 align="start">Hey there 👋</h1>

<div align="center">
  <a href="https://www.linkedin.com/in/sahil-barak-865063216/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="linkedin logo"  />
  </a>
  <a href="https://www.youtube.com/@MOXGamingYT01" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Youtube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="youtube logo"  />
  </a>
  <a href="https://www.instagram.com/moksshhh_.20/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=E4405F&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="instagram logo"  />
  </a>
  <a href="https://my-portfolio-three-pi-92.vercel.app/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=portfolio&logo=portfolio&label=&color=B05923&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="portfolio logo"  />
  </a>
</div>

###

# MOX FINANCE TRACKER APP


**MOX Finance Tracker** is a personal finance management application designed to help users efficiently track their financial activities. With MOX, users can add and manage transactions, organize multiple accounts, and gain insights into their categories. The intuitive interface ensures seamless navigation, making budgeting and expense tracking more convenient. Whether managing daily expenses or monitoring overall financial status, MOX Finance Tracker provides a user-friendly and effective solution.

## 🚀 Features

- Modern and attractive UI interface displays **available balance**, **income**, and **expenses**
- **Transaction Management** – Ability to add, edit, and delete transactions.
- **Account Management** – Manage multiple bank accounts or wallets.
- **Date Filtering & Sorting** – View transactions by date, amount, or category.
- **Category Tagging**– Categorize transactions (e.g., Food, Bills, Shopping).
- **Dark/Light Theme Toggle** – Since you wanted a theme switcher.
- **Analytics & Reports** – Graphs or insights on spending habits.
- **Authentication (Clerk)** – Secure login and user-specific data



## 📂 Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Images](#Project_Images)
- [Learn More](#learn-more)
- [License](#license)

## 🛠 Installation

Ensure you have **Node.js** installed. Then, clone the repository and install dependencies:

```bash
git clone https://github.com/Moxsahil/Mox_Finance.git
```
```bash
cd Mox_Finance
```
```bash
npm install  # or yarn install, pnpm install, bun install
```

## 🚦 Getting Started

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## To access the Database

To generate schema file:

```bash
npm run db:generate
# or
yarn dev db:generate
# or
pnpm dev db:generate
# or
bun dev db:generate
```
Run this to use migration 
```bash
npm run db:migrate
# or
yarn dev db:migrate
# or
pnpm dev db:migrate
# or
bun dev db:migrate
```

To start and view database, Run 

```bash
npm run db:studio
# or
yarn dev db:studio
# or
pnpm dev db:studio
# or
bun dev db:studio
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

Open [https://local.drizzle.studio](https://local.drizzle.studio) in your browser to see the running databse.

## ⚙️ Configuration

To run this project, you will need to add the following `environment variables` to your .env file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` ,  `CLERK_PUBLISHABLE_KEY` , `CLERK_SECRET_KEY` , `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` , `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` 

* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_PUBLISHABLE_KEY` both have the same key

## 🚀 Project Images

Project UI **Images**.

![Image](https://github.com/user-attachments/assets/744d9f3a-4206-449a-b561-d5c3885930a9)

![Image](https://github.com/user-attachments/assets/3c372728-2399-49de-b022-23d8e367bcc4)

![Image](https://github.com/user-attachments/assets/6fefb76a-b9a5-4575-95e6-0c5e9ae1b472)

![Image](https://github.com/user-attachments/assets/3a8b5d5e-b69d-40a8-8cbb-dc5d8f085aa9)

![Image](https://github.com/user-attachments/assets/3db7e66f-a897-4ba1-8fb5-a65bc8bd9c4c)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Detailed API and feature documentation.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Contribute and explore community contributions.
- [Learn Next.js](https://nextjs.org/learn) - An interactive learning resource.

## 📜 License

This project is licensed under the **MIT License**.
