
# 🧺 LaundryBox Admin Dashboard

A high-performance **MERN Stack** application designed for laundry business owners to manage orders, track revenue, and handle multi-item customer drop-offs with ease.

🚀 **[Live Demo](https://laundry-management-kohl.vercel.app/)**

## 🚀 Key Features

* **Admin-First Interface:** Optimized for staff use with a focus on speed and data visibility.
* **Dynamic Multi-Item Orders:** Allows adding multiple garment types (e.g., 5 Shirts, 2 Suits) in a single order entry.
* **Automated Billing:** Server-side price calculation using Mongoose middleware to ensure 100% data integrity.
* **Global Live Search:** Instant search by **Customer Name** or **Phone Number** using MongoDB Regex.
* **Real-time Analytics:** Dashboard cards showing Total Revenue, Order Count, and Status distribution.
* **Modern UI:** Built with React 19, Tailwind CSS v4, and Lucide-React icons.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS v4 (Utility-first styling)
* Axios (API communication)
* Lucide React (Icons)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* CORS (Cross-Origin Resource Sharing)

---

## 📖 How to Use (Admin Workflow)

Follow these steps to test the full functionality of the application:

### 1. Recording a New Drop-off
* **Step 1:** Enter the **Customer Name** and a **10-digit Phone Number**.
* **Step 2:** In the **Garment Details** section, enter the item name (e.g., "White Shirt"), quantity, and price.
* **Step 3:** Click **"+ ADD ITEM"** to add more garments to the same order.
* **Step 4:** Click **"Save Order"**. The **Revenue** and **Total Orders** cards will update automatically.

### 2. Managing Orders & Status
* New orders appear at the top of the **Orders Table**.
* Use the **Status Dropdown** to move orders through the lifecycle: `RECEIVED` → `PROCESSING` → `READY` → `DELIVERED`.

### 3. Searching for an Order
* Use the **Global Search Bar** at the top. Type any **Name** or **Phone Number** to filter the list in real-time.

---

## 🧠 Business Logic & Trade-offs

* **Server-Side Derived Data:** `totalBill` is calculated via a Mongoose `pre-save` hook. This prevents "Price Tampering" from the client side.
* **Global Search Logic:** Implemented a `$or` operator with `$regex` in MongoDB for a single-entry search experience.
* **Scalable Schema:** The `garments` field is an array of objects, allowing future support for custom service types per item.

---

## 🤖 AI Usage Report

I utilized AI tools (Gemini) to accelerate development:
* **Boilerplate Generation:** Scaffolding Tailwind v4 and Vite configuration.
* **Debugging:** Resolving Mongoose validation errors regarding Regex and phone number formatting.
* **UI/UX Refinement:** Drafting the dynamic form logic for multi-item garment rows.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd Laundry-order-managment