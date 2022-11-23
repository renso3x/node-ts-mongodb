export default {
    port: 1337,
    dbUri: 'mongodb://localhost:27017/rest-api-tutorial',
    saltWorkFactor: 10,
    publicKey: `-----BEGIN PUBLIC KEY-----
    MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
    KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
    o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
    TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
    9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
    v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
    /5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00
    -----END PUBLIC KEY-----`,
    privateKey: 
    `-----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAkbz3bi31zrH2ry4p8S4ncPoMdkUyu+MG46m9BalOKzWNNAvW
    1LVs5ftlXxzA6V0m6nx895w8S761/qZ8xtAAl99DezRn/3CueeBUyw+tvlmEBu1C
    IJK69GVoSInIKf6qyeL1WxxFV5R17QtIiQeT2yCa/fitCaxwxkNlYpP4wd5tcG0W
    PEHgznlGh/vUboCuA4tQOcKytxFfKG4F+jM/g4GH9z46KZOow3Hb6g==
    -----END RSA PRIVATE KEY-----`,
    accessTokenTTL: 15,
    refreshTokenTTL: '1y'
}