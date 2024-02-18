FROM nginx:stable-alpine

# Stage 2: Create final Nginx image
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /var/www

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

