FROM node:14-alpine as nodework

WORKDIR /myapp

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]



# FROM nginx:1.23-alpine

# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

# # COPY --from=nodework /myapp/build .

# COPY --from=nodework /myapp/ .

# ENTRYPOINT [ "nginx","-g","daemon off;" ]
