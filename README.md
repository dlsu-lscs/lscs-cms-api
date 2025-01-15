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
curl https://cms.app.dlsu-lscs.org/users

# response
[{ ... }, {...}, {...}] # the "..." are the user info
```

### POST `/posts
- creates a post
- example:
```bash
curl -X POST -d "{}" https://cms.app.dlsu-lscs.org/posts
```

