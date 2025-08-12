import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API - Registro Academico ',
            version: '1.0.0',
            description: 'API para el manejo de registros académicos',
            contact: {
                name: 'Pedro Plasencia'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
export default specs;