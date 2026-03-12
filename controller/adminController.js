import adminModel from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register Controller
export const register = async (req, res) => {

  // console.log("req.body",req.body);

  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if admin exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new adminModel({
      username,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Store token in cookie
    res.cookie('token', token, { httpOnly: true, secure: true });


    // await user.save();
    await admin.save();
    res.status(201).json({
      success: true,
      admin,
      message: 'Admin registered successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Store token in cookie
    res.cookie('token', token, { httpOnly: true, secure: true });



    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get Admin Info Controller
export const getAdminInfo = async (req, res) => {
  const { id } = req;

  try {
    const adminId = id; // Assuming userId is set in the request after authentication

    // Find admin by ID
    const admin = await adminModel.findById(adminId).select('-password'); // Exclude password from response
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    // Clear token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

