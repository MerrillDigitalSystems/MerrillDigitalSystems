# Deploying on a Raspberry Pi (or any Linux server)

This project can run as a single Docker container using nginx. No Netlify or other host required.

## Prerequisites on the Pi

- Raspberry Pi OS (or any Linux) with Docker installed.
- Install Docker and Docker Compose:
  ```bash
  # Raspberry Pi OS / Debian
  sudo apt update && sudo apt install -y docker.io docker-compose-v2
  sudo usermod -aG docker $USER
  ```
  Log out and back in so the `docker` group applies.

## Build and run

From the project directory (where `Dockerfile` and `docker-compose.yml` are):

```bash
# Build the image (use platform for Pi if you build on a different machine)
docker compose build

# Run in the background
docker compose up -d
```

The site is served on **port 80**. Open `http://<your-pi-ip>/` in a browser.

## Useful commands

| Command | Description |
|--------|-------------|
| `docker compose up -d` | Start the site in the background |
| `docker compose down` | Stop and remove the container |
| `docker compose logs -f web` | Stream nginx logs |
| `docker compose build --no-cache` | Rebuild after changing files |

## Building on a different machine for the Pi

If you build on an x86 machine but run on a Raspberry Pi (ARM), build for the Pi’s architecture:

```bash
docker buildx build --platform linux/arm/v7 -t merrill-digital-systems:latest .
# Or for 64-bit Pi (Pi 3/4/5):
docker buildx build --platform linux/arm64 -t merrill-digital-systems:latest .
```

Then copy the image to the Pi (e.g. save/load or push to a registry and pull on the Pi), or clone the repo on the Pi and run `docker compose build` there.

## Changing the port

To use port 8080 instead of 80, edit `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

Then open `http://<your-pi-ip>:8080/`.

## HTTPS (optional)

For HTTPS on the Pi you can put a reverse proxy (e.g. Caddy or nginx) in front of this container and handle TLS there, or add a second service in `docker-compose.yml` that does termination. The current setup is HTTP only.

---

The same `Dockerfile` and `docker-compose.yml` work on any Linux host, not just a Raspberry Pi.
