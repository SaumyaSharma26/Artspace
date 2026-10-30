# ArtSpace

A responsive, art-inspired community platform demo built with HTML5, CSS3, and vanilla JavaScript. Data is seeded on first load and persisted in the browser's `localStorage`.

## Run it

Because the app uses native JavaScript ES modules, browsers restrict module loading from `file://` URLs. No build step or package install is required, but open the folder through a tiny local static server:

- **Python:** open a terminal in this folder and run `python -m http.server 8000`
- Visit `http://localhost:8000`
- Or use VS Code's Live Server extension.

Open `index.html` for the landing page. Login/register opens from there.

## Demo credentials

All demo passwords are `ArtSpace123!`

| Role | Email |
|---|---|
| Admin | `admin@artspace.demo` |
| Artist | `maya@artspace.demo` |
| Patron | `alex@artspace.demo` |

Other seeded accounts include four more artists and four more patrons. Demo password storage is intentionally simple and is **not suitable for production**.

## Project structure

```text
artspace/
├── index.html
├── auth.html
├── app.html
├── README.md
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── pages.css
│   └── responsive.css
└── js/
    ├── storage.js
    ├── auth.js
    ├── validation.js
    ├── router.js
    ├── ui.js
    ├── notifications.js
    ├── reports.js
    ├── artworks.js
    ├── events.js
    ├── bookings.js
    ├── users.js
    └── landing.js
```

## Feature checklist

- [x] Responsive landing page and ArtSpace visual identity
- [x] Demo login, registration, role-aware navigation, logout
- [x] LocalStorage data layer with seeded users, artworks, events, registrations, commissions, bookings, notifications and activity
- [x] Artist portfolio browse, search, filter, favourite, create, edit and delete
- [x] Event listing, create/edit/delete, admin approval, patron registration and waitlist state
- [x] Commission request creation and role-aware status transitions
- [x] Booking status controls, event registration cancellation
- [x] Profile editing and admin user status/role management
- [x] Dashboard summary cards, activity visuals and upcoming events
- [x] Role-filtered reports, CSV export and print stylesheet
- [x] Toasts, confirmation modal, notifications, light/dark appearance
- [x] Accessible labels, keyboard focus styles, mobile bottom navigation
- [x] CSS responsive breakpoints for mobile, tablet and desktop

## Testing checklist

1. **Admin:** log in as `admin@artspace.demo`; open dashboard, reports and profile/member table; suspend/restore a user, change a role, approve a pending event, export CSV, and print.
2. **Artist:** log in as `maya@artspace.demo`; create, edit, favourite and delete an artwork; create an event; open requests and move an assigned commission through an available status transition; update profile.
3. **Patron:** log in as `alex@artspace.demo`; browse/search/favourite artwork; register for an event; submit a commission request; inspect request status; cancel a registration.
4. **Registration:** use a new email; test missing required fields, duplicate email, password strength, mismatched passwords and artist discipline.
5. **Responsive UI:** test at 320px, 768px, 1024px and 1440px. Check sidebar toggle and mobile bottom navigation.
6. **Persistence:** refresh the page after changing data; confirm updates remain. To reset seeded demo data, clear this site's local storage for `localhost:8000`.

## Notes and scope

This is a front-end demonstration, not a production service. A client-side hash is not secure authentication, localStorage is user-editable, and role checks in the browser are not a security boundary. Production deployment would require a trusted backend, secure password hashing, server-side authorization, upload validation, rate limiting, and privacy controls. Images are represented by original CSS artwork tiles in the demo; user-supplied image uploads are not implemented.
