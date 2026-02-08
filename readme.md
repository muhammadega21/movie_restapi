# Installation

- Install dependencies

```bash
npm install
```

- Rename .env.example to .env
- Complete all configurations in .env
- Run the following command

```bash
npx prisma generate
```

```bash
npx prisma migrate dev --name init
```

- Start server

```bash
npm run dev
```

- (optional) run this commant if you need fake data

```bash
npm run seed
```
