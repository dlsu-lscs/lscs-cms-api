# LSCS CMS API

- docs: [https://docs.google.com/document/d/1pCdrbqCXFOat7dLoNG91BZaSON4g-3R_2e0dbLvyQ8E/edit?usp=sharing](https://docs.google.com/document/d/1pCdrbqCXFOat7dLoNG91BZaSON4g-3R_2e0dbLvyQ8E/edit?usp=sharing)

## TODOS

- [x] simple setup, project structure, prettier(done)/eslint(maybe)
- [x] create `.env` file for important env_vars like `MONGO_URI`
- [x] be able to connect to mongodb (via container rn)
- [x] dockerize for easy dev env and prod builds
- [x] create schemas
- [ ] services/handlers
- [x] conrollers/routes
    - [x] endpoint: `/organizations` -> CRUD
    - [x] endpoint: `/users` -> CRUD
    - [x] endpoint: `/posts` -> CRUD
- [ ] auth
    - [ ] basic email and password login
    - [ ] ensure protected routes -> ex. users can only view their own org posts
    - [ ] ... 

## Start

### Development

- start via `docker`:

```bash
docker compose up -d
```

- test connection via `curl` -> should return "HEALTHY"

```bash
curl http://localhost:3500/
```

- stop when done

```bash
docker compose down
```

### [WIP] Production
- prod:

```bash
npm run start
```

