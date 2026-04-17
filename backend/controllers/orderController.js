const Order = require('../models/order');

// 1. Create Order
exports.createOrder = async (req, res) => {
    try {
        console.log("Received Order Data:"); // Debugging line
        const newOrder = new Order(req.body);
        newOrder.totalBill = newOrder.garments.reduce((total, garment) => {
        return total + (garment.quantity * garment.pricePerItem);
    }, 0);
     // Debugging line to check the order object before saving
        const savedOrder = await newOrder.save();
        console.log(newOrder); 
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error creating order:", err); // Debugging line
        res.status(400).json({ error: err.message });
    }
};

// 2. Get All Orders (with Filters)
exports.getOrders = async (req, res) => {
    try {
        
        const { search, status } = req.query; // React se hum 'search' bhejenge
        let query = {};

        // 1. Agar Admin status filter kare (e.g. sirf 'READY' orders dekhne hon)
        if (status) query.status = status;

        // 2. Global Search Logic (Naam ya Phone dono mein dhoondega)
        if (search) {
            query.$or = [
                { customerName: { $regex: search, $options: 'i' } }, // Case-insensitive naam
                { phoneNumber: { $regex: search, $options: 'i' } }  // Phone mein bhi dhoondega
            ];
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Update Status
exports.updateStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true, runValidators: true }
        );
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 4. Dashboard Stats
exports.getDashboard = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: "$totalBill" },
                    statusCounts: { $push: "$status" }
                }
            }
        ]);

        // Format status counts properly
        const allOrders = await Order.find();
        const ordersPerStatus = allOrders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            totalOrders: stats[0]?.totalOrders || 0,
            totalRevenue: stats[0]?.totalRevenue || 0,
            ordersPerStatus
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};