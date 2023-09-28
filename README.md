# MILAN Hostel Hackathon Project

## Table of Contents
- [MILAN Hostel Hackathon Project](#milan-hostel-hackathon-project)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Project Description](#project-description)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Contributing](#contributing)

## Introduction

Welcome to our project repository for the MILAN Hostel Inter-Hostel Hackathon! This repository contains all the code and resources for our project, which is focused on categorizing laptops based on their features using a sentiment analysis model.

In this competition, we aimed to build a web application that not only helps users identify the features of laptops but also provides sentiment analysis of reviews related to those laptops.

## Project Description

In this project, we have created a web application that allows users to:

- Browse and search for different laptop models.
- View detailed specifications and features of each laptop.
- Submit reviews and opinions on laptops.
- Utilize a sentiment analysis model to determine the sentiment of user reviews.

Our sentiment analysis model helps users understand the general sentiment (positive, negative, or neutral) of the reviews related to a particular laptop. This can be helpful for users who are considering purchasing a laptop and want to gauge customer satisfaction.

## Features

- Laptop categorization based on features.
- Detailed laptop specifications and features.
- User review submission and display.
- Sentiment analysis of user reviews.
- User-friendly web interface.

## Installation

```text
NOTE : These commands were tested on Ubuntu 22.04 .
```
To run this project locally, follow these steps:

1. Clone the repository to your local machine:


2. Install the required dependencies:


3. Run the web application:


The application should now be running locally on your machine.

## Usage

Git clone this repository in your machine.

### Backend

Ensure you have python version install 3.11 .
```shell
pip install fastapi = "^0.103.1"
pip install firebase = "^4.0.1"
pip install python-dotenv = "^1.0.0"
pip install uvicorn = "^0.23.2"
pip install firebase-admin = "^6.2.0"
pip install tensorflow = "^2.13.0"
pip install pandas = "^2.1.1"
pip install cython = "^3.0.2"
pip install ktrain = "^0.38.0"
```

### Frontend

Ensure that you have npm installed.
```shell
npm i --app 
```
### Model Link
https://drive.google.com/drive/folders/1ykhVT2Dvoqj9Xo93a5ZqCi8dytVCcbh7?usp=sharing

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push your changes to your fork: `git push origin feature/new-feature`.
5. Create a pull request on the main repository.
