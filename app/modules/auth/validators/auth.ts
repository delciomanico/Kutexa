import vine from '@vinejs/vine'

export const LoginValidator = vine.compile(
    vine.object({
        email: vine.string().trim(),
        password: vine.string().trim()
    })
)

export const RegisterValidator = vine.compile(
    vine.object({
        fist_name: vine.string().trim(),
        last_name: vine.string().trim(),
        username: vine.string().trim(),
        email: vine.string().trim(),
        password: vine.string().trim(),
        funcao_id: vine.number(),
        agencia_id: vine.number(),
    })
)