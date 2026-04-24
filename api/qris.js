export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { nominal } = req.body;
        
        if (!nominal) {
            return res.status(400).json({ status: false, message: 'Nominal is required' });
        }

        const ATLANTIC_API = "5kijekvBS7FSXIgT6IDNkLm4vJWYbGoqJVNg5ERMZ0HIYwEYx2BZBANcWZ3VKzfyeASSVWEGYiPdOGrZqZvrWjqjIApnmghZRLeY";
        const nominalFix = parseInt(nominal) + 250;
        const reffId = "NEXA-" + Date.now();

        const response = await fetch("https://atlantich2h.com/deposit/create", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                api_key: ATLANTIC_API,
                reff_id: reffId,
                nominal: nominalFix,
                type: 'ewallet',
                method: 'qris'
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            message: "Server Error: " + error.message 
        });
    }
}
