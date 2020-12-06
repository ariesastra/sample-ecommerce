import bcrypt from 'bcryptjs'

const Users = [
    {
        name : 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true
    },
    {
        name : 'Arie Sastra',
        email: 'arie@example.com',
        password: bcrypt.hashSync('password', 10),
    },
    {
        name : 'Hadiprawira',
        email: 'hadi@example.com',
        password: bcrypt.hashSync('password', 10),
    },
]

export default Users