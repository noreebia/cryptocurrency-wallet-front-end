FROM node:8.12.0

# Create a work directory and copy over our dependency manifest files.
RUN mkdir /app
WORKDIR /app
COPY /src /app/src
COPY /public /app/public
COPY ["package.json", "package-lock.json*", "./"]

# If you're using yarn:
#  yarn build
RUN npm install react-scripts@1.1.1 -g
RUN npm install && mv node_modules ../

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000

CMD ["npm", "start"]
