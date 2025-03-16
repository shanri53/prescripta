require("dotenv").config();
const express = require("express");
const { Client, PrivateKey, AccountId, FileCreateTransaction, FileContentsQuery } = require("@hashgraph/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Hedera Client Setup
const client = Client.forTestnet();
client.setOperator(
    AccountId.fromString(process.env.MY_ACCOUNT_ID),
    PrivateKey.fromString(process.env.MY_PRIVATE_KEY)
);

// ✅ AI Setup (Google Gemini AI)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const path = require("path");
app.use(express.static(path.join(__dirname, "public"))); // Serving static assets

// ✅ Render `index.ejs` on root route
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/retrieve", (req, res) => {
    res.render("retrieve");
});


// 🔹 AI Prescription Validation Function
async function validatePrescription(patientName, medicine) {
    try {
        console.log(`🔍 Validating Prescription for ${patientName} - ${medicine}`);
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-001" });

        const response = await model.generateContent([
            `Check if the medicine "${medicine}" is commonly prescribed. 
             Provide a summary of its general uses, dosage recommendations, and common side effects. 
             This is not a diagnosis, just an informational check.`
        ]);

        return response.response.text();
    } catch (error) {
        console.error("❌ AI Validation Error:", error);
        return `AI Validation Error: ${error.message}`;
    }
}

// ✅ Issue Prescription (Generates Prescription and Saves to Blockchain)
app.post("/issue-prescription", async (req, res) => {
    try {
        const { doctorName, patientName, govNumber, gender, age, prescriptions } = req.body;

        if (!doctorName || !patientName || !govNumber || !gender || !age || prescriptions.length === 0) {
            return res.status(400).json({ error: "Missing required details." });
        }

        // 🔹 AI Validation
        const aiResponses = await Promise.all(prescriptions.map(async (prescription) => {
            return await validatePrescription(patientName, prescription.medicine);
        }));

        // 🔹 Store Full Prescription on Hedera Blockchain
        let prescriptionContent = `Doctor: ${doctorName}\nPatient: ${patientName}\nGov. Number: ${govNumber}\nGender: ${gender}\nAge: ${age}\n\nPrescriptions:\n`;

        prescriptions.forEach((prescription, index) => {
            prescriptionContent += `🔹 Medicine: ${prescription.medicine}\n   - Dosage: ${prescription.dosage}\n   - AI Analysis: ${aiResponses[index]}\n\n`;
        });

        const fileTx = new FileCreateTransaction()
            .setContents(prescriptionContent)
            .freezeWith(client);

        const signedTx = await fileTx.sign(PrivateKey.fromString(process.env.MY_PRIVATE_KEY));
        const submitTx = await signedTx.execute(client);
        const receipt = await submitTx.getReceipt(client);
        const fileId = receipt.fileId.toString();

        return res.json({
            message: "✅ Prescription Issued!",
            fileId: fileId,
            doctorName: doctorName,
            aiResponse: aiResponses.join("\n\n")
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ Retrieve Prescription from Hedera
app.get("/get-prescription/:fileId", async (req, res) => {
    try {
        const fileId = req.params.fileId.trim();
        console.log(`🔍 Retrieving Prescription for File ID: ${fileId}`);

        // ✅ Retrieve file from Hedera
        const fileContents = await new FileContentsQuery()
            .setFileId(fileId)
            .execute(client);

        res.json({ prescription: fileContents.toString() });
    } catch (error) {
        console.error("❌ Error retrieving prescription:", error);
        res.status(500).json({ error: error.message });
    }
});


// Store all prescriptions in an array (Simulating a database)
const prescriptionsDatabase = [];



// Serve the prescriptions page
app.get("/prescriptions", (req, res) => {
    console.log("📋 Sending prescriptions to view:", prescriptionsDatabase); // Debugging log
    res.render("prescriptions", { prescriptions: prescriptionsDatabase || [] }); 
});


// ✅ Retrieve All Prescriptions
app.get("/get-all-prescriptions", (req, res) => {
    res.json({ prescriptions: prescriptionsDatabase });
});


// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Prescripta is Running on http://localhost:${PORT}`));
