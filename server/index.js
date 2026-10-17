import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataDir = path.join(root, 'data')
fs.mkdirSync(dataDir, { recursive: true })

const database = new DatabaseSync(path.join(dataDir, 'portfolio.db'))
database.exec(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)

const contactRecipient = process.env.CONTACT_EMAIL || 'sujithreddygade86@gmail.com'
const smtpPort = Number(process.env.SMTP_PORT || 465)
const smtpConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
const mailTransport = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]))

const app = express()
app.use(cors())
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/messages', async (request, response) => {
  const { name, email, message } = request.body ?? {}
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''

  if (cleanName.length < 2 || cleanName.length > 100) {
    return response.status(400).json({ error: 'Please enter a valid name.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return response.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
    return response.status(400).json({ error: 'Please enter a message between 10 and 5000 characters.' })
  }

  const result = database.prepare(
    'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
  ).run(cleanName, cleanEmail, cleanMessage)
  const messageId = result.lastInsertRowid

  if (!mailTransport) {
    console.warn('Contact message saved without email delivery: SMTP_USER/SMTP_PASS are not configured.')
    return response.status(503).json({
      ok: false,
      saved: true,
      id: messageId,
      error: 'Your message was saved, but email delivery is not configured yet.',
    })
  }

  const safeName = cleanName.replace(/[\r\n]/g, ' ')
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />')

  try {
    await mailTransport.sendMail({
      from: process.env.SMTP_USER,
      to: contactRecipient,
      replyTo: cleanEmail,
      subject: `New portfolio message from ${safeName}`,
      text: `You received a new message from your portfolio.\n\nName: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })
  } catch (error) {
    console.error('Contact message email delivery failed:', error)
    return response.status(503).json({
      ok: false,
      saved: true,
      id: messageId,
      error: 'Your message was saved, but the email notification could not be sent. Please try again later.',
    })
  }

  return response.status(201).json({ ok: true, id: messageId, emailSent: true })
})

const distDir = path.join(root, 'dist')
app.use(express.static(distDir))
app.get('*', (request, response, next) => {
  if (request.path.startsWith('/api/')) return next()

  const indexFile = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexFile)) return next()
  return response.sendFile(indexFile)
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`)
})
