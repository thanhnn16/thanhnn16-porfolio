import { defineEventHandler, readBody } from 'h3'
import { createI18n } from 'vue-i18n'
import en from '~/i18n/locales/en'
import vi from '~/i18n/locales/vi'

const i18n = createI18n({
    legacy: false,
    locale: 'vi',
    fallbackLocale: 'en',
    messages: {
        en,
        vi
    }
})

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { name, email, message, locale = 'vi' } = body

        // Basic server-side validation
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: {
                    error: 'All fields are required'
                }
            }
        }

        // Get nodemailer instance
        const mailer = event.context.nodemailer

        // Set locale for translations
        i18n.global.locale.value = locale

        const t = i18n.global.t

        // Email to admin
        const adminMailOptions = {
            to: 'thanhnn16.work@gmail.com',
            subject: t('contact.email.admin.subject', { name }),
            html: `
        <h3>${t('contact.email.admin.title')}</h3>
        <p><strong>${t('contact.email.admin.name')}:</strong> ${name}</p>
        <p><strong>${t('contact.email.admin.email')}:</strong> ${email}</p>
        <p><strong>${t('contact.email.admin.message')}:</strong></p>
        <p>${message}</p>
      `,
            replyTo: email
        }

        // Auto-reply email to sender
        const autoReplyOptions = {
            to: email,
            subject: t('contact.email.autoReply.subject'),
            html: `
        <h3>${t('contact.email.autoReply.thankYou')}</h3>
        <p>${t('contact.email.autoReply.greeting')} ${name},</p>
        <p>${t('contact.email.autoReply.received')}</p>
        <p>${t('contact.email.autoReply.messageCopy')}</p>
        <p><em>${message}</em></p>
        <br>
        <p>${t('contact.email.autoReply.regards')}</p>
        <p>${t('contact.email.autoReply.signature.name')}</p>
        <p>${t('contact.email.autoReply.signature.role')}</p>
      `
        }

        // Send both emails
        await Promise.all([
            mailer.sendMail(adminMailOptions),
            mailer.sendMail(autoReplyOptions)
        ])

        return {
            statusCode: 200,
            body: {
                message: 'Message sent successfully'
            }
        }
    } catch (error: any) {
        console.error('Error sending message:', error)

        return {
            statusCode: 500,
            body: {
                error: 'Failed to send message'
            }
        }
    }
}) 