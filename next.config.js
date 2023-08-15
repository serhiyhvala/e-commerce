/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dsq7kf3kp/image/upload/**/**',
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
                pathname: '/**/**'
            }
        ]
    }
}

module.exports = nextConfig
