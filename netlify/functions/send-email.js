
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 1. On ne traite que les requêtes POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // 2. On récupère la clé API Brevo depuis les variables d'environnement
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    return { statusCode: 500, body: 'Brevo API Key not found.' };
  }

  try {
    // 3. On parse les données du formulaire envoyées depuis le front-end
    const { name, email, subject, message } = JSON.parse(event.body);

    // 4. On prépare la requête pour l'API Brevo
    const brevoPayload = {
      sender: {
        name: name,
        email: email, // L'email de l'expéditeur est utilisé comme expéditeur du mail
      },
      to: [
        {
          email: 'contact@clofas241.online',
          name: 'Clofas Admin'
        }
      ],
      replyTo: {
        email: email,
        name: name,
      },
      subject: `Nouveau message de ${name}: ${subject}`,
      htmlContent: `
        <html>
          <body>
            <h2>Nouveau message depuis le formulaire de contact Clofas</h2>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </body>
        </html>
      `
    };

    // 5. On envoie la requête à Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brevoPayload),
    });

    const data = await response.json();

    // 6. On gère la réponse de Brevo
    if (!response.ok) {
      console.error('Brevo API error:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Failed to send email.', details: data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };

  } catch (error) {
    console.error('Error handling form submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An internal error occurred.' }),
    };
  }
};
