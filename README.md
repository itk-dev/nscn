This is a composer based installer for the [Open Social distribution](http://www.drupal.org/project/social).

# Prerequisites

1. [Composer](https://getcomposer.org/download/)

It's just composer, isn't it awesome? :)

## Installation of Open Social

```
composer create-project goalgorilla/social_template:dev-master DIRECTORY --no-interaction
```

Composer will create a new directory called DIRECTORY. Inside you will find the html directory with the entire code base of [Open Social distribution](http://www.drupal.org/project/social). You should be able to install it like any other Drupal site. 

## Learn more about Composer for Drupal

Checkout this [presentation](https://docs.google.com/presentation/d/1gxcxT6o47xVrfsZ7ZSQKjBRT-gfE54A1Z9kjvvGHwCo/edit#slide=id.p) from @ModsUnraveled.

## Installation instructions for development
- Requires: https://github.com/aakb/itkdev-docker

Setup Docker environment (Optional):
```
itkdev-docker-compose up -d
```
Get php packages
```
itkdev-docker-compose composer install
```
Setup local site configuration:
```
cp web/sites/default/_docker.settings.local.php web/sites/default/docker.settings.local.php
cp web/sites/default/_services.local.yml web/sites/default/services.local.yml
```
Install site:
```
itkdev-docker-compose vendor/bin/drush site-install minimal --existing-config -y
```

## Sync files and DB
```
itkdev-docker-compose sync
```
