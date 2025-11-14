const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { ERROR, LOG, SUCCESS } = require("../utils/logs");
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});
// --------------------------------------------------REGISTER----------------------------------------------------------------
// @desc    Register a new user with OTP
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    role,
    name,
    username,
    email,
    password,
    enrollmentNumber,
    mobile,
    semester,
  } = req.body;
  if (
    !role ||
    !name ||
    !username ||
    !email ||
    !password ||
    !enrollmentNumber ||
    !mobile ||
    (role === "student" && !semester)
  ) {
    ERROR("HTTP-400: All fields are required");
    return res.status(400).send({
      success: false,
      message: "All fields are required !!",
    });
  }

  // Validate role
  const validRoles = ["student", "faculty"];
  if (!validRoles.includes(role)) {
    ERROR("HTTP-400: Provided Invalid role");
    return res.status(400).send({
      success: false,
      message: "Invalid role provided!",
    });
  }
  // Check if user already exists
  const userExists = await User.findOne({
    $or: [{ email }, { username }, { enrollmentNumber }],
  });
  if (userExists && userExists.blockedTime > Date.now()) {
    ERROR("HTTP-423: User Exist but is blocked for some time");
    return res.status(423).send({
      success: false,
      messgae: "User is blocked for 1 hour",
    });
  }
  if (userExists) {
    ERROR("HTTP-409: User already exist in the database");
    return res.status(409).send({
      success: false,
      message: "User already exists !!",
    });
  }
  const newUser = await User.create({
    role,
    name,
    username,
    email,
    password,
    enrollmentNumber,
    mobile,
    semester,
    isApproved: false, //will be verified by the admin
    otpAttempts: 0, //Initially set to 0
    otpResendAttemps: 0, //Initially otpResendAttemps set to 0
    blockedTime: null,
  });

  const { success, otp, expiresIn, error } = await sendOTP(newUser);
  if (success) {
    newUser.otp = otp;
    newUser.otpExpires = expiresIn;
    await newUser.save();

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "Please verify the OTP sent to your email.",
        _id: newUser._id,
        role: newUser.role,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid user data !",
      });
    }
  } else {
    return res.status(500).send({
      success: false,
      message: "Unable to send OTP!",
      error,
    });
  }
});

// --------------------------------------------------SEND OTP----------------------------------------------------------------
const sendOTP = async (user) => {
  if (user.blockedTime && user.blockedTime > Date.now()) {
    ERROR("Unable to sent OTP. User is Blocked.");
    return {
      success: false,
      error:
        "You are temporarily blocked from resending OTP. Please try again later.",
    };
  }
  if (user.otpResendAttemps > 3) {
    // Block the user for 1 hour
    user.blockedTime = Date.now() + 1 * 60 * 60 * 1000; // Block for 1 hour
    user.otpResendAttemps = 0;
    await user.save();
    ERROR("Unable to resend OTP. User has attempted more than 3 times.");
    return {
      success: false,
      error:
        "Too many attempts... you are blocked for 1 hour, try again after a hour!",
    };
  }

  // Generate OTP and set expiration time
  const otp = crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP

  const otpExpires = Date.now() + 10 * 60 * 1000; // OTP is valid for 10 minutes
  // Send OTP via email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Campus Link: Registration OTP",
      text: `Hey ${user.name}! Your OTP is ${otp}. Please enter this OTP to complete your registration.\n\n\nRegards,\nCampus Link`,
    });
    user.otpResendAttemps += 1;
    await user.save();
    LOG("OTP has been generated and sent successfully.");
    return {
      success: true,
      otp,
      otpExpires,
    };
  } catch (error) {
    ERROR("Unable to sent OTP: ");
    ERROR(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
// --------------------------------------------------RESEND OTP----------------------------------------------------------------

//@desc     Resend OTP
//@route    POST /api/auth/resend-otp
//@access   public
const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    ERROR("Unable to resent OTP. User not found in database.");
    return res.status(400).send({
      success: false,
      message: "User not found",
    });
  }
  const { success, otp, expiresIn, error } = await sendOTP(user);
  if (success) {
    user.otp = otp;
    user.otpExpires = expiresIn;
    await user.save();
    return res.status(201).send({
      success: true,
      message: "Enter OTP to continue...",
    });
  } else {
    return res.status(400).send({
      success: false,
      message: "Unable to send OTP!",
      error,
    });
  }
});

// --------------------------------------------------VERIFY OTP----------------------------------------------------------------

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    ERROR("HTTP-400: Unable to Verify OTP. Registration Data not found");
    return res.status(400).send({
      success: false,
      message: "Registration Data not found",
    });
  }
  if (user.blockedTime > Date.now()) {
    ERROR("Unable to Verify OTP. User is blocked for some time.");
    return res.status(400).send({
      success: false,
      messgae: "User is blocked. Please try after some time...",
    });
  }
  // Check if OTP has expired
  if (user.otpExpires <= Date.now()) {
    ERROR("HTTP-400: Unable to Verify OTP. OTP has been expired");
    return res.status(400).send({
      success: false,
      message: "OTP Expired! request new one",
    });
  }

  // Check if OTP is correct
  if (user.otp === otp) {
    // OTP is correct
    user.otp = undefined; // Remove OTP after verification
    user.otpExpires = undefined; // Remove OTP expiration after verification
    user.otpAttempts = 0; // Reset attempts
    user.otpResendAttemps = 0;
    user.blockedTime = null;
    await user.save();
    SUCCESS("OTP verified successfully.");
    if (user.role === "admin") {
      const token = generateToken(user._id, user.role);
      return res.status(200).send({
        success: true,
        message: "Admin Logged in Successfully",
        role: user.role,
        email: user.email,
        name: user.name,
        username: user.username,
        token,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Registration Success! Wait for admin to verify it !!",
    });
  } else {
    // OTP is incorrect
    ERROR("Invalid OTP.");
    user.otpAttempts += 1; // Increment attempts
    if (user.otpAttempts >= 4) {
      user.otpAttempts = 0;
      user.blockedTime = Date.now() + 1 * 60 * 60 * 1000; // Block for 1 hour
      await user.save();
      return res.status(400).send({
        success: false,
        message: "Too many failed attempts... try after a hour!",
      });
    }
    await user.save(); // Save updated attempt count

    return res.status(400).send({
      success: false,
      message: "Invalid OTP. Please try again.",
    });
  }
});

// --------------------------------------------------LOGIN----------------------------------------------------------------

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, enrollmentNumber, password } = req.body;

  // Check for user by email, username, or enrollment number
  const user = await User.findOne({
    $or: [{ email }, { username }, { enrollmentNumber }],
  });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User is not registered with us",
    });
  }
  if (user && (await user.matchPassword(password))) {
    // Check if the user is approved by admin
    if (!user.isApproved) {
      return res.status(403).send({
        success: false,
        message:
          "Your account is not approved yet. Please verify your OTP and wait for admin approval",
      });
    }
    // if (user.role === 'admin') {
    // const { success, otp, expiresIn, error } = await sendOTP(user);
    // if (success) {
    //     user.otp = otp;
    //     user.otpExpires = expiresIn;
    //     await user.save();
    //     return res.status(201).send({
    //         success: true,
    //         message: 'OTP sent successfully'
    //     });
    // } else {
    //     return res.status(400).send({
    //         success: false,
    //         message: "Unable to send OTP",
    //         error
    //     });
    // }
    // }

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,            // must be true on production with https
      sameSite: "none",        // important for cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token,
    });

  } else {
    res.status(401).send({
      success: false,
      message: "Invalid email or password",
    });
  }
});

// --------------------------------------------------GENERATE TOKEN----------------------------------------------------------------
// Generate JWT
const generateToken = (id, role) => {
  const expiresIn = role === "admin" ? "24h" : "30d";
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

// --------------------------------------------------GET CURRENT USER----------------------------------------------------------------
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Get user ID from req.user

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is missing!",
    });
  }

  // Fetch user from the database
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  // Send back user details
  return res.status(200).json({
    success: true,
    message: "User fetched successfully!",
    user,
  });
});
// --------------------------------------------------GET CURRENT USER----------------------------------------------------------------
const PgetCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = req.body; // Get user ID from req.user

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User ID is missing!",
    });
  }

  // Fetch user from the database
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found!",
    });
  }

  // Send back user details
  return res.status(200).send({
    success: true,
    message: "User fetched successfully!",
    user,
  });
});
// --------------------------------------------------Sent OTP to Reset Password----------------------------------------------------------------

// @desc    Sent OTP to Change password
// @route   POST /api/auth/reset-password-otp
// @access  Public
const sendOtpToResetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({
      success: false,
      message: "User not found",
    });
  }
  //generate OTP and set expiration time
  const otp = crypto.randomInt(100000, 999999).toString(); //Generate 6 digit OTP
  const otpExpires = Date.now() + 10 * 60 * 1000; // OTP is valid for 10 min
  user.otp = otp;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Campus Link: Reset Password",
      text: `Hey ${user.name}! Your OTP is ${otp}. Enter OTP to reset your password.\nDo not share this with anyone.\n\n\nRegards,\nCampus Link`,
    });
    user.otpResendAttemps += 1;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
});
// --------------------------------------------------RESET PASSWORD----------------------------------------------------------------

// @desc enter password to reset
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and Password is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not Found",
      });
    }
    user.password = password;
    await user.save();
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset Password: Password Changed successfully",
        text: `Hey ${user.name}! Your password changed successfully and is fully safe with us.\n\nIf you have not done this then contact your admin or report to service.campuslink@gmail.com \n\n\nRegards,\nCampus Link`,
      });
      user.otpResendAttemps += 1;
      await user.save();
      return res.status(200).send({
        success: true,
        message: "OTP sent successfully",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        error,
      });
    }
    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
});

// --------------------------------------------------get batch of users-------------------------------------------
// @desc    get the batch of users
// @route   POST /api/auth/batch/users
// @access  private
const getUsersBatch = asyncHandler(async (req, res) => {
  const { userIds } = req.body;
  if (!userIds) {
    return res.status(400).send({
      success: false,
      message: "User IDs are required",
    });
  }
  const users = await User.find({ _id: { $in: userIds } });
  res.json(users);
});

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  getCurrentUser,
  sendOtpToResetPassword,
  resetPassword,
  getUsersBatch,
  PgetCurrentUser,
};
