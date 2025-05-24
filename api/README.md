<br/>
<div align="center">
   <img 
      alt="atom with protractor" 
      src="../assets/images/splash-icon.png"
      width="240px"
   />
</div>

<h1 align="center">
   Expo for Architects 📐 <br/>API
</h1>

<h3 align="center">
An example fullstack cross-platform application with machine learning integrations for iOS, Android and the Web.
<hr>
</h3>
## Prerequisites

- `nvm` (Node Version Manager) and the long-term supported (LTS) verion of Node.js (I'm using Node 22.14), which you can download here: https://nodejs.org/en/download.
- Python 3 should be installed (I'm using Python 3.11 at the start of this project), which you can download here: https://www.python.org/downloads/
- A virtual environment created with a tool such as `venv`, which you can learn how to set up here: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/

## Installing Node.js Project Dependencies
Run the following command:
```bash
api $ npm install
```

## Installing Python Project Dependencies 
### via `venv`
Once you create a `venv` virtual environment inside a clone of this repo, run the following command:
```bash
$ pip install -r requirements.txt
```
### via `conda`
The `requirements.txt` file may be used to create an environment using the following commad:
```bash
$ conda create --name your_env_name_here --file requirements.txt
```

## Running API Project
Run the following command:
```bash
api $ npm start
```