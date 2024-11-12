# Drone Management App

This is a Node.js application for managing drones and their battery levels. The app provides REST API endpoints to register drones, load medications onto drones, check available drones for loading, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Environment Variables](#3-set-environment-variables)
  - [4. Start the App](#4-start-the-app)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm (Node Package Manager)
- MongoDB (or use the provided MongoDB in-memory database)

## Getting Started

Follow these steps to get the app up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/olashina201/nodejs-technical-test.git
cd nodejs-technical-test
```

### 2. Install Dependencies
```bash
npm install
```


### 3. Set Environment Variables
```bash
cp .env.example .env
```


### 4. Start the App
```bash
npm run dev
```

### 5. Usage

Once the app is running, you can interact with it using API clients like `curl`, Postman, or by making HTTP requests from your code.

#### Registering a Drone

To register a new drone, make a POST request to the `/drone` endpoint with the required data in the request body.

Example:

```http
POST /drone
Content-Type: application/json

{
  "serial_number": "DRN123",
  "model": "Lightweight",
  "weight_limit": 300,
  "battery_capacity": 80,
  "state": "IDLE"
}
```

#### Load Drone with medication Items

To Load a drone with medication item, make a POST request to the `/drone/load/:droneId` endpoint with the required data in the request body.

Example:

```http
POST /drone/load/:droneId
Content-Type: application/json

{
  "name": "Medication123",
  "weight": 0.25,
  "code": "MED_456",
  "image": "https://example.com/medication123.jpg"
}
```

#### Get Loaded Medications

To get loaded medications on a drone, make a GET request to the `/drone/loaded/:droneId` endpoint.

Example:

```http
GET /drone/loaded/:droneId
Content-Type: application/json
```

#### Get Drone Battery Level

To get a drone battery level, make a GET request to the `/drone/battery/:droneId` endpoint.

Example:

```http
GET /drone/battery/:droneId
Content-Type: application/json
```

#### Get Drone Available Loading

To get a drone available for loading, make a GET request to the `/drone/available` endpoint.

Example:

```http
GET /drone/available
Content-Type: application/json
```


### 5. Documentation Link

---
[Postman Documentation Link](https://documenter.getpostman.com/view/16326791/2s9Y5SW5Z9)

## Drones

[[_TOC_]]

---

:scroll: **START**


### Introduction

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

---

### Task description

We have a fleet of **10 drones**. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case **the load is medications**.

A **Drone** has:
- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500kg max);
- battery capacity (percentage);
- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

Each **Medication** has: 
- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).

Develop a service via REST API that allows clients to communicate with the drones (i.e. **dispatch controller**). The specific communication with the drone is outside the scope of this task. 

The service should allow:
- registering a drone;
- loading a drone with medication items;
- checking loaded medication items for a given drone; 
- checking available drones for loading;
- check drone battery level for a given drone;

> Feel free to make assumptions for the design approach. 

---

### Requirements

While implementing your solution **please take care of the following requirements**: 

#### Functional requirements

- There is no need for UI;
- Prevent the drone from being loaded with more weight that it can carry;
- Prevent the drone from being in LOADING state if the battery level is **below 25%**;
- Introduce a periodic task to check drones battery levels and create history/audit event log for this.

---

#### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory);
- Required data must be preloaded in the database.
- Unit tests are optional but advisable (if you have time);
- Advice: Show us how you work through your commit history (make atomic commits).

---

:scroll: **END**