const db  = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {

    try{
        const { name, mobile, email, password } = req.body;
        if(!name || !email || !mobile || !password){
            return res.send({
                message: 'Please provide all required fields'
            });

        }

        db.query(
            'SELECT * FROM users WHERE email = ? OR mobile = ?',
            [email, mobile],

            async (err, results) => {

                if(err){
                    console.log('Error fetching user', err);
                    return res.send({
                        message: 'Internal server error'
                    });

                }

                if(results.length > 0){
                    return res.send({
                        message: 'User already exists'
                    });

                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(

                    "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)",
                    [name, email, mobile, hashedPassword],
                    (err, result) => {

                        if(err){
                            console.log('Error inserting user', err);
                            return res.send({
                                message: 'Error registering user'
                            });
                        }

                        return res.send({
                            message: 'User registered successfully'
                        });
                    }
                );
            }
        );
    }

    catch(error){
        console.log(error);
        return res.send({
            message: 'Internal server error'
        });
    }
};

const login = async (req, res) => {

    try{
        const { emailorMobile, password } = req.body;
        if(!emailorMobile || !password){
            return res.send({
                message: 'Please provide all required fields'
            });
        }


        db.query(

            'SELECT * FROM users WHERE email = ? OR mobile = ?',

            [emailorMobile, emailorMobile],

            async (err, results) => {

                if(err){
                    console.log('Error fetching user', err);
                    return res.send({
                        message: 'Internal server error'
                    });
                }

                if(results.length === 0){
                    return res.send({
                        message: 'User not found'
                    });
                }

                const user = results[0];
                const isPasswordValid = await bcrypt.compare(

                    password, user.password
                );

                if(!isPasswordValid){
                    return res.send({
                        message: 'wrong password'
                    });
                }

                const token = jwt.sign(

                { id: user.id },

                process.env.JWT_SECRET,

                { expiresIn: '10m' }

                );

                return res.status(200).json({

                success: true,

                token: token

                });

            }
        );
    }

    catch(error){
        console.log('Error during login', error);
        return res.send({
            message: 'Internal server error'
        });
    }
};
const logout = (req, res) => {
    return res.send({
        message: "Logout successful"
    });
};


module.exports = {
    register,
    login,
    logout
};
