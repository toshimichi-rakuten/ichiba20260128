# Junkins

The missing Jenkins helper.

Get PR list:

```sh
curl -H "Authorization: Bearer NjM1NjA5NDc0NzI2OiSh7fmFJO9NJA5Bj8HELaCt/7FR" \
  https://git.rakuten-it.com/rest/api/1.0/projects/ICWDCDG/repos/sidekick/pull-requests
```

Update PR:

```sh
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer NjM1NjA5NDc0NzI2OiSh7fmFJO9NJA5Bj8HELaCt/7FR" \
  -d '{"description": "Test", "version": 19}' \
  https://git.rakuten-it.com/rest/api/1.0/projects/ICWDCDG/repos/sidekick/pull-requests/204
```

Note: Need a working Bearer Token.  
[[Create ]()](https://git.rakuten-it.com/plugins/servlet/access-tokens/projects/ICWDCDG/repos/sidekick/manage)

## Builder Image

Needs to be manually created/pushed to Harbor.

```sh
docker build -t registry-jpe1.r-local.net/cwd-sidekick/builder:202311301819 ./.junkins
docker push registry-jpe1.r-local.net/cwd-sidekick/builder:202311301819
```

Don't forget to update the Jenkinsfile whenever there's a new builder image.
