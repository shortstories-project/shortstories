# Shortstories

Welcome to your new Hanami project!

## Setup

install ruby https://github.com/rvm/rvm
install `gem install bundler`

install postgresql

#### inside project

install gems `bundle install`

copy and rename files

```
.env.development.sample -> .env.development
.env.test.sample -> .env.test
```
set yours settings for db inside .env.* files, example:

`DATABASE_URL="postgresql://markfrost@localhost/shortstories_test"`

create db and execute migration 

```
hanami db prepare

HANAMI_ENV=test hanami db prepare
```

### Other

How to run tests:

```
% bundle exec rake
```

How to run the development console:

```
% bundle exec hanami console
```

How to run the development server:

```
% bundle exec hanami server
```

How to prepare (create and migrate) DB for `development` and `test` environments:

```
% bundle exec hanami db prepare

% HANAMI_ENV=test bundle exec hanami db prepare
```

Explore Hanami [guides](http://hanamirb.org/guides/), [API docs](http://hanamirb.org/docs/1.0.0/), or jump in [chat](http://chat.hanamirb.org) for help. Enjoy! 🌸
