import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Remplacement de body-parser

const ordersFilePath = path.join(__dirname, 'orders.json');

// Helper function to read orders
const readOrders = () => {
  if (!fs.existsSync(ordersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(ordersFilePath);
  return JSON.parse(data);
};

// Helper function to write orders
const writeOrders = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
    res.send('Welcome to the Flower Shop API!');
});

// --- Configuration de l'email (avec un compte de test Ethereal) ---
let transporter;

async function setupEmail() {
  // Crée un compte de test avec Ethereal
  let testAccount = await nodemailer.createTestAccount();

  console.log('---');
  console.log('Utilisez les identifiants suivants pour votre service de messagerie :');
  console.log('Utilisateur:', testAccount.user);
  console.log('Mot de passe:', testAccount.pass);
  console.log('---');

  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

setupEmail().catch(console.error);

async function sendConfirmationEmail(order) {
  if (!transporter) {
    console.error("Le transporteur d'email n'est pas prêt.");
    return;
  }

  const itemsHtml = order.orderItems.map(item => 
    `<li>${item.nom} (x${item.quantity}) - ${item.prix.toFixed(2)} €</li>`
  ).join('');

  const message = {
    from: '"Flower Shop" <noreply@example.com>',
    to: order.clientInfo.email,
    subject: `Confirmation de votre commande #${order.id}`,
    html: `
      <h1>Merci pour votre commande !</h1>
      <p>Bonjour ${order.clientInfo.firstName},</p>
      <p>Nous avons bien reçu votre commande et nous vous remercions de votre confiance.</p>
      
      <h2>Récapitulatif de la commande</h2>
      <ul>${itemsHtml}</ul>
      <p><strong>Total : ${order.total.toFixed(2)} €</strong></p>
      <p>Mode de livraison : ${order.deliveryMethod}</p>

      <h2>Prochaine étape : Paiement</h2>
      <p>Pour finaliser votre commande, veuillez effectuer votre paiement et <strong>envoyer une preuve de paiement au numéro WhatsApp suivant : +XX XXX XXX XXX</strong>.</p>
      <p>Une fois la preuve de paiement reçue, nous marquerons votre commande comme payée et commencerons sa préparation.</p>
      
      <p>Merci,<br>L'équipe Flower Shop</p>
    `,
  };

  let info = await transporter.sendMail(message);

  console.log("Email de confirmation envoyé: %s", info.messageId);
  // URL de prévisualisation de l'email sur Ethereal
  console.log("URL de prévisualisation: %s", nodemailer.getTestMessageUrl(info));
}
// --- Fin de la configuration de l'email ---


// Endpoint pour créer une commande
app.post('/api/orders', async (req, res) => {
  const orders = readOrders();
  const newOrder = {
    id: `${Date.now()}`,
    ...req.body,
    status: 'en-attente-de-paiement',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  writeOrders(orders);
  
  // Envoyer un email de confirmation
  try {
    await sendConfirmationEmail(newOrder);
    res.status(201).json({ message: 'Commande créée avec succès', order: newOrder });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ message: "La commande a été créée, mais l'envoi de l'email de confirmation a échoué." });
  }
});

// Endpoint pour récupérer toutes les commandes (pour le dashboard)
app.get('/api/orders', (req, res) => {
  const orders = readOrders();
  res.status(200).json(orders);
});

// Endpoint pour mettre à jour le statut d'une commande
app.put('/api/orders/:id/status', (req, res) => {
  const orderId = req.params.id;
  let orders = readOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }

  orders[orderIndex].status = 'payee';
  writeOrders(orders);
  res.status(200).json({ message: 'Statut de la commande mis à jour', order: orders[orderIndex] });
});

// Endpoint pour supprimer une commande
app.delete('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  let orders = readOrders();
  const initialLength = orders.length;
  // Utiliser une comparaison non-stricte pour éviter les problèmes de type (string vs number)
  orders = orders.filter(order => order.id != orderId);

  if (orders.length === initialLength) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }

  writeOrders(orders);
  res.status(200).json({ message: 'Commande supprimée avec succès' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
