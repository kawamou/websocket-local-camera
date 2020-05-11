FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
ADD cert-key/websocket-local-camera.pem /etc/certs/websocket-local-camera.pem
ADD cert-key/websocket-local-camera-key.pem /etc/certs/websocket-local-camera-key.pem

EXPOSE 8000
EXPOSE 4430