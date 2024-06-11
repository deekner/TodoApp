FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /api

COPY package.json .

RUN npm install

COPY . . 

EXPOSE 4000

CMD ["npm", "run", "dev"]

# Dockerfile

# PHP Dockerfile section
FROM php:8.3.7-apache
WORKDIR /var/www

# Download and install install-php-extensions script
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# Run the script manually to check for errors
RUN install-php-extensions intl opcache zip openssl

RUN install-php-extensions pdo_mysql


# Adding Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copy Apache configuration
COPY ./.apache/vhosts.conf /etc/apache2/sites-available/000-default.conf

CMD apachectl -D FOREGROUND
