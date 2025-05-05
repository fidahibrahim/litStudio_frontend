import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
})

export const LoginValidationSchema = Yup.object({
    email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

export const BlogFormSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required')
    .test(
      'no-leading-trailing-spaces',
      'Title cannot have leading or trailing spaces',
      value => {
        if (!value) return true; 
        return value.trim() === value;
      }
    ),
  content: Yup.string()
    .trim()
    .required('Blog content is required'),
  image: Yup.string()
    .required('Cover image is required'),
  tags: Yup.array()
    .min(1, 'At least one tag is required')
    .max(5, 'Maximum 5 tags allowed')
    .of(
      Yup.string()
        .trim()
        .required()
        .test(
          'no-leading-trailing-spaces',
          'Tags cannot have leading or trailing spaces',
          value => {
            if (!value) return true;
            return value.trim() === value;
          }
        )
    )
});