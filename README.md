# Node.js File Upload to Amazon S3

This Node.js application provides a simple API endpoint for uploading files to Amazon S3 using the AWS SDK v3. It utilizes Express.js for handling HTTP requests, Multer for handling file uploads, and the aws-sdk library for interacting with Amazon S3.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdoil/s3-upload-API.git

2. **Navigate to the project directory:**
    
     ```bash
     cd your-repo
    
3. **Install dependencies:**
    
    ```bash
    npm install
    
4. **Create a `.env` file in the project root and add your AWS credentials:**
    
    ```env
    
    AWS_ACCESS_KEY_ID=your-access-key
    AWS_SECRET_ACCESS_KEY=your-secret-key
    AWS_BUCKET_NAME=your-s3-bucket-name 
    

## Usage

1. **Start the server:**
    
    ```bash
    node index.js
    
2. **Make a POST request to `http://localhost:3000/upload` with one or more files attached.**
    
    Example using curl:
    
    ```bash
    curl -X POST -F "file=@/path/to/your/file.txt" http://localhost:3000/upload
    
3. **The server will upload the file(s) to Amazon S3, and the response will be a JSON object containing the status and the modified keys:**
    
    ```json
    
    {
      "status": "success",
      "modifiedKeys": [
        "https://your-s3-bucket-url/uploads/your-uuid-filename.txt"
      ]
    } 
    

## Configuration

Adjust the AWS configuration and other settings in the `.env` file.

## Contributing

Feel free to contribute by opening issues or creating pull requests.
