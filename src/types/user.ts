
interface User {
    id: string;
    name: string;
    email: string;
    createdAt?: string; // Optional field for registration date
    updatedAt?: string; // Optional field for last update date
    role?: string; // Optional field for user role (e.g., admin, user)
    isActive?: boolean; // Optional field to indicate if the user is active
    profilePicture?: string; // Optional field for user profile picture URL
    bio?: string; // Optional field for user biography
    lastLogin?: string; // Optional field for the last login timestamp
}
export type { User };