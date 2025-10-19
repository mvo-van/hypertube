# Swagger Documentation - Visual Guide

## What You'll See in Swagger UI

When you access `http://localhost:3000/docs`, the Swagger UI will display:

### 1. API Information Header
```
Hypertube API
Version 1.0
Routes list
```

### 2. API Endpoints Organized by Tags

#### 🏷️ **users**
- **POST /users** - Create a new user
  - Request Body: CreateUserDto
  - Response: 201 (UserResponseDto), 400 (Bad request)
  
- **GET /users** - Get all users
  - Response: 200 (Array of UserResponseDto)
  
- **GET /users/{id}** - Get a user by ID
  - Path Parameter: id (number)
  - Response: 200 (UserResponseDto), 404 (User not found)
  
- **PATCH /users/{id}** - Update a user
  - Path Parameter: id (number)
  - Request Body: UpdateUserDto
  - Response: 200 (UserResponseDto), 404 (User not found)
  
- **DELETE /users/{id}** - Delete a user
  - Path Parameter: id (number)
  - Response: 200, 404

#### 🏷️ **auth**
- **POST /auth/login** - Login with username and password
- **POST /auth/forgot-password** - Request password reset email
- **POST /auth/reset-password** - Reset password with OTP
- **GET /auth/google** - Initiate Google OAuth login
- **GET /auth/google/redirect** - Google OAuth callback
- **GET /auth/fortytwo** - Initiate 42 OAuth login
- **GET /auth/fortytwo/redirect** - 42 OAuth callback
- **GET /auth/github** - Initiate GitHub OAuth login
- **GET /auth/github/callback** - GitHub OAuth callback
- **GET /auth/gitlab** - Initiate GitLab OAuth login
- **GET /auth/gitlab/callback** - GitLab OAuth callback
- **GET /auth/discord** - Initiate Discord OAuth login
- **GET /auth/discord/callback** - Discord OAuth callback
- **GET /auth/spotify** - Initiate Spotify OAuth login
- **GET /auth/spotify/callback** - Spotify OAuth callback

#### 🏷️ **health**
- **GET /health** - Health check endpoint
  - Response: 200 ({ status: "ok" })

### 3. Schemas Section

All DTOs are documented with their properties:

#### CreateUserDto
```json
{
  "username": "johndoe",           // Username for the user (required)
  "first_name": "John",            // First name of the user (required)
  "last_name": "Doe",              // Last name of the user (required)
  "email": "john.doe@example.com", // Email address of the user (required)
  "password": "MyP@ssw0rd!",       // Password (optional, for local auth)
  "profile_picture_url": "https://example.com/profile.jpg", // URL (required)
  "language": "en",                 // Preferred language (optional, enum)
  "auth_strategy": "local",         // Auth strategy (optional, enum)
  "otp_code": "123456"              // 6-digit OTP (optional)
}
```

#### UserResponseDto
```json
{
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "profile_picture_url": "https://example.com/profile.jpg",
  "language": "en"
}
```

#### ForgotPasswordDto
```json
{
  "email": "john.doe@example.com"  // Email to send reset instructions
}
```

#### RestPasswordDto
```json
{
  "email": "john.doe@example.com",  // User email
  "otp": "123456",                   // OTP from email
  "newPassword": "MyNewP@ssw0rd!"    // New password
}
```

### 4. Interactive Features

Each endpoint in Swagger UI has:
- ▶️ **Try it out** button - Test the API directly
- 📝 **Example Values** - Pre-filled request bodies
- 📋 **Schema** - Detailed type information
- ✅ **Validation rules** - Min/max length, required fields, etc.
- 🔄 **Execute** - Send the request and see the response

### 5. Key Features Added

✅ **Field-level documentation** - Every DTO field has:
  - Descriptive text explaining its purpose
  - Example values showing expected format
  - Type information (string, number, enum, etc.)
  - Validation constraints (min/max length, patterns)
  - Required/optional status

✅ **Endpoint organization** - Routes grouped by functionality:
  - users: User management operations
  - auth: Authentication and OAuth flows
  - health: Service health checks

✅ **Response documentation** - Each endpoint documents:
  - Success status codes (200, 201)
  - Error status codes (400, 401, 404)
  - Response schemas
  - Example responses

✅ **Request documentation** - For POST/PATCH endpoints:
  - Request body schemas
  - Example request bodies
  - Validation requirements

## Technical Implementation

All documentation is generated from TypeScript decorators:
- `@ApiProperty()` - Documents regular fields
- `@ApiPropertyOptional()` - Documents optional fields
- `@ApiTags()` - Groups endpoints
- `@ApiOperation()` - Describes endpoint purpose
- `@ApiResponse()` - Documents responses
- `@ApiParam()` - Documents path parameters
- `@ApiBody()` - Documents request bodies

This ensures documentation stays in sync with code automatically!
