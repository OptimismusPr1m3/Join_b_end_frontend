/**
 * Represents a user with basic information
 */
class User {
    first_name;
    last_name;
    username;
    email;
    password;

    /**
     * Creates a new user instance.
     *
     * @param {string} firstName - The user's first name.
     * @param {string} lastName - The user's last name.
     * @param {string} mail - The user's email address.
     * @param {string} password - The user's password. 
     */
    constructor(firstName, lastName, mail, password) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.email = mail;
        this.password = password;
        this.username = this.first_name
    }
}