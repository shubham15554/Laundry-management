# 🧺 LaundryBox Admin Dashboard
A high-performance MERN Stack application designed for laundry business owners to manage orders, track revenue, and handle multi-item customer drop-offs with ease.

# 🚀 Key Features
Admin-First Interface: Optimized for staff use with a focus on speed and data visibility.

Dynamic Multi-Item Orders: Allows adding multiple garment types (e.g., 5 Shirts, 2 Suits) in a single order entry.

Automated Billing: Server-side price calculation using Mongoose middleware to ensure 100% data integrity.

Global Live Search: Instant search by Customer Name or Phone Number using MongoDB Regex.

Real-time Analytics: Dashboard cards showing Total Revenue, Order Count, and Status distribution.

Modern UI: Built with React 19, Tailwind CSS v4, and Lucide-React icons.


# 🛠️ Tech Stack
Frontend:

React.js (Vite)

Tailwind CSS v4 (Utility-first styling)

Axios (API communication)

Lucide React (Icons)

Backend:

Node.js & Express.js

MongoDB & Mongoose

CORS (Cross-Origin Resource Sharing)


# 🧠 Business Logic & Trade-offs
During development, several strategic technical choices were made:

Server-Side Derived Data: I chose to calculate the totalBill on the backend using a pre-save hook. This prevents "Price Tampering" where a client could theoretically send a manipulated total to the API.

Global Search Logic: Instead of separate filters, I implemented a $or operator with $regex in MongoDB. This allows the admin to use a single search bar for both name and phone queries, mimicking a real-world POS system.

Scalable Schema: The garments field is stored as an array of objects, making it easy to add more metadata (like "Service Type: Dry Clean vs Wash") in the future without breaking the database.



# 🤖 AI Usage Report
I utilized AI tools (Gemini) to accelerate the development process in the following ways:

Boilerplate Generation: Rapidly scaffolding the Tailwind v4 configuration and Vite setup.

Debugging: Identifying and resolving Mongoose validation errors (specifically regarding phone number Regex).

UI/UX Refinement: Drafting the dynamic form logic for adding/removing garment rows efficiently.

Documentation: Assistance in structuring this README to meet industry standards.


# ⚙️ Installation & Setup
1. Clone the Repository

git clone <your-repo-link>
cd Laundry-order-managment

2. Backend Setup
Bash
cd backend
npm install
# Create a .env file and add your MONGO_URI
npm start
3. Frontend Setup
Bash
cd frontend
npm install
npm run dev