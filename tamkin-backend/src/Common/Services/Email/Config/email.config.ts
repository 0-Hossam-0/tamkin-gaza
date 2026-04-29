import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let _transporter: Transporter | null = null;

export function getTransporter(): Transporter {
  if (_transporter) return _transporter;

  const APP_EMAIL = process.env.APP_EMAIL;
  const APP_PASSWORD = process.env.APP_PASSWORD;
  const EMAIL_PORT = process.env.EMAIL_PORT || '587';

  if (!APP_EMAIL || !APP_PASSWORD || APP_EMAIL === "" || APP_PASSWORD === "") {
    throw new Error('EMAIL_CONFIG_MISSING');
  }

  _transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: Number(EMAIL_PORT),
    secure: process.env.NODE_ENV === 'production' || EMAIL_PORT === '465',
    auth: {
      user: APP_EMAIL,
      pass: APP_PASSWORD,
    },
  });

  return _transporter;
}