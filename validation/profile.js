import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'

export default {
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.form.username.$dirty) return errors;
            !this.$v.form.username.required && errors.push('username is is required');
            !this.$v.form.username.minLength && errors.push('username must be at most 5 characters long');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.form.email.$dirty) return errors;
            !this.$v.form.email.required && errors.push('E-mail is required');
            !this.$v.form.email.email && errors.push('Must be valid e-mail :example@gmail.com');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.form.password.$dirty) return errors;
            !this.$v.form.password.required && errors.push('Password is required');
            !this.$v.form.password.minLength && errors.push('Password must be at most 8 characters long');
            !this.$v.form.password.maxLength && errors.push('Password must be at most 15 characters long');

            return errors;
        },
        countryErrors() {
            const errors = [];
            if (!this.$v.form.country.$dirty) return errors;
            !this.$v.form.country.required && errors.push('Country is required');
            return errors;
        },
        phoneErrors() {
            const errors = [];
            if (!this.$v.form.phone.$dirty) return errors;
            !this.$v.form.phone.required && errors.push('Phone is required');
            !this.$v.form.phone.minLength && errors.push('Phone must be at most 8 characters long');
            !this.$v.form.phone.maxLength && errors.push('Phone must be at most 15 characters long');

            return errors;
        },
    },
    validations: {
        form: {
            username: {
                required,
                minLength: minLength(5),
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(15),
            },
            country: {
                required,
            },
            phone: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(15),
            },
        }
    }
}