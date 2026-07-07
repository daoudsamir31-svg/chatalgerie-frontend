const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/submit', async (req, res) => {
    const { userEmail, userName, phone, reference, price, plan, receiptImage } = req.body;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'daoudsamir31@gmail.com', // بريدك الإلكتروني
            subject: `💳 طلب اشتراك جديد من ${userName}`,
            html: `
                <h2>طلب اشتراك جديد</h2>
                <p><strong>المستخدم:</strong> ${userName} (${userEmail})</p>
                <p><strong>رقم الهاتف:</strong> ${phone}</p>
                <p><strong>الخطة:</strong> ${plan === 'monthly' ? 'شهرية' : 'سنوية'}</p>
                <p><strong>المبلغ:</strong> ${price} DA</p>
                <p><strong>مرجع العملية:</strong> ${reference || 'غير محدد'}</p>
                <p><strong>تاريخ الطلب:</strong> ${new Date().toLocaleString()}</p>
                <hr />
                <p><strong>صورة الإيصال مرفقة في هذا البريد الإلكتروني</strong></p>
                <p>قم بمراجعة الإيصال وتفعيل الاشتراك للمستخدم.</p>
            `,
            attachments: receiptImage ? [{
                filename: 'receipt.png',
                content: receiptImage.split(',')[1],
                encoding: 'base64'
            }] : []
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: '✅ تم إرسال طلب الدفع بنجاح' });
    } catch (error) {
        console.error('❌ خطأ في إرسال البريد:', error);
        res.status(500).json({ message: '❌ خطأ في إرسال البريد' });
    }
});

module.exports = router;