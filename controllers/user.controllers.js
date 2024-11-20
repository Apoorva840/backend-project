const users = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const secretKey = "224deaa95117e8f78344ea3083f34917672447f6136eae9e940ee7ef70fc8a469828aad8080e8ab064158107b0dadf3c4fd81173cb1ce784224e3a17e2d74892";

const signUp = async (req, res) => {
    const { first_name, last_name, email, password, contact } = req.body;

    try {
        let usr = await users.findOne({ email });
        if (usr) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashedPassword);

        const username = `${first_name}  ${last_name}`;
        const userUUID = uuidv4();
        console.log('Generated UUID:', userUUID);
        const newUserId = await users.countDocuments() + 1;

        usr = new users({
            userid: newUserId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.email_address.split('@')[0],
            email: req.body.email_address,
            password: hashedPassword,
            contact: req.body.mobile_number,
            role: 'user',
            uuid: userUUID,
            accesstoken: '',
            isLoggedIn: false,
            coupens: [],
            bookingRequests: []
        });
        await usr.save();

        const token = jwt.sign({ id: usr._id }, secretKey, { expiresIn: '4h' });

        res.status(201).json({ token });
    }
    catch (err) {
        console.error('Error during sign-up:', err.message);
        res.status(500).send('Server error');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        console.log("The email is:", email);
        console.log("The password is:", password);

        let usr = await users.findOne({ email });
        if (!usr) {
            return res.status(401).json({ message: 'Invalid credentials: User not found' });
        }

        const isMatch = await bcrypt.compare(password, usr.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });

        await users.updateOne({ email }, { isLoggedIn: true, new: true});

        await usr.save();

        const token = jwt.sign({ id: usr._id }, secretKey, { expiresIn: '4h' });
        res.json({ token, isLoggedIn: true, id: usr._id });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const logout = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedUser = await users.findOneAndUpdate(
            { _id: id }, // Use `userid` instead of `_id` if `userid` is your unique field
            { isLoggedIn: false },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Logout successful', user: updatedUser });
    }
    catch (err) {
        console.error('Error during logout:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCouponCode = async (req, res) => {
    const { userid } = req.query;

    try {

        const usr = await users.findOne({ userid });
        //await users.updateOne({ userid }, { isLoggedIn: true, new: true});

        console.log('Retrieved user:', usr);

        if (!usr) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        //console.log('isLoggedIn:', usr.isLoggedIn);

        if (usr.isLoggedIn !== true) {
            return res.status(403).json({ message: 'User is not logged in' });
        }

        const generateCouponId = () => Math.floor(1000 + Math.random() * 9000);

        const newCoupon = {
            id: generateCouponId(),
            discountValue: 20,
        };

        usr.coupens.push(newCoupon);
        await usr.save();

        res.status(200).json({
            message: 'Coupons retrieved successfully',
            coupons: usr.coupens
        });
    }
    catch (err) {
        console.error('Error retrieving coupons:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const bookShow = async (req, res) => {
    const { userid, coupon_code, show_id, tickets } = req.body;

    try {
        const usr = await users.findOne({ userid });

        if (!usr) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!usr.isLoggedIn) {
            return res.status(403).json({ message: 'User is not logged in' });
        }

        if (coupon_code) {
            const coupon_code =  usr.coupens.find((c) => c.id == coupon_code);
            if (! coupon_code) {
                return res.status(400).json({ message: 'Invalid coupon code' });
            }
        }

        discountValue = coupon.discountValue;

        const reference_number = Math.floor(100000 + Math.random() * 900000);

        const bookingRequest = {
            reference_number: reference_number,
            coupon_code,
            show_id,
            tickets
        };

        usr.bookingRequests.push(bookingRequest);

        await usr.save();

        res.status(201).json({
            message: 'Show booked successfully',
            bookingRequest: {
                
                    reference_number,
                    show_id,
                    tickets,
                    discountApplied: discountValue,
                },
            
        });
    }
    catch (err) {
        console.error('Error during booking:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signUp, login, logout, getCouponCode, bookShow };