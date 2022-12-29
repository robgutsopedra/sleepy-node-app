# Use the node:alpine image as the base image. The --platform issue is because I built it with a fucking Mac.
FROM --platform=linux/amd64 node:alpine
 
# Copy the package.json file to the image
COPY package.json package.json
# Install required packages
RUN npm install
 
# Expose the required port in the image
EXPOSE 3000
 
# Copy any other necessary files
COPY . .
 
# Command to run the program
CMD ["npm", "start"]