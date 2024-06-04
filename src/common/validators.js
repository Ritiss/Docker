import * as yup from "yup";
export const textSchemeRequired = yup.string().required("Required");
export const urlSchemeRequired = yup.string().url("Enter the valid url").required("Required");
export const phoneSchemeRequired = yup.string().matches(/^\+?[\d\s]{3,15}$/, 'Invalid phone').required("Required");
export const emailSchemeRequired = yup.string().email("Enter the valid email").required("Required");

export const createArticleScheme = yup.object({
    title: yup.string().required("Required").max(128),
    description: yup.string().required("Required").max(150),
    preview: yup.mixed().required("Required").nullable(),
})

export const NewMethodWithdrawalScheme = yup.object({
    cardNumber: yup.string().length(16, "Need is 16 numbers").required("Required"),
    expiryMonth: yup.string().required("Required").matches(/0[1-9]|1[0-2]/, "Enter the valid month"),
    expiryYear: yup.string().required("Required").matches(/\d{2}/, "Enter the valid year"),
    cardHolder: yup.string().required("Required"),
})

export const RecoveryPasswordByEmailScheme = yup.object({
    newPassword: yup.string().required("Required").min(8, "Minimum  8 characters"),
    repeatPassword: yup.string().required("Required").min(8, "Minimum  8 characters"),
})