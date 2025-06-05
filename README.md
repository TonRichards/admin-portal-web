
# Admin Portal Web

This is the frontend admin dashboard for the ERP system. It serves as the main interface for system admins and staff to manage users, roles, and other ERP features.

---

## 🎯 Features

- Responsive dashboard (Vue 3 + Tailwind CSS)
- Role and permission management
- User organization view
- API integration with user_service
- Admin authentication via token

---

## 📦 Tech Stack

- Vue 3 (Composition API)
- Vue Router
- Pinia (state management)
- Axios
- Tailwind CSS
- Vite

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/TonRichards/admin_portal_web.git
cd admin_portal_web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
VITE_API_URL=
VITE_APPLICATION_ID=
```

### 4. Run in development mode

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## Project Structure

- src/pages/ - Main route pages (Login, Dashboard, etc.)
- src/components/ - Shared components (Sidebar, Table, etc.)
- src/lib/axiosUser.js - Axios instance preconfigured for API
- src/stores/ - Pinia stores (auth, permissions)
- src/services/ - provide an API service