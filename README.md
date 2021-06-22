## Website Content Change Detection Frontend
This is the frontend of the detector. It shows the diffs between versions of website with git style UI.

## Instruction
git clone https://github.com/inanisvitae/WebChangeAgent.git <br />

### Description


### Development build
yarn <br />
yarn start <br />
### Production build
yarn <br />
yarn build <br />
yarn serve <br />

### Deployed instance
It is deployed on <br />
https://changedetectorfrontend.herokuapp.com/ <br />
Initial loading can take some time because heroku puts apps to sleep after some minutes.

### Server
Server is deployed on <br />
https://changedetectorserver.herokuapp.com/


### Objective
This project aims to monitor the changes made to website hosted on a designated URL and present 
 the changes in github-style manner, so user is able to see the differences between old version 
and new version of the website. User is allowed to select different versions to compare. 
Then server will return two versions of server, an old version and a new one, along with 
diff patch generated by server. In the end, user is able to see the comparison of two versions. 

### Method
Essentially, server visits the designated URL every 1 minute and scrapes the current html, then it saves it locally in the disk for future review. After patch file is generated, server stores it on local disk. 

### Tools
Multiple frameworks and libraries are used in this projec. For frontend, latest Gatsby is used 
It packages the frontend code into a static website to boost performance. 
For backend, express.js is used.
### Outcomes
The application is deployed on https://changedetectorfrontend.herokuapp.com/. As shown, the result 
accurately reflects the changes made to the website.
### Steps
## 1
Go to https://changedetectorfrontend.herokuapp.com/. It should start the monitoring. A new button with the timestamp shows up as shown here.
![alt text](https://github.com/inanisvitae/WebChangeAgent/blob/main/docs/screenshots/Screenshot5.png?raw=true)

<br />

## 2
After one more minute, a new button shows up with a new timestamp.

![alt text](https://github.com/inanisvitae/WebChangeAgent/blob/main/docs/screenshots/Screenshot4.png?raw=true)

## 3
<br />
Then click these two buttons or any other random two buttons. The timestamps are in the order.

![alt text](https://github.com/inanisvitae/WebChangeAgent/blob/main/docs/screenshots/Screenshot3.png?raw=true)
<br />

## 4
Then click patch button. Server should return the patch for selected dates. 

![alt text](https://github.com/inanisvitae/WebChangeAgent/blob/main/docs/screenshots/Screenshot2.png?raw=true)
![alt text](https://github.com/inanisvitae/WebChangeAgent/blob/main/docs/screenshots/Screenshot1.png?raw=true)
First patch is slow, but later it is cached, so server responds quickly.