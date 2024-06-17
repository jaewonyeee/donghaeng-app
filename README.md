<p align='center'>
 <img src="https://capsule-render.vercel.app/api?type=waving&color=color=0:EEFF00,100:e3d7c7&height=200&section=header&text=donghaeng&fontSize=80&animation=fadeIn&fontAlignY=38&" />
</p>

# What is donghaeng?
<p align="center">
<img src="https://github.com/jaewonyeee/donghaeng-app/assets/129675209/0cc863ad-813c-4bfe-adb4-a05c4a2acb8e">
</p>

### An app that helps individuals prepare for funerals without the need to sign up for funeral service products from funeral companies.
[more in detail](https://sites.google.com/view/donghaengapp?usp=sharing)

2024-1 Mobile Computing Class<br>
Instructor: Professor **Yoonji Kim**<br>
Team: Graduation Please<br>
Members: **Serin Kim / Jaewon Lee / Seungwoo Jung**<br>

# How to run<br>
**1. Run Local Server using ngrok<br>**
1-1. Run the following command to add your authtoken to the default ngrok.yml configuration file. <br><mark>'ngrok config add-authtoken [get your token](https://dashboard.ngrok.com/get-started/setup/windows)'</mark><br> To use the ngork, you must first sign up and get a token issued. <br>
1-2. To utilize the review feature, you need to run the local server (json-server). <br>Open a separate terminal and execute the custom command <mark>'npm run ngrok-server'.</mark> <br>

**2. Run Expo<br>**
Run <mark>'npx expo start'</mark> (or npm start).

## Development Environment Compatibility
The development environment has been confirmed to work on Windows 11 only.<br> It is likely that it will not run on Mac or Linux. This app is built using React Native and Expo.


## Development Notes

1. Review Database File<br>
The review database is stored in the db/reviewdb.json file. <br>This file contains all the review data and is managed by the local server. <br>To reflect any direct modifications to the JSON file, you must reboot the server.

2. Profile Image Upload/Update Not Available During Review Creation<br>
Due to conflicts with the image-related module, this feature is currently unavailable and will be developed later. <br>You can change the default profile image by modifying the 'assets/review-person-icon.jpg' file.

3. UX Logic Modification for Starting Funeral Process<br>
Previously, entering the detailed menu after selecting 'Start Funeral' from the home menu involved navigating through over ten screens, making development time-consuming.<br> We have consolidated the simple selection options into a single screen. <br>Here’s a summary of the revised logic from the user's perspective:
Home -> Start Funeral -> Select Funeral Hall -> Choose Room within the Hall -> Select Funeral Items (mourning clothes, floral decorations, meal menu) -> Set Crematorium -> Select Cremation Items (coffin, shroud, additional funeral items) -> My Funeral Summary (navigate to modify funeral and cremation items/complete funeral preparations).<br>
The main changes include the removal of the funeral type selection and consolidation of items like mourning clothes, floral decorations, and meal menu into single screens, making the process more straightforward for the user.
