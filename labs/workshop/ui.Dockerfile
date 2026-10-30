FROM nginx:1.28-alpine
COPY index.html app.js styles.css config.js /usr/share/nginx/html/
EXPOSE 80
