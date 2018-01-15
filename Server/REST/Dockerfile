FROM nginx
VOLUME  /etc/nginx
VOLUME /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY /html/ /etc/nginx/html
COPY www.nightadvisor.com.crt /etc/nginx
COPY www.nightadvisor.com.key /etc/nginx
