import * as yup from "yup";
import "yup-phone-lite";





export const loginUserSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup.string().min(8, "Password must be more than 8 characters").required("Please enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),

});


export const updateUserPasswordScheme = yup.object().shape({
    current_password: yup.string().min(8, "Current password must be more than 8 characters").required("Please enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Current password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    password: yup.string().min(8, "Password must be more than 8 characters").required("Please enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Password Confirmation and Password does not match").required("Password Confirmation is required"),

});


export const forgotPasswordScheme = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
});


export const registerUserScheme = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    phone:  yup.string().min(3, "Please enter valid phone number").required("Please enter your phone number"),
    first_name: yup.string().min(3, "Please enter valid first name").required("Please enter your first name"),
    last_name: yup.string().min(3, "Please enter valid last name").required("Please enter your last name"),
    password: yup.string().min(8, "Password must be more than 8 characters").required("Please enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Password Confirmation and Password does not match").required("Password Confirmation is required"),

});


export const loginUserScheme = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password: yup.string().min(8, "Password must be more than 8 characters").required("Please enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),

});


export const updateserProfileScheme = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    first_name: yup.string().min(3, "Please enter valid first name").required("Please enter your first name"),
    last_name: yup.string().min(3, "Please enter valid last name").required("Please enter your last name"),
    business_category: yup.string(),
    company_name: yup.string(),
    company_website: yup.string(),
    date_of_birth: yup.string()
});

export const checkoutDetailsScheme =  yup.object().shape({
    address: yup.string().required("Please delivery address"),
    city: yup.string().required("Please enter delivery city"),
    country: yup.string().required("Please enter delivery country"),
    delivery_date: yup.string().required("Please enter delivery date"),
});




export const updatePasswordScheme = yup.object().shape({
    current_password:yup.string().required("Please enter current password"),
    new_password: yup.string().min(8, "Password must be more than 8 characters").required("Please enter your Password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirm_password: yup.string().oneOf([yup.ref("new_password")], "Password Confirmation and New Password does not match").required("Password Confirmation is required"),

});
