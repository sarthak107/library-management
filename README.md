# Library Management System

A web based Library Management system built using Flask, ReactJs and SQLite.This app enables a librarian to manage a library by keeping track of 

# Index
- [Installation](#installation)
- [Requirements](#requirements)
- [Screenshots](#screenshots)
- [How to use](#how-to-use)
- [Features](#features)
- [Project Status](#project-status)

## Installation

To set up the project locally, follow these setps:

1. Open a folder where you want your project

2. Open any terminal and initialize an empty git repository locally
    ```bash
    git init
    ```
3. Now copy the link to the github repository and use it clone the repository locally:
    ```bash
    git clone https://github.com/sarthak107/library-management
    ```
4. To install the all the python modules for the project enter the following command:
    ```bash
    pip install -r requirements.txt
    ```
5. Now first go in the frontend directory using:
    ```bash
    cd frappe-frontend
    ```
6. Now run the foloowing commands to insatll all the node modules:
    ```bash
    npm install
    ```
This project is deployed at [Vercel](https://library-management-nu.vercel.app/)

To use the depolyed version:

1. Open a folder where you want your project

2. Just get the index.py, requirements.txt & database.db files using :
    ```bash
    git clone --depth=1 --filter=blob:none https://github.com/sarthak107/library-management.git --path index.py

    git clone --depth=1 --filter=blob:none https://github.com/sarthak107/library-management.git --path requirements.txt

    git clone --depth=1 --filter=blob:none https://github.com/sarthak107/library-management.git --path database.db
    ```
3. Install al the python modules using the requirements.txt:
    ```bash
    pip install -r requirements.txt
    ```
4. Now run the following command to start the backend:
    ```bash 
    python index.py
    ```

## Requirements 

* Python 3 or above (preferably Python version >= **Python v3.8**)
* Pip package manager for installing Python packages.
* Nodejs & NPM Package Manager for frontend.

## Screenshots
![image](https://github.com/sarthak107/library-management/assets/77851794/9385c4fe-d567-49a3-a168-915d2991df28)

## How to use

Once the project is running, this app can beuse in the foloowing ways:

- **Search book by title**: Seacrh any book in the library.
- **Search or Add Mmeber**: Seacrh any memeber or add anew member.
- **Delete Member**: Delete a memeber of the library
- **Keep a record of Books issued**: Keep a record of all the books that are issued.
- **Issue a Book**: Issue a book to a memeber.
- **Modify Memeber**: Modify a memeber details.
- **Return Book**: Allow members to return books.
- **Clear Debt**: Clear member debts.

## Features 

- CRUD operations on books database using Frappe API.
- CRUD operations on members database using Frappe API.
- Minimal and clean interface

## Authors 

- [SARTHAK SARAF](https://github.com/sarthak107) - Project Lead

## Project Status

🚀 Deployment: This project is currently live and operational.

🛑 Updates: I am not actively updating the project at the moment. But are open to any suggestions.

    
   
