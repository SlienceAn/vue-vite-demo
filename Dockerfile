#基底映像檔，必需是「第一個」指令行，指定這個映像檔要以哪一個Image為基底來建構
FROM node:18.12.1

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
# RUN npm run build

EXPOSE 5173

#設定映像檔啟動為Container時預設要執行的指令
CMD ["npm", "run","serve" ]


