# Merrill Digital Systems – static site for Raspberry Pi (or any Linux)
# Uses nginx on Alpine for a small image size.

FROM nginx:alpine

# Use our nginx config (replaces default)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the whole site (see .dockerignore for exclusions)
COPY . /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
