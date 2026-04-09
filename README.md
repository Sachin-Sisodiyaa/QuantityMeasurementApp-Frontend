# Quantity Measurement Frontend (Angular)

Angular + TypeScript frontend for your Spring Boot backend.

## What this frontend covers

- JWT login and register with `/api/v1/auth/login` and `/api/v1/auth/register`
- Google OAuth redirect handling using `/oauth2/authorization/google` + `/oauth-success`
- Authenticated quantity operations:
  - `compare`
  - `convert`
  - `add`
  - `subtract`
  - `divide`
- History and metrics:
  - `/history/operation/{operation}`
  - `/history/type/{measurementType}`
  - `/history/errored`
  - `/count/{operation}`

## Run locally

1. Start backend on `http://localhost:8080`
2. Open `QuantityMeasurementApp-Frontend` folder
3. Install dependencies
4. Start Angular app

```bash
cd "QuantityMeasurementApp-Frontend"
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

## Backend connection

- Dev server uses `proxy.conf.json` so browser calls like `/api/v1/...` are proxied to `http://localhost:8080`.
- This avoids CORS issues without backend changes.
- Port `3000` matches backend OAuth default redirect (`http://localhost:3000/oauth-success`).

## Google OAuth prerequisites

- Configure backend Google OAuth credentials in:
  `QuantityMeasurementApp/secrets/oauth-secrets.properties`
- Keep Google Console callback URL as:
  `http://localhost:8080/login/oauth2/code/google`
- Use the **Continue with Google** button on login/signup screen.
