# Energy-Monitoring-And-Control
A user application to monitor and control the energy usage in Kohli Research Block, International Institute Of Information Technology, Hyderabad

These instructions will get you a copy of the project up and running on your local machine. You will be able to access, based on your permissions alloted to you, the following features:
| | |
| --- | --- |
|HOBOlink graphs | All Users |
| AC Control | Administrator, Space User |
| Request For AC Control | Space User |
| View Temperature | Space User, Administrator |
| Email Alert | Administrator |

It is recommeded that the following two commands are run before installation on Linux:
```
sudo apt-get update -y
sudo apt-get upgrade -y
```

## System Requirements

###  Git

For Linux: 
```bash
sudo apt-get install git -y
```
[Intstall and configure git](https://www.linode.com/docs/development/version-control/how-to-install-git-and-clone-a-github-repository/).

###  Node

For Linux: 
```bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```
The `nodejs` package has both the `node` and `npm` binaries.

###  MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

The following system requirements are for the **BACnet** backend componant:

###  Python `(2.7.17)`

This is the latest Python 2 release and can be installed along with its `pip` on Linux:
```
    sudo apt install python2.7 python-pip
```

###  Swig

Swig is a compiler that makes it easy to integrate C code with python.

On Linux:
```
    sudo apt-get install -y swig
```

###  sMAP `(2.0)`

Protocol which easily and quickly exposes and publishes time-series data from a wide variety of sensors simply and flexibly.

On Linux:
```
    pip install smap
```

The following system requirements are for the **HOBOlink** backend componant:

### Python`(3.X)`

On Linux:
```
sudo apt-get install python3 python3-pip
```





## Setup

To set up the **BACnet** backend componant follow the following steps:

###  Library Packages

Install the following libraries using the command given:
```
    sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 python-dev
```

Now, follow the following steps to set up the BACnet paths:
```
    cd dass05/src/BACNET/libraries
    sudo cp -r lib32 /
    sudo cp -r libx32 /
```

To troubleshoot any error refer to this [link](https://stackoverflow.com/questions/26053982/setup-script-exited-with-error-command-x86-64-linux-gnu-gcc-failed-with-exit?page=1&tab=votes&fbclid=IwAR1rsxEByUDfidMkHuE6i6C39aKn7s6Ai_qOITq8LIxJdggj8Eaiatk8sNI#tab-top).

To test if the BACnet scripts can now be run on your system follow the following steps.

```
cd dass05/BACnet/pybacnet/tools
python bacnet-scan.py
```
If there are no errors , it means pybacnet and all the dependancies required for BACnet communication have been installed correctly.

To setup the backend **HOBOlink** componant the following steps must be followed:

### Libraries 

Install the following libraries using the `pip` command:

```
pip3 install beautifulsoup4
pip install pandas
pip3 install requests
pip3 install urllib
pip3 install statistics 
pip3 install matplotlib
```

## Running the application

1. git clone [this](https://gitlab.com/dass-2020/dass05) repository
2. cd dass05/src

### Running  the Mongo daemon

1. Open the terminal
2. Run:
   ``` 
        sudo mongod
    ```
Mongo will now be running on port `27017`

### Running Express

Open a new terminal window `(Ctrl + Shift + T)` and run the following commands
```   
   cd  react-material-backend
   npm install
   npm start
```

### Running React

Open a new terminal window `(Ctrl + Shift + T)` and run the following commands
```
    cd  react-material-frontend
    npm install
    npm start
```
   
Navigate to localhost:3000/ in your browser to view and use the application!

## Important Scripts
### BACnet
These scripts can be found at:
```
    cd dass05/src/BACnet
```

* `bacnet-scan.py`: Get the current data of all ACs, thats 28 properties each of 77 ACs.
* `changetemp.py`: Change temperature of an AC. 
    <br> Run as: 
    ```bash
        python changetemp.py <AC Number> <Desired Temperature>
    ```
* `checkstatus.py`: Check status of an AC. 
  <br> Run as:
    ```bash
        python checkstatus.py <AC Number>
    ```
* `checktemp.py`: Check temperature of an AC. 
  <br> Run as:
    ```    
        python checktemp.py <AC Number>
    ```
* `logdata.py`: 
  It logs ACs data when connected to a local mongodb database that is currently set up on the local system at KRB. Data every 10 mins using cronjob syscall and stored it locally.

* `off.py`: Switch off an AC. 
  <br> Run as:
    ```
        python off.py <AC Number>
    ```

* `on.py`: Switch on an AC. 
  <br> Run as:
    ```
        python on.py <AC Number> 
    ```

### HOBOlink
These scripts plot data extracted from the Hobolink cloud can be found at:
```
    cd dass05/src/BACnet
```

* `daily_HOBOlink.py`: Plots graphs for each of 8 properties using data of the last 24 hours. 
  
* `properties_HOBOlink.py`: Plots one graph for the past month data of all 8 properties.
  
* `versus_HOBOlink.py`: Plots graphs of a combination of two properties using past 24 hours data.
  
## Features
### HOBOlink graphs
### AC Control
### Request for AC Control
### View Temperature
### Email Alert

## Further Work
- [ ] Automation of email alert based on overuse data
- [ ] 3D visualization for the overview of KRB
- [ ] Occupancy sensor integration
- [ ] WattNode sensor integration
