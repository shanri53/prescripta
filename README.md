Prescripta - AI-Powered Blockchain Prescription System 🏥💊🔗
Prescripta is an AI-enhanced prescription management system that leverages Hedera Blockchain for secure storage and retrieval of prescriptions. Doctors can issue prescriptions, which are stored immutably on the blockchain, and patients can retrieve them using a unique ID. The system integrates Google Gemini AI to provide insights on medications. View Demo here https://prescripta.onrender.com

🚀 Inspiration
The idea for Prescripta was born out of a personal experience—one of our team members has a friend with a genetic illness, requiring lifelong medication. Witnessing the challenges of managing prescriptions and accessing affordable drugs, we created Prescripta to improve security, accessibility, and transparency in healthcare.

🛠️ Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Blockchain: Hedera Hashgraph (Testnet)
AI Integration: Google Gemini AI
Database: In-memory (MVP phase)
Deployment: Render
Other Tools: HashPack, HashScan.io for transaction tracking
 Go to https://hashscan.io/testnet/dashboard
 Select Testnet and enter Account ID 0.0.5728356 to see the various transaction for testing purposes only.

🌟 Features
✅ Doctor Front-End: Secure prescription issuance
✅ Blockchain Security: Prescriptions stored immutably on Hedera Hashgraph
✅ AI-Powered Analysis: Provides medication insights (use cases, side effects, dosage)
✅ Patient Access: Retrieve prescriptions using a unique ID
✅ Scalability: Future integration of price comparisons and predictive analytics

📌 How It Works
1️⃣ Doctor Issues Prescription

Inputs patient details and prescribed medications
Data is validated and stored on the Hedera Blockchain
2️⃣ Hedera Generates Unique Prescription ID

ID is provided to the patient
Patients can retrieve prescriptions using this ID
3️⃣ AI Provides Medication Insights

Google Gemini AI offers use case recommendations
Helps patients understand their prescriptions better
4️⃣ Patients Retrieve Their Prescriptions

Enter Prescription ID on the retrieval page
Prescription details are fetched securely
🔧 Installation & Setup
Prerequisites
Node.js (latest stable version)
Hedera Testnet Account (Setup Here)
Google Gemini AI API Key
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/shanri53/prescripta.git
cd prescripta
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Setup Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
MY_ACCOUNT_ID=0.0.XXXXX
MY_PRIVATE_KEY=302e0201...
GEMINI_API_KEY=your_google_gemini_key
4️⃣ Start the Server
bash
Copy
Edit
node server.js
or use:

bash
Copy
Edit
npm start
The server will start on http://localhost:3000 🚀.

💡 Challenges We Faced
Internet Connectivity Issues: Slowed development
Skill Gaps: Team members had different programming backgrounds
Blockchain Learning Curve: Understanding Hedera was a challenge
AI Model Limitations: Google Gemini AI became paid after testing, increasing costs
Deployment Issues: GitHub and Render required debugging
🎯 Future Improvements
🔹 Price Comparison: Help patients find affordable drugs
🔹 Predictive Analytics: Aid pharmaceuticals in demand forecasting
🔹 Multi-Hospital Support: White-labeling for different institutions
🔹 Improved AI Insights: Expand AI-based prescription recommendations

📜 License
MIT License. Feel free to contribute & enhance! 🚀

👨‍💻 Contributors
Shanique Riley (@shanri53)
Sanjay Williams
Samuel Wilson
Orine Stephenson
Patrick Newman

🔗 Follow & Support:
⭐ Star this repo if you like the project! 🚀

