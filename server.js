const express = require('express');
const mongoose = require('mongoose');
const Capsule = require('./models/Capsule');
const IntrusionLog = require('./models/IntrusionLog');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chronos-local';

mongoose.connect(DB_URI)
    .then(() => console.log('✅ Chronos Vault Database Connected'))
    .catch(err => console.log('❌ Database Connection Failed:', err.message));

app.get('/', (req, res) => {
    res.render('index'); 
});

app.post('/generate', async (req, res) => {
    try {
        const token = Math.random().toString(36).substring(2, 8);
        const { message, unlockDate, pin, expireTime } = req.body;

        const unlockDateObj = new Date(unlockDate);
        const expiresAtObj = new Date(unlockDateObj.getTime() + parseInt(expireTime));

        await Capsule.create({
            _id: token,
            message: message,
            unlockDate: unlockDateObj,
            pin: pin,
            expiresAt: expiresAtObj
        });

        const shareableLink = `http://localhost:3000/capsule/${token}`;
        
        res.send(`
            <div style="background-color: #121212; color: white; font-family: sans-serif; text-align: center; padding-top: 100px; height: 100vh;">
                <h1 style="color: #4CAF50;">✅ Capsule Sealed Successfully!</h1>
                <p>Share this exact link with the recipient. It is locked until your chosen date.</p>
                <input type="text" value="${shareableLink}" style="padding: 10px; width: 350px; text-align: center; font-size: 16px; background: #2d2d2d; color: white; border: none; border-radius: 5px;" readonly>
                <br><br>
                <a href="/" style="color: #007bff; text-decoration: none;">⬅ Create Another Capsule</a>
            </div>
        `);

    } catch (error) {
        console.error(error);
        res.status(500).send("❌ System Error: Failed to seal capsule.");
    }
});


app.get('/capsule/:token', async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.token);

        if (!capsule) {
            return res.status(404).send("<h1 style='color:red; text-align:center; padding-top:50px;'>❌ Capsule Not Found or Destroyed</h1>");
        }

        const now = new Date();
        if (now < capsule.unlockDate) {
            await IntrusionLog.create({
                capsuleToken: capsule._id,
                status: "Blocked - Time Lock Active"
            });
            return res.render('locked', { unlockDate: capsule.unlockDate });
        }

        res.render('auth', { token: capsule._id });

    } catch (error) {
        console.error(error);
        res.status(500).send("System Error");
    }
});

app.post('/unlock/:token', async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.token);
        
        if (!capsule) {
            return res.status(404).send("<h1 style='color:red; text-align:center; padding-top:50px;'>❌ Capsule Not Found or Destroyed</h1>");
        }

        if (capsule.pin !== req.body.pin) {
            
            await IntrusionLog.create({
                capsuleToken: capsule._id,
                status: "Blocked - Incorrect PIN"
            });
            
            return res.send(`
                <div style="background-color: #121212; color: white; text-align: center; padding-top: 100px; height: 100vh;">
                    <h1 style="color: #ff4d4d;">❌ INCORRECT PIN</h1>
                    <a href="/capsule/${capsule._id}" style="color: #007bff; text-decoration: none;">⬅ Try Again</a>
                </div>
            `);
        }


        res.render('view', { message: capsule.message });

    } catch (error) {
        console.error(error);
        res.status(500).send("System Error");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});