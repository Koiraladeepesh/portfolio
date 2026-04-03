# Deepesh Koirala — Portfolio

Personal portfolio site. React + Node.js + PostgreSQL, fully self-hosted on Proxmox/Ubuntu via Docker Compose, served through Cloudflare Tunnel.

## Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React 18 + Vite + CSS Modules             |
| Backend   | Node.js + Express                         |
| Database  | PostgreSQL 16                             |
| Reverse proxy | Nginx (inside frontend container)     |
| Deployment | Docker Compose                           |
| Public access | Cloudflare Tunnel → NPM → container  |

---

## Project structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/     # Nav, StatusBar, Terminal, PageHeader
│   │   ├── pages/          # Home, About, Lab, Experience, Blog, Goals, Contact
│   │   └── main.jsx
│   ├── nginx.conf          # SPA routing + API proxy
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── routes/         # posts.js, contact.js
│   │   ├── db.js           # PostgreSQL pool + schema init
│   │   └── index.js        # Express server
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Deploy on your Ubuntu server

### 1. Copy files to server

```bash
# On your server (Ubuntu VM at 10.10.30.10)
mkdir -p /opt/docker/portfolio
cd /opt/docker/portfolio

# Copy the project files here (scp, git clone, etc.)
```

### 2. Create your .env file

```bash
cp .env.example .env
nano .env
```

Set strong values for:
- `DB_PASSWORD` — use a long random string
- `ADMIN_TOKEN` — used to create blog posts via API

### 3. Build and start

```bash
docker compose up -d --build
```

This will:
- Build the React app and serve it via Nginx on port **8090**
- Start the Express backend on port **3001** (internal only)
- Start PostgreSQL and initialize the schema automatically

### 4. Verify

```bash
docker compose ps
# All three containers should show "Up"

curl http://localhost:8090
# Should return the HTML page

curl http://localhost:8090/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### 5. Add NPM proxy host

In Nginx Proxy Manager (http://100.93.27.94:81):

- **Domain name**: `deepeshkoirala.com.np`
- **Scheme**: `http`
- **Forward hostname**: `localhost`
- **Forward port**: `8090`
- Enable **SSL** with Let's Encrypt (or Cloudflare managed)
- Enable **Force SSL**

### 6. Cloudflare Tunnel

The tunnel route already exists:
```
deepeshkoirala.com.np → http://localhost:80 (NPM)
```

NPM will now forward traffic to your portfolio container on port 8090.

---

## Writing blog posts

Posts are stored in PostgreSQL. Use the API to create them:

```bash
curl -X POST http://localhost:8090/api/posts \
  -H "Content-Type: application/json" \
  -H "x-admin-token: YOUR_ADMIN_TOKEN" \
  -d '{
    "slug": "my-first-post",
    "title": "My first blog post",
    "excerpt": "A short summary shown on the blog list page.",
    "content": "# Heading\n\nYour markdown content here...",
    "tags": ["networking", "homelab"],
    "read_time": "5 min"
  }'
```

Content supports full Markdown including code blocks.

---

## Updating the site

After editing source files:

```bash
cd /opt/docker/portfolio
docker compose up -d --build
```

Only changed containers rebuild. PostgreSQL data persists in the `postgres-data` volume.

---

## Useful commands

```bash
# View logs
docker compose logs -f

# View only backend logs
docker compose logs -f backend

# Restart a single service
docker compose restart frontend

# Access PostgreSQL directly
docker exec -it portfolio-db psql -U portfolio -d portfolio

# List all messages from contact form
docker exec -it portfolio-db psql -U portfolio -d portfolio \
  -c "SELECT name, email, subject, created_at FROM messages ORDER BY created_at DESC;"

# Stop everything
docker compose down

# Stop and remove volumes (WARNING: deletes database)
docker compose down -v
```

---

## Future improvements

- [ ] Admin UI for writing blog posts
- [ ] Email notifications for contact form (configure SMTP in .env)
- [ ] Add Wazuh SIEM logging
- [ ] GitHub Actions CI/CD pipeline
- [ ] LinkedIn and GitHub profile links
