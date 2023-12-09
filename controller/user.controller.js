const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

exports.register = async (req, res) => {
    try {
        if(!req.body) {
            throw new Error("Please enter name, email and password");
        } if(!req.body.name) {
            throw new Error("Please enter name");
        } if(!req.body.email) {
            throw new Error("Please enter email");
        } if(!req.body.password) {
            throw new Error("Please enter password");
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const getUserByEmail = await User.findOne({ email: req.body.email });
        if(getUserByEmail) {
            throw new Error("User already registered");
        }
        const createdUser = await User.create(req.body);
          const token = jwt.sign(
            {
              email: createdUser.email,
              name: createdUser.name,
            },
            process.env.jwtSecret,
          );
        res.send({
          message: "User created successfully",
          data: { user: createdUser, token },
          success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
}

exports.login = async (req, res) => {
    try {
        if(!req.body) {
            throw new Error("Please enter login details");
        } if(!req.body.email) {
            throw new Error("Please enter email address");
        } if(!req.body.password) {
            throw new Error("Please enter password");
        }

        const getUserByEmail = await User.findOne({
                email: req.body.email
        });
        if(!getUserByEmail) {
            throw new Error("User doesn't exist");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            getUserByEmail.password
        );
        if(!validPassword) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({
            email: getUserByEmail.email,
            name: getUserByEmail.name
        }, process.env.jwtSecret,
        );
        res.send({
            message: "User logged in successfully",
            data: {
                token,
                user: getUserByEmail,
            },
            success: true,
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        })
    }
}