# Raskpost

Peer-to-peer package delivery marketplace for Norway. Senders post a delivery job, nearby drivers claim it and deliver — same day, faster than Posten.

---

## Concept

Traditional mail takes 2–3 days. Raskpost connects senders directly with drivers who are already going the right direction. Think Uber, but for packages.

---

## Package Tracking — Iroha 2 Blockchain

Every package gets a **unique alphanumeric identifier** (e.g. `PKG-A3X9K2`) minted as an asset on a self-hosted [Hyperledger Iroha 2](https://hyperledger.github.io/iroha-2-docs/) chain.

### Why a self-hosted chain?
- No gas fees — we run the peers
- Millisecond finality on a permissioned network
- Built-in account + asset transfer primitives
- Immutable, tamper-proof custody log per package
- No crypto wallets or blockchain knowledge needed for users

### Custody flow

```
Sender posts job
  → API mints NFT (PKG-A3X9K2) to sender's Iroha account

Sender prints QR label and attaches it to the package

Driver scans QR with their app
  → NFT transfers: sender → driver
  → Delivery address is revealed to driver

Driver delivers, recipient scans QR
  → NFT transfers: driver → recipient
  → Payment released from escrow
```

The **scan is the proof of physical interaction** — the driver must physically handle the package to scan the label. The delivery address is only revealed after that scan, so drivers can't skip pickup. Recipient confirmation is required to release payment, so drivers can't self-confirm delivery.

---

## Trust & Driver Safety

A layered approach to prevent fraud and package theft:

### 1. BankID Verification (drivers)
All drivers must verify via Norwegian BankID before going live. BankID is tied to a fødselsnummer — there is a real, legally identifiable person behind every driver account. This alone deters most bad actors.

Integration via Criipto or Signicat (standard OAuth flow).

### 2. Payment Escrow
Sender pays upfront via Stripe. Payment is held in escrow and only released when the recipient scans the QR code and the NFT successfully transfers to their account. Driver gets nothing without confirmed delivery.

### 3. Recipient-scan Confirmation
Delivery is not confirmed by the driver — it's confirmed by the **recipient scanning the package QR**. The NFT must reach the recipient's account. A driver who disappears with a package has the NFT stuck in their account and no payment.

### 4. Security Deposit
Drivers put up a deposit (e.g. 500 NOK) via Stripe when registering. If a package goes missing, the deposit is forfeit automatically.

### 5. Rating System & Job Limits
New drivers start with a cap on package value and frequency. As they build a rating, limits increase. High-value packages are restricted to verified, high-rated drivers.

### If a driver steals a package:
```
NFT stuck in their Iroha account  →  cryptographic proof of last custody
+ BankID identity known            →  police report is trivial
+ No payment released              →  financial loss to the driver
+ Security deposit forfeit         →  immediate financial consequence
+ Account banned                   →  permanent platform removal
```

---

## Stack

| Layer | Technology |
|---|---|
| Frontend / API | Next.js 16.2 (App Router, TypeScript) |
| Database | PostgreSQL via Prisma 6 |
| Auth | NextAuth v5 — Credentials + BankID (planned) |
| Payments | Stripe + Stripe Connect (escrow + driver payouts) |
| Real-time tracking | Valkey pub/sub (GPS coordinates) |
| Chain of custody | Hyperledger Iroha 2 (self-hosted) |
| Map / Geocoding | Mapbox |
| Container runtime | Podman Compose |

---

## Running Locally

### Prerequisites
- Podman + podman-compose
- Node.js 22

### Start the stack

```bash
# Build the app image (first time or after changes)
podman build -t raskpost:latest .

# Build the migrate image
podman build --target migrate -t raskpost-migrate:latest .

# Push schema to database
podman run --rm --network raskpost_default \
  -e DATABASE_URL=postgresql://postgres:postgres@db:5432/raskpost \
  raskpost-migrate:latest

# Start all services
podman compose up -d
```

App runs at **http://localhost:3000**

### Tear down

```bash
podman compose down          # keep database volume
podman compose down -v       # wipe everything including database
```

---

## Roadmap

- [x] Job board — post, browse, and claim delivery jobs
- [x] Auth — register/login with role selection (Sender / Driver)
- [ ] QR label generation on job creation
- [ ] Driver PWA scanner (camera-based, no app store)
- [ ] Iroha 2 node in compose stack
- [ ] Custody sidecar service (Iroha 2 integration)
- [ ] Address reveal on scan
- [ ] Stripe payment escrow
- [ ] Stripe Connect driver payouts
- [ ] Real-time GPS tracking via Valkey
- [ ] BankID verification for drivers (Criipto/Signicat)
- [ ] Security deposit flow
- [ ] Rating system
- [ ] Package value tiers + driver limits
