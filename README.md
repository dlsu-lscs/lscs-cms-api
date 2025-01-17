# LSCS CMS API

- official URL: [https://cms.app.dlsu-lscs.org](https://cms.app.dlsu-lscs.org)
- docs: [https://docs.google.com/document/d/1pCdrbqCXFOat7dLoNG91BZaSON4g-3R_2e0dbLvyQ8E/edit?usp=sharing](https://docs.google.com/document/d/1pCdrbqCXFOat7dLoNG91BZaSON4g-3R_2e0dbLvyQ8E/edit?usp=sharing)

> [!IMPORTANT]
> a user is created first (via /auth/login) before assigning an organization

### Development

```bash
npm run dev
```

## Routes

### User

#### GET `/users`
- gets all users in the database
- example:
```bash
# request
curl -X GET https://cms.app.dlsu-lscs.org/users

# response
[{ ... }, {...}, {...}] # the "..." are the user info
```

### GET '/users/:id'
- gets a user by id

```bash
# request
curl -X GET https://cms.app.dlsu-lscs.org/users/<id>

# response
{...}
```

### POST: '/users/join'
- a user joining an organization
- req.body expects orgId (string)

```bash
# request
curl -X POST https://cms.app.dlsu-lscs.org/users/join
```

### DELETE: '/users/:id'
- deletes a user by id
- user must be an organization admin to delete

```bash
curl -X DELETE https://cms.app.dlsu-lscs.org/users/<id>
```


### Post

### POST: `/posts`
- creates a post
- needs to be authenticated (cookie)

req.body expects:
- title (string)
- content (string)
- category (string)
- orgIds (array)

```bash
# request
curl -X POST -d "{}" https://cms.app.dlsu-lscs.org/posts
```

### GET: `/posts/:id`
- get specific post by its id

```bash
# request
curl -X GET https://cms.app.dlsu-lscs.org/posts/678820124b0cc005a8558d2c
```

### GET: `/posts/org/:orgId`
- get posts from a specific organization

```bash
# request
curl -X GET https://cms.app.dlsu-lscs.org/org/<id>
```

### DELETE: '/posts/:id'
- delete a post by id

```bash
# request
curl -X DELETE https://cms.app.dlsu-lscs.org/posts/<id>
```


### Organization

### POST: '/orgs'
- creates an organization
- req.body requires: name, slug, description

```bash
# request
curl -X POST -d "{}" https://cms.app.dlsu-lscs.org/orgs
```

### GET: '/orgs/:id'
- gets an organization by id

```bash
# request
curl -X GET https://cms.app.dlsu-lscs.org/orgs/<id>
```

### DELETE: '/orgs/:id'
- delete the org by id

```bash
# request
curl -X DELETE https://cms.app.dlsu-lscs.org/orgs/<id>
```


### File

### POST: '/upload'
### GET: '/download/:filename'
### DELETE: '/delete/:id'


### Comments

### POST: '/:postId/comment'
- add a comment to a post
- req.body expects: content, parentCommentId

```bash
# request
curl -X POST https://cms.app.dlsu-lscs.org/<post_id>/comment
```

### GET: '/:postId/comments'
- get all comments from a post

```bash
# request
curl -X GET https://cms.app.dlsu-lscs.org/<post_id>/comments
```

### DELETE: '/comments/:commentId'
- delete comment by id

```bash
# request
curl -X DELETE https://cms.app.dlsu-lscs.org/<post_id>/comments/<comment_id>
```
