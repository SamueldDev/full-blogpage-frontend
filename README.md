# 📝 Mini-Blog Frontend

This is the frontend for the **Mini-Blog** project — a simple blogging application built with **React** and connected to a RESTful backend API. Users can log in, create posts, edit, delete, and manage their content.

---

## 🚀 Features

- ✅ User authentication (login/logout)
- ✅ Create new blog posts
- ✅ Edit and delete posts
- ✅ View single post
- ✅ Dashboard showing all user posts
- ✅ Responsive UI with TailwindCSS

---

## 🧑‍💻 Tech Stack

- **React** (with Hooks and Context API)
- **React Router DOM** for routing
- **TailwindCSS** for styling
- **Axios** for API requests
- Backend: [Mini-Blog Backend](https://github.com/yourusername/mini-blog-backend) (Node.js, Express, MySQL)

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-blog-frontend.git
cd mini-blog-frontend

2. Install Dependencies

npm install

3. Configure Environment Variables
Create a .env file in the root with your API base URL:



VITE_API_BASE_URL=https://your-backend-api-url.com/api
Make sure this matches the base URL of your backend deployed on Railway or elsewhere.

4. Run the App

npm run dev
Visit http://localhost:5173 in your browser.

📁 Project Structure

src/
│
├── api/
│   └── axios.js          # Axios instance setup
│
├── components/
│   └── Navbar, Footer... # Reusable UI components
│
├── pages/
│   ├── Dashboard.jsx     # User dashboard
│   ├── Login.jsx         # Login page
│   ├── Register.jsx      # Registration page
│   ├── SinglePost.jsx    # View/edit/delete single post
│   ├── CreatePost.jsx    # Create new post
│   └── Profile.jsx       # User profile (optional)
│
├── context/
│   └── AuthContext.js    # Global auth state
│
├── App.jsx               # Main routing file
└── main.jsx              # Entry point
✅ To Do / Improvements
 Add registration form

 Add password reset/change

 Add profile photo upload

 Paginate dashboard posts

 Add post search/filter

🌐 Live Demo
Coming soon or add your Netlify/Vercel link here.

🧑‍🎓 Author
Samuel Friday — @yourLinkedIn

