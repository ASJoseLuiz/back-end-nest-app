import { z } from "zod";

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/; //

export const validationBodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(regex),
});

export const deleteAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string().regex(regex),
});

export const getAccountByEmailSchema = z.object({
  email: z.string().email(),
});

export const updatePasswordBodySchema = z.object({
  email: z.string().email(),
  currentPassword: z.string().regex(regex),
  newPassword: z.string().regex(regex),
});

export const payloadBodySchema = z.object({
  sub: z.string().uuid(),
  email: z.string().email(),
});

export type DeleteAccountBodySchema = z.infer<typeof deleteAccountBodySchema>;

export type GetAccountByEmailSchema = z.infer<typeof getAccountByEmailSchema>;

export type PayloadBodySchema = z.infer<typeof payloadBodySchema>;

export type UpdatePasswordBodySchema = z.infer<typeof updatePasswordBodySchema>;

export type ValidationBodySchema = z.infer<typeof validationBodySchema>;
